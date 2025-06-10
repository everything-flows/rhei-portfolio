"use client";

import { useEffect, useRef } from "react";

export default function Pill({
  width = "4rem",
  height = "3rem",
  speed = 500,
  fill = true,
}: {
  width?: string;
  height?: string;
  speed?: number;
  fill?: boolean;
}) {
  const startTimeRef = useRef<number | null>(null);
  const topCapRef = useRef<HTMLDivElement>(null);
  const bottomCapRef = useRef<HTMLDivElement>(null);
  const topBodyRef = useRef<HTMLDivElement>(null);
  const bottomBodyRef = useRef<HTMLDivElement>(null);
  const topDividerRef = useRef<HTMLDivElement>(null);
  const bottomDividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function rotate(timestamp: number) {
      if (!startTimeRef.current) {
        return;
      }

      const value = (timestamp - startTimeRef.current) / speed;

      const sin = Math.sin(value);
      const absSin = Math.abs(sin);
      const cos = Math.cos(value);

      const getTopZIndex = () => (cos > 0 ? "0" : "1");
      const getBottomZIndex = () => (cos > 0 ? "1" : "0");

      if (topCapRef.current) {
        topCapRef.current.style.top = `calc(${sin} * ${height} + ${height})`;
        topCapRef.current.style.zIndex = getTopZIndex();
      }

      if (bottomCapRef.current) {
        bottomCapRef.current.style.top = `calc(-1 * ${sin} * ${height} + ${height})`;
        bottomCapRef.current.style.zIndex = getBottomZIndex();
      }

      if (topBodyRef.current) {
        topBodyRef.current.style.height = `calc(${absSin} * ${height})`;
        topBodyRef.current.style.top =
          sin < 0
            ? `calc(${sin} * ${height} + ${width} / 2 + ${height})`
            : `calc(${width} / 2 + ${height})`;
        topBodyRef.current.style.zIndex = getTopZIndex();
      }

      if (bottomBodyRef.current) {
        bottomBodyRef.current.style.height = `calc(${absSin} * ${height})`;
        bottomBodyRef.current.style.top =
          sin < 0
            ? `calc(${width} / 2 + ${height})`
            : `calc(-1 * ${sin} * ${height} + ${width} / 2 + ${height})`;
        bottomBodyRef.current.style.zIndex = getBottomZIndex();
      }

      if (topDividerRef.current) {
        topDividerRef.current.style.transform = `scaleY(${1 - absSin})`;
        topDividerRef.current.style.zIndex = getTopZIndex();
      }

      if (bottomDividerRef.current) {
        bottomDividerRef.current.style.transform = `scaleY(${1 - absSin})`;
        bottomDividerRef.current.style.zIndex = getBottomZIndex();
      }

      requestAnimationFrame((t) => rotate(t));
    }

    function firstFrame(timestamp: number) {
      startTimeRef.current = timestamp;
      rotate(timestamp);
    }

    requestAnimationFrame(firstFrame);
  }, [width, height, speed]);

  return (
    <div
      className="relative"
      style={{ width, height: `calc(${height} * 2 + ${width})` }}
    >
      {/* cap */}
      <div
        ref={topCapRef}
        className={`border-brand ${fill ? "bg-brand" : ""} absolute rounded-full border-2`}
        style={{
          top: height,
          width: width,
          height: width,
        }}
      />
      <div
        ref={bottomCapRef}
        className={`border-gray-white ${fill ? "bg-gray-white" : ""} absolute rounded-full border-2`}
        style={{
          top: height,
          width: width,
          height: width,
        }}
      />

      {/* body */}
      <div
        ref={topBodyRef}
        className={`border-brand ${fill ? "bg-brand" : ""} absolute border-2`}
        style={{
          width: width,
          top: `calc(${height} + ${width} / 2)`,
        }}
      />
      <div
        ref={bottomBodyRef}
        className={`border-gray-white ${fill ? "bg-gray-white" : ""} absolute border-2`}
        style={{
          width: width,
          top: `calc(${height} + ${width} / 2)`,
        }}
      />

      {/* divider */}
      <div
        ref={topDividerRef}
        className={`border-brand ${fill ? "bg-brand" : ""} absolute rounded-full border-2`}
        style={{
          top: height,
          width: width,
          height: width,
        }}
      />
      <div
        ref={bottomDividerRef}
        className={`border-gray-white ${fill ? "bg-gray-white" : ""} absolute rounded-full border-2`}
        style={{
          top: height,
          width: width,
          height: width,
        }}
      />

      <div></div>
    </div>
  );
}
