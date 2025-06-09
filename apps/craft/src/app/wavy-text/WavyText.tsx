"use client";

import React, { ReactElement, ReactNode, useEffect, useRef } from "react";

const TIME = 400;
const HEIGHT = 5; // -{HEIGHT}px ~ {HEIGHT}px

function WavyItem({ item }: { item: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const animationFrameRef = useRef<number>(null);

  useEffect(() => {
    let start = performance.now();

    const animate = (time: number) => {
      const elapsed = time - start;
      const y = Math.sin(elapsed / TIME) * HEIGHT;

      if (ref.current) {
        ref.current.style.transform = `translateY(${y}px)`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="inline-block"
      style={{ transform: "translateY(5px)" }}
    >
      {item}
    </span>
  );
}

function Render({ node }: { node: ReactNode }) {
  if (typeof node === "string" || typeof node === "number") {
    return (
      <span aria-label={node.toString()} className="whitespace-pre-wrap">
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
