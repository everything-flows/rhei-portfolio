import { Link } from "@remix-run/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/cjs/styles/prism";

import convertUrl from "~/utils/convertUrl";
import Highlight from "~/components/Highlight";
import ThemedIframe from "./ThemedIframe";

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

export default function PostContent({ content }) {
  return (
    <section className="text-responsive-p mx-auto max-w-6xl break-keep">
      {renderNodes(content, 0)}
    </section>
  );
}

function renderNodes(node, index) {
  if (!node) {
    return;
  }

  switch (node.type) {
    case "text": {
      if (!node.value) return;
      return node.value;
    }

    case "root": {
      return node.children.map((child, index: number) =>
        renderNodes(child, index),
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
          return (
            <img
              key={index}
              className="border-sub mx-auto my-4 w-full rounded-md border sm:w-[80dvw] md:w-[75dvw] lg:w-[60%]"
              alt={node.properties.alt}
              src={convertUrl(node.properties.src)}
              loading="lazy"
            />
          );
        }

        case "a": {
          const { href } = node.properties;

          if (href[0] === "#")
            return (
              <Link
                key={index}
                to={href}
                className="text-responsive-p text-blue-600 underline dark:text-orange-500"
              >
                {node.children.map((child, index: number) =>
                  renderNodes(child, index),
                )}
              </Link>
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
