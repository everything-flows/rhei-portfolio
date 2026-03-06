/**
 * 트리 구조 파일을 파싱해 Supabase posts 테이블에 반영하는 마이그레이션 스크립트.
 * - 없던 포스트: type=database, created_at/last_edited_at=오늘, insert
 * - 기존 포스트: parent_id, custom_order, sub_title(부제목), emoji(이모지) 필요 시 update
 * - 트리 한 줄 형식: "제목 — 부제목 (sub_blog) [id] | tag_id, ..." (태그는 선택)
 *
 * 보장: posts 테이블에는 delete를 호출하지 않습니다. 있던 글은 절대 삭제되지 않습니다.
 * (posts_tags는 트리 파일의 태그 목록과 맞추기 위해 추가/삭제할 수 있음)
 *
 * 실행: pnpm run migrate:tree [tree-file-path]
 * 기본 tree 파일: scripts/output/post-to-be.txt
 */

import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const POST_TABLE = "posts";
const POST_TAG_TABLE = "posts_tags";

type ParsedNode = {
  id: string;
  title: string;
  subTitle: string | null;
  subBlog: string;
  emoji: string | null;
  depth: number;
  parentId: string | null;
  customOrder: number;
  tagIds: string[];
};

const NODE_LINE_REGEX = /^\s*(.+?)\s+\(([^)]+)\)\s+\[([^\]]+)\]/;

function parseTreeFile(content: string): ParsedNode[] {
  const lines = content.split("\n");
  const nodes: ParsedNode[] = [];
  const stack: { depth: number; id: string }[] = [];

  for (const line of lines) {
    const trimmed = line.trimEnd();
    if (!trimmed || trimmed.startsWith("(")) continue; // 빈 줄, "(기존 구조 그대로 유지)" 등 스킵
    if (trimmed.startsWith("===")) continue; // 헤더 줄 스킵

    const match = trimmed.match(NODE_LINE_REGEX);
    if (!match) continue;

    const indentLength = line.match(/^\s*/)?.[0].length ?? 0;
    const depth = indentLength / 2;
    const label = match[1].trim();
    const subBlog = match[2].trim();
    const id = match[3].trim();

    const afterBracket = trimmed.slice(trimmed.lastIndexOf("]") + 1).trim();
    const tagPart = afterBracket.startsWith("|")
      ? afterBracket.slice(1).trim()
      : "";
    const tagIds = tagPart
      ? tagPart.split(/\s*,\s*/).map((s) => s.trim()).filter(Boolean)
      : [];

    let emoji: string | null = null;
    let title: string;
    const firstChar = [...label][0];
    if (firstChar && /\p{Emoji}/u.test(firstChar)) {
      emoji = firstChar;
      title = [...label].slice(1).join("").trim();
    } else {
      title = label;
    }
    if (!title) title = id;

    const dashIdx = title.indexOf(" — ");
    const subTitle =
      dashIdx >= 0 ? title.slice(dashIdx + 3).trim() : null;
    if (dashIdx >= 0) title = title.slice(0, dashIdx).trim();
    if (!title) title = id;

    while (stack.length > 0 && stack[stack.length - 1].depth >= depth) {
      stack.pop();
    }
    const parent =
      stack.length > 0 ? stack[stack.length - 1].id : null;
    const sameParentCount = nodes.filter((n) => n.parentId === parent).length;
    stack.push({ depth, id });

    nodes.push({
      id,
      title,
      subTitle: subTitle || null,
      subBlog,
      emoji,
      depth,
      parentId: parent,
      customOrder: sameParentCount,
      tagIds,
    });
  }

  return nodes;
}

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

async function main() {
  await loadEnv();

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.error("SUPABASE_URL, SUPABASE_ANON_KEY 환경 변수를 설정해 주세요.");
    process.exit(1);
  }

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const treePath =
    process.argv[2] ?? join(__dirname, "output", "post-to-be.txt");
  const treeContent = await readFile(treePath, "utf-8").catch((e) => {
    console.error("트리 파일을 읽을 수 없습니다:", treePath, e.message);
    process.exit(1);
  });

  console.log("읽은 트리 파일:", treePath);

  const nodes = parseTreeFile(treeContent);
  const nodesWithTags = nodes.filter((n) => n.tagIds.length > 0);
  console.log("파싱된 노드 수:", nodes.length, "| 태그 지정된 노드 수:", nodesWithTags.length);
  if (nodesWithTags.length > 0) {
    console.log("파싱된 태그 샘플 (처음 3개):", nodesWithTags.slice(0, 3).map((n) => ({ id: n.id, tagIds: n.tagIds })));
  }

  const supabase = createClient(url, key);

  type ExistingRow = {
    id: string;
    parent_id: string | null;
    custom_order: number | null;
    sub_title: string | null;
    emoji: string | null;
  };

  const { data: existingRows } = await supabase
    .from(POST_TABLE)
    .select("id, parent_id, custom_order, sub_title, emoji")
    .returns<ExistingRow[]>();

  const existingMap = new Map<string, ExistingRow>(
    (existingRows ?? []).map((r) => [r.id, r]),
  );

  const now = new Date().toISOString();

  let inserted = 0;
  let updated = 0;
  let tagsAdded = 0;
  let tagsRemoved = 0;
  let tagSyncDebugLogged = false;

  // 기존 글은 UPDATE만 수행. delete 호출 없음 → 있던 글 삭제되지 않음.
  for (const node of nodes) {
    const existing = existingMap.get(node.id);

    if (!existing) {
      const { error } = await supabase.from(POST_TABLE).insert({
        id: node.id,
        title: node.title,
        sub_title: node.subTitle,
        sub_blog: node.subBlog,
        type: "database",
        parent_id: node.parentId,
        emoji: node.emoji,
        custom_order: node.customOrder,
        created_at: now,
        last_edited_at: now,
        content: null,
      });
      if (error) {
        console.error("INSERT 실패:", node.id, error.message);
        continue;
      }
      inserted++;
      existingMap.set(node.id, {
        id: node.id,
        parent_id: node.parentId,
        custom_order: node.customOrder,
        sub_title: node.subTitle,
        emoji: node.emoji,
      });
    } else {
      const needUpdate =
        existing.parent_id !== node.parentId ||
        (existing.custom_order ?? -1) !== node.customOrder ||
        (existing.sub_title ?? null) !== (node.subTitle ?? null) ||
        (existing.emoji ?? null) !== (node.emoji ?? null);
      if (needUpdate) {
        const { error } = await supabase
          .from(POST_TABLE)
          .update({
            parent_id: node.parentId,
            custom_order: node.customOrder,
            sub_title: node.subTitle,
            emoji: node.emoji,
          })
          .eq("id", node.id);
        if (error) {
          console.error("UPDATE 실패:", node.id, error.message);
          continue;
        }
        updated++;
      }
    }

    // 태그 동기화: 트리 파일의 tagIds와 posts_tags를 맞춤 (해당 글만 수정, 글 삭제 없음). posts 업데이트 유무와 관계없이 항상 실행.
    const desiredTagIds = new Set(node.tagIds);

    const { data: currentLinks, error: linksError } = await supabase
      .from(POST_TAG_TABLE)
      .select("tag_id")
      .eq("post_id", node.id);

    if (linksError) {
      console.error("태그 조회 실패:", node.id, linksError.message);
    }

    const rawRows = Array.isArray(currentLinks) ? currentLinks : [];
    const currentTagIds = new Set<string>(
      rawRows.map((r: unknown) => {
        const row = r as Record<string, unknown>;
        const id = row.tag_id ?? row.tagId;
        return typeof id === "string" ? id : "";
      }).filter(Boolean),
    );
    const toAdd = [...desiredTagIds].filter((tid) => !currentTagIds.has(tid));
    const toRemove = [...currentTagIds].filter((tid) => !desiredTagIds.has(tid));

    if (!tagSyncDebugLogged && node.tagIds.length > 0) {
      tagSyncDebugLogged = true;
      console.log("\n[디버그] 태그 비교 (첫 번째 태그 보유 노드):", node.id);
      console.log("  Supabase raw 응답 (post_id=" + node.id + "):", JSON.stringify(currentLinks));
      console.log("  파일(목표):", [...desiredTagIds].sort());
      console.log("  DB(현재):", [...currentTagIds].sort());
      console.log("  → 추가:", toAdd, "제거:", toRemove);
    }

    if (toAdd.length > 0 || toRemove.length > 0) {
      console.log("태그 동기화:", node.id, "→ 추가:", toAdd, "제거:", toRemove);
    }

    for (const tagId of toRemove) {
      const { error } = await supabase
        .from(POST_TAG_TABLE)
        .delete()
        .eq("post_id", node.id)
        .eq("tag_id", tagId);
      if (error) {
        console.error("태그 제거 실패:", node.id, tagId, error.message);
        continue;
      }
      tagsRemoved++;
    }
    for (const tagId of toAdd) {
      const { error } = await supabase.from(POST_TAG_TABLE).insert({
        post_id: node.id,
        tag_id: tagId,
        is_spoiler: false,
      });
      if (error) {
        console.error("태그 추가 실패:", node.id, tagId, error.message);
        continue;
      }
      tagsAdded++;
    }
  }

  console.log("--- 결과 ---");
  console.log("posts 삽입:", inserted, "| 업데이트:", updated);
  console.log("태그 추가:", tagsAdded, "| 태그 제거:", tagsRemoved);

  const anyChange = inserted > 0 || updated > 0 || tagsAdded > 0 || tagsRemoved > 0;
  if (anyChange) {
    console.log("\n마이그레이션 완료.");
  } else if (nodesWithTags.length > 0) {
    console.log("\n변경 사항 없음 (DB가 이미 트리 파일과 동일합니다).");
  } else {
    console.log("\n마이그레이션 완료 (변경할 항목 없음).");
  }
}

main();
