import { StickyHeading } from "~/components/StickyHeading";

const TOOL_LIST = [
  {
    emoji: "⚙️",
    title: "핵심 스택",
    list: [
      {
        title: "JavaScript",
        link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
      { title: "TypeScript", link: "https://www.typescriptlang.org/" },
      { title: "React", link: "https://react.dev/" },
      { title: "Next.js", link: "https://nextjs.org/" },
      { title: "Remix", link: "https://remix.run/" },
    ],
  },
  {
    emoji: "🗂️",
    title: "상태 관리",
    list: [
      { title: "Tanstack Query", link: "https://tanstack.com/query/latest" },
      { title: "Zustand", link: "https://zustand-demo.pmnd.rs/" },
      { title: "Redux", link: "https://redux.js.org/" },
    ],
  },
  {
    emoji: "🎨",
    title: "스타일링",
    list: [
      { title: "Tailwind", link: "https://tailwindcss.com/" },
      { title: "Emotion", link: "https://emotion.sh/docs/introduction" },
      { title: "Styled Components", link: "https://styled-components.com/" },
    ],
  },
];

export default function Tools() {
  return (
    <section id="tools" className="mx-auto max-w-6xl py-4">
      <StickyHeading>
        <h2 className="text-title bg-normal">기술 및 도구</h2>
      </StickyHeading>

      <ul className="flex flex-col gap-4">
        {TOOL_LIST.map((tool) => (
          <li key={tool.title} className="flex flex-col gap-2">
            <StickyHeading>
              <h3 className="bg-normal flex items-center rounded-full text-[1.5rem] font-bold">
                {tool.title} {tool.emoji}
              </h3>
            </StickyHeading>
            <ul className="ml-6 flex flex-wrap gap-2">
              {tool.list.map((item) => (
                <li
                  key={item.title}
                  className="text-brand border-brand rounded-full border-[1.5px] px-4 py-1 font-medium"
                >
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
