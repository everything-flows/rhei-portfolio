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
  const topCircleRef = useRef<HTMLDivElement>(null);
  const bottomCircleRef = useRef<HTMLDivElement>(null);
  const topSquareRef = useRef<HTMLDivElement>(null);
  const bottomSquareRef = useRef<HTMLDivElement>(null);
  const topCenterRef = useRef<HTMLDivElement>(null);
  const bottomCenterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function rotate(timestamp: number) {
      if (
        !startTimeRef.current ||
        !topCircleRef.current ||
        !bottomCircleRef.current ||
        !topSquareRef.current ||
        !bottomSquareRef.current ||
        !topCenterRef.current ||
        !bottomCenterRef.current
      ) {
        return;
      }

      const value = (timestamp - startTimeRef.current) / speed;

      const sin = Math.sin(value);
      const absSin = Math.abs(sin);
      const cos = Math.cos(value);

      topCircleRef.current.style.top = `calc(${sin} * ${height} + ${height})`;
      bottomCircleRef.current.style.top = `calc(-1 * ${sin} * ${height} + ${height})`;
      topSquareRef.current.style.height = `calc(${absSin} * ${height})`;
      bottomSquareRef.current.style.height = `calc(${absSin} * ${height})`;

      if (sin < 0) {
        topSquareRef.current.style.top = `calc(${sin} * ${height} + ${width} / 2 + ${height})`;
        bottomSquareRef.current.style.top = `calc(${width} / 2 + ${height})`;
      } else {
        topSquareRef.current.style.top = `calc(${width} / 2 + ${height})`;
        bottomSquareRef.current.style.top = `calc(-1 * ${sin} * ${height} + ${width} / 2 + ${height})`;
      }

      topCenterRef.current.style.transform = `scaleY(${1 - absSin})`;
      bottomCenterRef.current.style.transform = `scaleY(${1 - absSin})`;

      const getTopZIndex = () => (cos > 0 ? "0" : "1");
      const getBottomZIndex = () => (cos > 0 ? "1" : "0");

      topCircleRef.current.style.zIndex = getTopZIndex();
      topSquareRef.current.style.zIndex = getTopZIndex();
      topCenterRef.current.style.zIndex = getTopZIndex();
      bottomCircleRef.current.style.zIndex = getBottomZIndex();
      bottomSquareRef.current.style.zIndex = getBottomZIndex();
      bottomCenterRef.current.style.zIndex = getBottomZIndex();

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
      {/* circle */}
      <div
        ref={topCircleRef}
        className={`border-brand ${fill ? "bg-brand" : ""} absolute rounded-full border-2`}
        style={{
          width: width,
          height: width,
        }}
      />
      <div
        ref={bottomCircleRef}
        className={`border-gray-white ${fill ? "bg-gray-white" : ""} absolute rounded-full border-2`}
        style={{
          width: width,
          height: width,
        }}
      />

      {/* square */}
      <div
        ref={topSquareRef}
        className={`border-brand ${fill ? "bg-brand" : ""} absolute border-2`}
        style={{
          width: width,
        }}
      />
      <div
        ref={bottomSquareRef}
        className={`border-gray-white ${fill ? "bg-gray-white" : ""} absolute border-2`}
        style={{
          width: width,
        }}
      />

      {/* center circle */}
      <div
        ref={topCenterRef}
        className={`border-brand ${fill ? "bg-brand" : ""} absolute rounded-full border-2`}
        style={{
          top: height,
          width: width,
          height: width,
        }}
      />
      <div
        ref={bottomCenterRef}
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
