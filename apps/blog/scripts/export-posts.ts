/**
 * Supabase posts 테이블의 데이터를 마크다운 파일로 내보내는 스크립트.
 * - 파일 이름: {id}.md (자식이 없는 경우) / {id}/index.md (자식이 있는 경우)
 * - 디렉터리 구조: parent-child 관계를 그대로 반영
 * - 프론트매터: DB의 실제 컬럼명과 일치
 *
 * 실행: pnpm run export:posts [output-dir]
 * 기본 출력 디렉터리: apps/blog/preview
 */

import { mkdir, writeFile, readFile } from "node:fs/promises";
import { createInterface } from "node:readline";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { createClient } from "@supabase/supabase-js";

const POST_TABLE = "posts";
const POST_TAG_TABLE = "posts_tags";

type PostRow = {
  id: string;
  parent_id: string | null;
  title: string;
  sub_title: string | null;
  sub_blog: string;
  emoji: string | null;
  created_at: string;
  last_edited_at: string | null;
  custom_order: number | null;
  type: string | null;
  content: string | null;
};

type PostTagRow = { post_id: string; tag_id: string };

async function loadEnv(): Promise<void> {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const envPaths = [
    join(__dirname, "..", ".env"),
    join(__dirname, "..", ".dev.vars"),
  ];
  for (const envPath of envPaths) {
    try {
      const raw = await readFile(envPath, "utf-8");
      for (const line of raw.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eq = trimmed.indexOf("=");
        if (eq === -1) continue;
        const key = trimmed.slice(0, eq).trim();
        const value = trimmed
          .slice(eq + 1)
          .trim()
          .replace(/^["']|["']$/g, "");
        if (!(key in process.env)) process.env[key] = value;
      }
      return;
    } catch {
      continue;
    }
  }
}

function buildAncestorChain(
  id: string,
  idToPost: Map<string, PostRow>,
): string[] {
  const chain: string[] = [];
  let current: string | null = id;
  while (current !== null) {
    chain.unshift(current);
    const post = idToPost.get(current);
    current = post?.parent_id ?? null;
  }
  return chain;
}

function getRelativePath(
  postId: string,
  idToPost: Map<string, PostRow>,
  hasChildren: Set<string>,
): string {
  const chain = buildAncestorChain(postId, idToPost);

  // 루트 포스트의 sub_blog를 최상위 디렉터리로 사용
  const rootPost = idToPost.get(chain[0]);
  const subBlog = rootPost?.sub_blog ?? "unknown";

  const dirParts = [subBlog, ...chain.slice(0, -1)];
  const selfId = chain[chain.length - 1];

  const parts = [...dirParts];
  if (hasChildren.has(selfId)) {
    parts.push(selfId, "index.md");
  } else {
    parts.push(`${selfId}.md`);
  }

  return parts.join("/");
}

function buildFrontmatter(
  post: PostRow,
  tagIds: string[],
): string {
  const lines: string[] = ["---"];

  lines.push(`id: ${post.id}`);

  const titleNeedsQuotes = post.title.includes(":") || post.title.includes('"');
  lines.push(
    titleNeedsQuotes
      ? `title: "${post.title.replace(/"/g, '\\"')}"`
      : `title: ${post.title}`,
  );

  if (post.sub_title != null) {
    const needsQuotes =
      post.sub_title.includes(":") || post.sub_title.includes('"');
    lines.push(
      needsQuotes
        ? `sub_title: "${post.sub_title.replace(/"/g, '\\"')}"`
        : `sub_title: ${post.sub_title}`,
    );
  } else {
    lines.push("sub_title:");
  }

  lines.push(`sub_blog: ${post.sub_blog}`);

  if (post.emoji != null) {
    lines.push(`emoji: ${post.emoji}`);
  } else {
    lines.push("emoji:");
  }

  if (post.parent_id != null) {
    lines.push(`parent_id: ${post.parent_id}`);
  } else {
    lines.push("parent_id:");
  }

  lines.push(
    post.custom_order != null
      ? `custom_order: ${post.custom_order}`
      : "custom_order:",
  );

  lines.push(post.type != null ? `type: ${post.type}` : "type:");
  lines.push(`created_at: ${post.created_at}`);
  lines.push(
    post.last_edited_at != null
      ? `last_edited_at: ${post.last_edited_at}`
      : "last_edited_at:",
  );

  if (tagIds.length > 0) {
    lines.push(`tags: [${tagIds.join(", ")}]`);
  } else {
    lines.push("tags: []");
  }

  lines.push("---");
  return lines.join("\n");
}

const DEFAULT_OUTPUT_DIR = "/Users/psst/Documents/blog-posts/blog-db";

function askOutputDir(): Promise<string> {
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    rl.question(
      `저장할 경로를 입력하세요 (기본값: ${DEFAULT_OUTPUT_DIR}): `,
      (answer) => {
        rl.close();
        resolve(answer.trim() || DEFAULT_OUTPUT_DIR);
      },
    );
  });
}

async function main() {
  await loadEnv();

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.error("SUPABASE_URL, SUPABASE_ANON_KEY 환경 변수를 설정해 주세요.");
    process.exit(1);
  }

  const outputDir = process.argv[2] ?? (await askOutputDir());

  const supabase = createClient(url, key);

  console.log("Supabase에서 데이터를 가져오는 중...");

  const [postsRes, postTagsRes] = await Promise.all([
    supabase
      .from(POST_TABLE)
      .select(
        "id, parent_id, title, sub_title, sub_blog, emoji, created_at, last_edited_at, custom_order, type, content",
      ),
    supabase
      .from(POST_TAG_TABLE)
      .select("post_id, tag_id"),
  ]);

  if (postsRes.error) {
    console.error("posts 조회 실패:", postsRes.error.message);
    process.exit(1);
  }

  const posts = (postsRes.data ?? []) as PostRow[];
  const postTags = (postTagsRes.data ?? []) as PostTagRow[];

  console.log(`포스트 ${posts.length}개 조회됨`);

  // post → tag ids 매핑
  const postIdToTagIds = new Map<string, string[]>();
  for (const pt of postTags) {
    const list = postIdToTagIds.get(pt.post_id) ?? [];
    list.push(pt.tag_id);
    postIdToTagIds.set(pt.post_id, list);
  }

  // id → post 매핑
  const idToPost = new Map<string, PostRow>(posts.map((p) => [p.id, p]));

  // 자식이 있는 포스트 집합
  const hasChildren = new Set<string>(
    posts.filter((p) => p.parent_id !== null).map((p) => p.parent_id!),
  );

  await mkdir(outputDir, { recursive: true });

  let written = 0;
  const skipped = 0;

  for (const post of posts) {
    const relativePath = getRelativePath(post.id, idToPost, hasChildren);
    const filePath = join(outputDir, relativePath);
    const fileDir = dirname(filePath);

    await mkdir(fileDir, { recursive: true });

    const tagIds = postIdToTagIds.get(post.id) ?? [];
    const frontmatter = buildFrontmatter(post, tagIds);
    const body = post.content ?? "";
    const fileContent = body
      ? `${frontmatter}\n\n${body}\n`
      : `${frontmatter}\n`;

    await writeFile(filePath, fileContent, "utf-8");
    console.log("  저장:", relativePath);
    written++;
  }

  console.log(`\n완료: ${written}개 저장, ${skipped}개 건너뜀`);
  console.log("출력 디렉터리:", outputDir);
}

main();
