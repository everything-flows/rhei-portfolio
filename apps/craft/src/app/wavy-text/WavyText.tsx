import React, { ReactElement, ReactNode } from "react";

function Render({ node }: { node: ReactNode }) {
  if (typeof node === "string" || typeof node === "number") {
    return <>{node}</>;
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
