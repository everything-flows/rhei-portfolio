import { Link, useLocation } from "@remix-run/react";
import { AnimatePresence, motion } from "motion/react";
import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { bounceTransition, tapAnimation } from "@rhei/ui";
import Highlight from "~/components/Highlight";
import convertUrl from "~/utils/convertUrl";

import ThemedIframe from "./ThemedIframe";

type TocItem = { level: number; id: string; text: string };

function extractToc(
  children: { type: string; tagName?: string; children?: unknown[] }[],
): TocItem[] {
  const items: TocItem[] = [];
  for (const child of children) {
    if (
      child.type === "element" &&
      child.tagName &&
      ["h1", "h2", "h3"].includes(child.tagName)
    ) {
      items.push({
        level: parseInt(child.tagName[1]),
        id: getId(child.children),
        text: solve(child.children),
      });
    }
  }
  return items;
}

function getId(child) {
  return solve(child)
    .replace(/\s+/g, "-")
    .replace(/[^\w\sㄱ-ㅎㅏ-ㅣ가-힣-]/g, "")
    .toLowerCase();
}

function solve(child) {
  if (!child) {
    return "";
  }

  if (typeof child === "string") {
    return child;
  }

  return child
    .map((item) => {
      if (typeof item === "string") {
        return item;
      }

      if (item.value) {
        return solve(item.value);
      }

      return solve(item.children);
    })
    .join("");
}

function useActiveHeadings(tocItems: TocItem[]) {
  const [activeIds, setActiveIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const calculate = () => {
      const viewTop = window.scrollY;
      const viewBottom = window.scrollY + window.innerHeight;

      const headings = tocItems
        .map(({ id, level }) => {
          const el = document.getElementById(id);
          if (!el) return null;
          return { id, level, top: el.getBoundingClientRect().top + window.scrollY };
        })
        .filter(Boolean) as { id: string; level: number; top: number }[];

      const active = new Set<string>();

      headings.forEach(({ id, level, top }, i) => {
        // 구역: 이 헤딩부터 바로 다음 헤딩(레벨 무관)까지
        const sectionBottom =
          i < headings.length - 1
            ? headings[i + 1].top
            : document.documentElement.scrollHeight;

        if (top < viewBottom && sectionBottom > viewTop + 1) {
          active.add(id);
        }
      });

      setActiveIds(active);
    };

    calculate();
    window.addEventListener("scroll", calculate, { passive: true });
    window.addEventListener("resize", calculate, { passive: true });
    return () => {
      window.removeEventListener("scroll", calculate);
      window.removeEventListener("resize", calculate);
    };
  }, [tocItems]);

  return activeIds;
}

function TocList({
  tocItems,
  minLevel,
  activeIds,
  onClickItem,
}: {
  tocItems: TocItem[];
  minLevel: number;
  activeIds: Set<string>;
  onClickItem?: () => void;
}) {
  const location = useLocation();

  return (
    <ul>
      {tocItems.map((item, i) => (
        <li key={i} style={{ paddingLeft: `${(item.level - minLevel) * 12}px` }}>
          <Link
            to={{
              pathname: location.pathname,
              search: location.search,
              hash: `#${item.id}`,
            }}
            className={`text-sm ${activeIds.has(item.id) ? "text-brand font-semibold" : ""}`}
            onClick={onClickItem}
          >
            {item.text}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function PostTocLayout({
  tocItems,
  minLevel,
  mainChildren,
}: {
  tocItems: TocItem[];
  minLevel: number;
  mainChildren: ReactNode[];
}) {
  const activeIds = useActiveHeadings(tocItems);

  return (
    <div className="flex gap-8">
      <div className="min-w-0 flex-1">
        <MobileToc tocItems={tocItems} minLevel={minLevel} activeIds={activeIds} />
        {mainChildren}
      </div>
      <aside className="hidden w-[280px] shrink-0 pt-6 lg:block">
        <div className="custom-scrollbar sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <p className="mb-2 font-bold">Table of Contents</p>
          <TocList tocItems={tocItems} minLevel={minLevel} activeIds={activeIds} />
        </div>
      </aside>
    </div>
  );
}

function MobileToc({
  tocItems,
  minLevel,
  activeIds,
}: {
  tocItems: TocItem[];
  minLevel: number;
  activeIds: Set<string>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        buttonRef.current &&
        panelRef.current &&
        !buttonRef.current.contains(e.target as Node) &&
        !panelRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative sticky top-4 z-10 mb-4 flex justify-end lg:hidden">
      <motion.button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        whileTap={tapAnimation.small}
        transition={bounceTransition}
        className="flex cursor-pointer items-center gap-2 rounded-full border bg-white/80 px-4 py-2 text-sm font-bold shadow-md backdrop-blur-md dark:bg-neutral-900/80"
      >
        <span>TOC</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▼
        </motion.span>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ scale: 0.9, opacity: 0, y: -8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ transformOrigin: "top right" }}
            className="custom-scrollbar absolute right-0 top-full z-10 mt-2 max-h-[60vh] w-full overflow-y-auto rounded-xl border bg-white/80 p-4 backdrop-blur-md dark:bg-neutral-900/80"
          >
            <TocList
              tocItems={tocItems}
              minLevel={minLevel}
              activeIds={activeIds}
              onClickItem={() => setIsOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PostContent({ content }: { content: ReactElement }) {
  return (
    <section className="text-responsive-p mx-auto max-w-6xl break-keep">
      {renderNodes(content, 0)}
    </section>
  );
}

function renderNodes(node, index): ReactNode {
  if (!node) {
    return;
  }

  switch (node.type) {
    case "text": {
      if (!node.value) return;
      return node.value;
    }

    case "root": {
      const children = node.children as typeof node.children;
      const tocItems = extractToc(children);
      const mainChildren = children.map((child, i) => renderNodes(child, i));

      if (tocItems.length === 0) return mainChildren;

      const minLevel = Math.min(...tocItems.map((t) => t.level));

      return (
        <PostTocLayout
          tocItems={tocItems}
          minLevel={minLevel}
          mainChildren={mainChildren}
        />
      );
    }

    case "raw": {
      return;
    }

    default: {
      switch (node.tagName) {
        case "hr": {
          return (
            <hr
              key={index}
              className="border-sub my-12 border-b border-dashed"
            />
          );
        }

        case "h1": {
          return (
            <h2
              key={index}
              id={getId(node.children)}
              className="text-responsive-h1 mb-3 mt-6 flex flex-col"
            >
              <span className="" {...node.properties}>
                {node.children.map((child, index: number) =>
                  renderNodes(child, index),
                )}
              </span>
              <span className="flex-1 border-b-2" />
            </h2>
          );
        }

        case "h2": {
          return (
            <h3
              key={index}
              id={getId(node.children)}
              className="text-responsive-h2 mb-2 mt-5"
              {...node.properties}
            >
              {node.children.map((child, index: number) =>
                renderNodes(child, index),
              )}
            </h3>
          );
        }

        case "h3": {
          return (
            <h4
              key={index}
              id={getId(node.children)}
              className="text-responsive-h3 mb-1 mt-4"
              {...node.properties}
            >
              {node.children.map((child, index: number) =>
                renderNodes(child, index),
              )}
            </h4>
          );
        }

        case "p": {
          return (
            <p
              key={index}
              className="text-responsive-p py-3"
              {...node.properties}
            >
              {node.children.map((child, index: number) =>
                renderNodes(child, index),
              )}
            </p>
          );
        }

        case "img": {
          const { alt, width } = parseImageAlt(node.properties.alt);

          return (
            <img
              key={index}
              className={`border-sub mx-auto my-4 rounded-md border ${
                width ? "" : "w-full sm:w-[80dvw] md:w-[75dvw] lg:w-[60%]"
              }`}
              style={width ? { width } : undefined}
              alt={alt}
              src={convertUrl(node.properties.src)}
              loading="lazy"
            />
          );
        }

        case "a": {
          const { href } = node.properties;

          if (href[0] === "#")
            return (
              <a
                key={index}
                href={href}
                className="text-responsive-p text-blue-600 underline dark:text-orange-500"
              >
                {node.children.map((child, index: number) =>
                  renderNodes(child, index),
                )}
              </a>
            );

          return (
            <a
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              href={href}
              className="text-responsive-p text-blue-600 underline dark:text-orange-500"
            >
              {node.children.map((child, index: number) =>
                renderNodes(child, index),
              )}
            </a>
          );
        }

        case "blockquote": {
          return (
            <blockquote
              key={index}
              {...node.properties}
              className="border-sub my-4 border-l-4 pl-4"
            >
              {node.children.map((child, index: number) =>
                renderNodes(child, index),
              )}
            </blockquote>
          );
        }

        case "li": {
          return (
            <li key={index} {...node.properties}>
              {node.children.map((child, index: number) =>
                renderNodes(child, index),
              )}
            </li>
          );
        }

        case "ul": {
          return (
            <ul key={index} className="list-disc ps-6" {...node.properties}>
              {node.children.map((child, index: number) =>
                renderNodes(child, index),
              )}
            </ul>
          );
        }

        case "ol": {
          return (
            <ol key={index} className="list-decimal ps-6" {...node.properties}>
              {node.children.map((child, index: number) =>
                renderNodes(child, index),
              )}
            </ol>
          );
        }

        case "strong": {
          return (
            <span key={index} className="font-bold" {...node.properties}>
              {node.children.map((child, index: number) =>
                renderNodes(child, index),
              )}
            </span>
          );
        }

        case "code": {
          if (!node.properties?.className)
            return (
              <code
                key={index}
                className="rounded-md bg-gray-100 px-1 dark:bg-gray-800"
                {...node.properties}
              >
                {node.children.map((child, index: number) =>
                  renderNodes(child, index),
                )}
              </code>
            );

          return (
            <div key={index}>
              <SyntaxHighlighter
                style={nord}
                language={node.properties?.className[0]?.split("language-")[1]}
                PreTag="div"
              >
                {node.children.map((child, index: number) =>
                  renderNodes(child, index),
                )}
              </SyntaxHighlighter>
            </div>
          );
        }

        case "table": {
          return (
            <div key={index} className="my-2 w-fit break-keep">
              <table
                {...node.properties}
                className="border-collapse border-none"
              >
                {node.children.map((child, index: number) =>
                  renderNodes(child, index),
                )}
              </table>
            </div>
          );
        }

        case "thead": {
          return (
            <thead key={index} {...node.properties}>
              {node.children.map((child, index: number) =>
                renderNodes(child, index),
              )}
            </thead>
          );
        }

        case "tbody": {
          return (
            <tbody key={index} {...node.properties}>
              {node.children.map((child, index: number) =>
                renderNodes(child, index),
              )}
            </tbody>
          );
        }

        case "tr": {
          return (
            <tr key={index} {...node.properties}>
              {node.children.map((child, index: number) =>
                renderNodes(child, index),
              )}
            </tr>
          );
        }

        case "td": {
          return (
            <td
              key={index}
              className="border-sub border px-3 py-1"
              {...node.properties}
            >
              {node.children.map((child, index: number) =>
                renderNodes(child, index),
              )}
            </td>
          );
        }

        case "th": {
          return (
            <th
              key={index}
              className="border-sub border px-3 py-1"
              {...node.properties}
            >
              {node.children.map((child, index: number) =>
                renderNodes(child, index),
              )}
            </th>
          );
        }

        case "br": {
          return <br key={index} />;
        }

        case "Highlight":
        case "highlight": {
          return (
            <Highlight
              key={index}
              className={node.properties?.className?.join(" ")}
            >
              {node.children.map((child, index: number) =>
                renderNodes(child, index),
              )}
            </Highlight>
          );
        }

        case "iframe": {
          return (
            <ThemedIframe
              key={index}
              src={node?.properties?.src}
              className="border-sub mx-auto my-4 w-full rounded-md border"
              {...node?.properties}
            />
          );
        }

        default: {
          const className = node?.properties?.className?.join(" ");
          const TagName = node?.tagName || "div";
          return (
            <TagName key={index} className={className}>
              {node.children?.map((child, index: number) =>
                renderNodes(child, index),
              )}
            </TagName>
          );
        }
      }
    }
  }
}

function parseImageAlt(rawAlt: string): { alt: string; width?: string } {
  if (!rawAlt?.includes("|")) return { alt: rawAlt };

  const [alt, widthPart] = rawAlt.split("|").map((s) => s.trim());
  if (!widthPart) return { alt };

  return { alt, width: widthPart };
}
