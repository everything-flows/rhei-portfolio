import React, { ReactElement, ReactNode } from "react";

function WavyItem({ item }: { item: string }) {
  return <span aria-hidden="true">{item}</span>;
}

function Render({ node }: { node: ReactNode }) {
  if (typeof node === "string" || typeof node === "number") {
    return (
      <span aria-label={node.toString()}>
        {[...node.toString()].map((char, index) => (
          <WavyItem key={index} item={char} />
        ))}
      </span>
    );
  }

  if (React.isValidElement(node)) {
    const element = node as ReactElement<any>;
    const { type, props } = element;

    return React.createElement(
      type,
      { className: props.className },
      <WavyText>{props.children}</WavyText>,
    );
  }

  return null;
}

export default function WavyText({ children }: { children: ReactNode }) {
  if (Array.isArray(children)) {
    return children?.map((child, index) => <Render key={index} node={child} />);
  }

  return <Render node={children} />;
}
