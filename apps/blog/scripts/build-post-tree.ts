/**
 * Supabase posts 테이블에서 parent_id 관계를 읽어 트리 구조를 파일로 저장하는 스크립트.
 * 실행: pnpm run tree (apps/blog/.env 또는 .dev.vars의 SUPABASE_URL, SUPABASE_ANON_KEY 사용)
 * 결과: scripts/output/post-tree.txt, scripts/output/tags.txt (태그 테이블만)
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import { groupBy } from "es-toolkit";

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
        const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
        if (!(key in process.env)) process.env[key] = value;
      }
      return;
    } catch {
      continue;
    }
  }
}

const POST_TABLE = "posts";
const TAG_TABLE = "tags";
const POST_TAG_TABLE = "posts_tags";

type PostRow = {
  id: string;
  parent_id: string | null;
  title: string;
  sub_title: string | null;
  sub_blog: string;
  emoji: string | null;
  created_at: string;
  custom_order: number | null;
};

export type TagInfo = {
  id: string;
  title: string;
  content: string[] | null;
  isSpoiler: boolean;
};

export type PostTreeNode = {
  id: string;
  title: string;
  subTitle: string | null;
  subBlog: string;
  emoji: string | null;
  createdAt: string;
  order: number | null;
  tags: TagInfo[];
  children: PostTreeNode[];
};

function buildPostTree(
  posts: PostRow[],
  postIdToTags: Map<string, TagInfo[]>,
): PostTreeNode[] {
  const byParent = groupBy(posts, (p) => p.parent_id ?? "__root__");
  const idToNode = new Map<string, PostTreeNode>();

  for (const p of posts) {
    idToNode.set(p.id, {
      id: p.id,
      title: p.title,
      subTitle: p.sub_title ?? null,
      subBlog: p.sub_blog,
      emoji: p.emoji,
      createdAt: p.created_at,
      order: p.custom_order,
      tags: postIdToTags.get(p.id) ?? [],
      children: [],
    });
  }

  const roots: PostTreeNode[] = [];
  const rootIds = byParent["__root__"] ?? [];

  for (const p of rootIds) {
    const node = idToNode.get(p.id);
    if (node) roots.push(node);
  }

  for (const p of posts) {
    if (p.parent_id == null) continue;
    const parent = idToNode.get(p.parent_id);
    const child = idToNode.get(p.id);
    if (parent && child) parent.children.push(child);
  }

  const sortSiblings = (nodes: PostTreeNode[]) =>
    nodes.sort((a, b) => {
      const orderA = a.order ?? Infinity;
      const orderB = b.order ?? Infinity;
      if (orderA !== orderB) return orderA - orderB;
      return a.id.localeCompare(b.id);
    });
  sortSiblings(roots);
  const sortChildren = (node: PostTreeNode) => {
    sortSiblings(node.children);
    node.children.forEach(sortChildren);
  };
  roots.forEach(sortChildren);

  return roots;
}

function treeToText(nodes: PostTreeNode[], indent = ""): string {
  const lines: string[] = [];
  for (const node of nodes) {
    const label = [node.emoji, node.title].filter(Boolean).join(" ") || node.id;
    const subtitlePart = node.subTitle ? ` — ${node.subTitle}` : "";
    const tagsPart =
      node.tags.length > 0
        ? ` | ${node.tags.map((t) => t.id).join(", ")}`
        : "";
    lines.push(
      `${indent}${label}${subtitlePart} (${node.subBlog}) [${node.id}]${tagsPart}`,
    );
    if (node.children.length > 0) {
      lines.push(treeToText(node.children, indent + "  "));
    }
  }
  return lines.join("\n");
}

async function main() {
  await loadEnv();

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.error(
      "SUPABASE_URL, SUPABASE_ANON_KEY 환경 변수를 설정해 주세요.",
    );
    process.exit(1);
  }

  const supabase = createClient(url, key);

  const { data, error } = await supabase
    .from(POST_TABLE)
    .select(
    "id, parent_id, title, sub_title, sub_blog, emoji, created_at, custom_order",
  )
    .returns<PostRow[]>();

  if (error) {
    console.error("Supabase 조회 실패:", error.message);
    process.exit(1);
  }

  const posts = data ?? [];

  type PostTagRow = { post_id: string; tag_id: string; is_spoiler: boolean };
  type TagRow = { id: string; title: string | null; content: string[] | null };

  const [postTagsRes, tagsRes] = await Promise.all([
    supabase
      .from(POST_TAG_TABLE)
      .select("post_id, tag_id, is_spoiler")
      .returns<PostTagRow[]>(),
    supabase
      .from(TAG_TABLE)
      .select("id, title, content")
      .returns<TagRow[]>(),
  ]);

  const postTags = postTagsRes.data ?? [];
  const tagsRows = tagsRes.data ?? [];
  const tagById = new Map(tagsRows.map((t) => [t.id, t]));

  const postIdToTags = new Map<string, TagInfo[]>();
  for (const pt of postTags) {
    const tag = tagById.get(pt.tag_id);
    if (!tag) continue;
    const list = postIdToTags.get(pt.post_id) ?? [];
    list.push({
      id: tag.id,
      title: tag.title ?? "",
      content: tag.content ?? null,
      isSpoiler: pt.is_spoiler,
    });
    postIdToTags.set(pt.post_id, list);
  }

  const tree = buildPostTree(posts, postIdToTags);

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const outputDir = join(__dirname, "output");
  await mkdir(outputDir, { recursive: true });

  const txtPath = join(outputDir, "post-tree.txt");
  const tagsOnlyTxtPath = join(outputDir, "tags.txt");

  const header =
    "=== 글 제목 — 부제목 (sub_blog) [id] | tag_id, ... (들여쓰기 = parent depth)\n\n";
  const treeText = header + treeToText(tree);

  const tagsOnlyLines = ["=== 태그 목록 (tags 테이블) ===\n"];
  const sortedTags = [...tagsRows].sort((a, b) => a.id.localeCompare(b.id));
  for (const t of sortedTags) {
    tagsOnlyLines.push(`[${t.id}]`);
    tagsOnlyLines.push(`  title: ${t.title ?? ""}`);
    tagsOnlyLines.push(
      `  content: ${Array.isArray(t.content) ? t.content.join(" | ") : ""}`,
    );
    tagsOnlyLines.push("");
  }
  const tagsOnlyTxtContent = tagsOnlyLines.join("\n").trimEnd();

  await writeFile(txtPath, treeText, "utf-8");
  await writeFile(tagsOnlyTxtPath, tagsOnlyTxtContent, "utf-8");

  console.log("저장 완료:");
  console.log("  -", txtPath);
  console.log("  -", tagsOnlyTxtPath);
}

main();
