import { useEffect, useRef } from "react";
import { usePillContext } from "./PillContext";

type PillElementProps = {
  position: "top" | "bottom";
  type: "cap" | "body" | "divider";
};

export default function PillElement({ position, type }: PillElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number | null>(null);
  const { width, height, speed, fill } = usePillContext();

  const isTop = position === "top";

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current || !ref.current) return;

      const elapsed = (timestamp - startTimeRef.current) / speed;
      const sin = Math.sin(elapsed);
      const absSin = Math.abs(sin);
      const cos = Math.cos(elapsed);

      const zIndex = cos > 0 ? (isTop ? "0" : "1") : isTop ? "1" : "0";
      const style = ref.current.style;
      style.zIndex = zIndex;

      if (type === "cap") {
        style.top = `calc(${isTop ? sin : -sin} * ${height} + ${height})`;
      } else if (type === "body") {
        style.height = `calc(${absSin} * ${height})`;
        style.top = isTop
          ? sin < 0
            ? `calc(${sin} * ${height} + ${width} / 2 + ${height})`
            : `calc(${width} / 2 + ${height})`
          : sin < 0
            ? `calc(${width} / 2 + ${height})`
            : `calc(-1 * ${sin} * ${height} + ${width} / 2 + ${height})`;
      } else if (type === "divider") {
        style.transform = `scaleY(${1 - absSin})`;
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame((t) => {
      startTimeRef.current = t;
      animate(t);
    });
  }, [width, height, speed]);

  const base = `absolute border-2 ${
    isTop ? "border-brand" : "border-gray-white"
  } ${fill ? (isTop ? "bg-brand" : "bg-gray-white") : ""}`;

  return (
    <div
      ref={ref}
      className={`${base} ${type !== "body" ? "rounded-full" : ""}`}
      style={{
        top: height,
        width,
        height: width,
      }}
    />
  );
}
