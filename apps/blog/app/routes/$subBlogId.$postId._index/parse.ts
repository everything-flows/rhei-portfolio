import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import { VFile } from "vfile";

// remark이 HTML 블록 안의 내용을 raw HTML로 넘기면 rehypeRaw(parse5)가
// `<algorithm>` 같은 코드 내 꺾쇠를 HTML 태그로 오인한다.
// remarkRehype 전에 백틱 코드 스팬을 미리 <code> 태그로 변환해 방지한다.
function remarkEscapeCodeInHtml() {
  return (tree) => {
    visit(tree, "html", (node) => {
      node.value = node.value.replace(/`([^`\n]+)`/g, (_, code: string) => {
        const escaped = code
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
        return `<code>${escaped}</code>`;
      });
    });
  };
}

export default async function parse(content: string) {
  const processor = await unified()
    .use([remarkParse, remarkMath, remarkGfm, rehypeKatex])
    .use(remarkEscapeCodeInHtml)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw);

  const file = new VFile();
  file.value = content;

  return await processor.runSync(processor.parse(file), file);
}
