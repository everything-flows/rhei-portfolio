import { unified } from "unified";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkToc from "remark-toc";
import rehypeRaw from "rehype-raw";
import { VFile } from "vfile";

export default async function parse(content: string) {
  const processor = await unified()
    .use([remarkParse, remarkMath, remarkGfm, remarkToc, rehypeKatex])
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw);

  const file = new VFile();
  file.value = content;

  return await processor.runSync(processor.parse(file), file);
}
