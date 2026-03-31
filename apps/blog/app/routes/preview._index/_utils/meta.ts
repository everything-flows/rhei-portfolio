import type { MetaFunction } from "@remix-run/cloudflare";

export default function meta(): ReturnType<MetaFunction> {
  return [
    { title: "Preview - Blog" },
    { name: "description", content: "로컬 파일 미리보기" },
  ];
}
