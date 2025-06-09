import React from "react";

export default function WavyText({ children }) {
  console.log(children);

  if (Array.isArray(children)) {
    return children?.map((child, index) =>
      typeof child === "string" ? (
        <React.Fragment key={index}>{child}</React.Fragment>
      ) : (
        <child.type key={index} className={child.props.className}>
          <WavyText>{child.props.children}</WavyText>
        </child.type>
      ),
    );
  }

  return typeof children === "string" ? (
    children
  ) : (
    <children.type className={children.props.className}>
      <WavyText>{children.props.children}</WavyText>
    </children.type>
  );
}
