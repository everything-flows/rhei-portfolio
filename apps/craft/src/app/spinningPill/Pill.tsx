"use client";

import { useEffect, useRef, useState } from "react";

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
  const [sin, setSin] = useState(0);
  const [cos, setCos] = useState(0);
  const [absSin, setAbsSin] = useState(0);
  const [blueTop, setBlueTop] = useState(`calc(${width} / 2)`);
  const [blackTop, setBlackTop] = useState(`calc(${width} / 2)`);

  useEffect(() => {
    function rotate(timestamp: number) {
      if (!startTimeRef.current) {
        return;
      }

      const value = (timestamp - startTimeRef.current) / speed;

      const s = Math.sin(value);

      setSin(s);
      setCos(Math.cos(value));
      setAbsSin(Math.abs(s));
      if (s < 0) {
        // blue is top, black is bottom
        setBlueTop(`calc(${s} * ${height} + ${width} / 2)`);
        setBlackTop(`calc(${width} / 2)`);
      } else {
        // blue is bottom, black is top
        setBlueTop(`calc(${width} / 2)`);
        setBlackTop(`calc(${s} * -${height} + ${width} / 2)`);
      }
      requestAnimationFrame((t) => rotate(t));
    }

    function firstFrame(timestamp: number) {
      startTimeRef.current = timestamp;
      rotate(timestamp);
    }

    requestAnimationFrame(firstFrame);
  }, [width, height]);

  return (
    <div
      className="relative"
      style={{ width, height: `calc(${height} * 2 + ${width})` }}
    >
      {/* circle */}
      <div
        className={`border-brand ${fill ? "bg-brand" : ""} absolute rounded-full border-2`}
        style={{
          top: `calc(${sin} * ${height} + ${height})`,
          width: width,
          height: width,
          zIndex: cos > 0 ? 0 : 1,
        }}
      />
      <div
        className={`border-gray-white ${fill ? "bg-gray-white" : ""} absolute rounded-full border-2`}
        style={{
          top: `calc(-1 * ${sin} * ${height} + ${height})`,
          width: width,
          height: width,
          zIndex: cos > 0 ? 1 : 0,
        }}
      />

      {/* square */}
      <div
        className={`border-brand ${fill ? "bg-brand" : ""} absolute border-2`}
        style={{
          top: `calc(${blueTop} + ${height})`,
          width: width,
          height: `calc(${absSin} * ${height})`,
          zIndex: cos > 0 ? 0 : 1,
        }}
      />
      <div
        className={`border-gray-white ${fill ? "bg-gray-white" : ""} absolute border-2`}
        style={{
          top: `calc(${blackTop} + ${height})`,
          width: width,
          height: `calc(${absSin} * ${height})`,
          zIndex: cos > 0 ? 1 : 0,
        }}
      />

      {/* center circle */}
      <div
        className={`border-brand ${fill ? "bg-brand" : ""} absolute rounded-full border-2`}
        style={{
          top: height,
          width: width,
          height: width,
          transform: `scaleY(${1 - absSin})`,
          zIndex: cos > 0 ? 0 : 1,
        }}
      />
      <div
        className={`border-gray-white ${fill ? "bg-gray-white" : ""} absolute rounded-full border-2`}
        style={{
          top: height,
          width: width,
          height: width,
          transform: `scaleY(${1 - absSin})`,
          zIndex: cos > 0 ? 1 : 0,
        }}
      />

      <div></div>
    </div>
  );
}
