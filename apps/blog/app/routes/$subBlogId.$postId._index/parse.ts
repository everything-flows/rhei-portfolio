import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { VFile } from "vfile";

export default async function parse(content: string) {
  const processor = await unified()
    .use([remarkParse, remarkMath, remarkGfm, rehypeKatex])
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw);

  const file = new VFile();
  file.value = content;

  return await processor.runSync(processor.parse(file), file);
}
