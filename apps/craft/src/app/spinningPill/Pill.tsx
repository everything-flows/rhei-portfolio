"use client";

import { useEffect, useRef, useState } from "react";

export default function Pill() {
  const startTimeRef = useRef<number | null>(null);
  const [sin, setSin] = useState(0);
  const [cos, setCos] = useState(0);
  const [absSin, setAbsSin] = useState(0);
  const [blueTop, setBlueTop] = useState("calc(2rem)");
  const [blackTop, setBlackTop] = useState("calc(2rem)");

  useEffect(() => {
    function rotate(timestamp: number) {
      if (!startTimeRef.current) {
        return;
      }

      const value = (timestamp - startTimeRef.current) / 500;

      const s = Math.sin(value);

      setSin(s);
      setCos(Math.sin(value));
      setAbsSin(Math.abs(s));
      if (s < 0) {
        setBlueTop(`calc(${s} * 4rem + 2rem)`);
        setBlackTop("2rem");
      } else {
        setBlueTop("2rem");
        setBlackTop(`calc(${-s} * 4rem + 2rem)`);
      }
      requestAnimationFrame((t) => rotate(t));
    }

    function firstFrame(timestamp: number) {
      startTimeRef.current = timestamp;
      rotate(timestamp);
    }

    requestAnimationFrame(firstFrame);
  }, []);

  return (
    <div className="relative m-40 size-40">
      {/* circle */}
      <div
        className="border-brand bg-brand absolute rounded-full border-2"
        style={{
          top: `calc(${sin} * 4rem)`,
          width: "4rem",
          height: "4rem",
        }}
      />
      <div
        className="border-reverse bg-reverse absolute rounded-full border-2"
        style={{
          top: `calc(-1 * ${sin} * 4rem)`,
          width: "4rem",
          height: "4rem",
        }}
      />

      {/* square */}
      <div
        className="border-brand bg-brand absolute border-2"
        style={{
          top: blueTop,
          width: "4rem",
          height: `calc(${absSin} * 4rem)`,
        }}
      />
      <div
        className="border-reverse bg-reverse absolute border-2"
        style={{
          top: blackTop,
          width: "4rem",
          height: `calc(${absSin} * 4rem)`,
        }}
      />

      {/* center circle */}
      <div
        className="border-brand bg-brand absolute rounded-full border-2"
        style={{
          top: 0,
          width: "4rem",
          height: "4rem",
          transform: `scaleY(${1 - absSin})`,
          opacity: cos > 0 ? 0 : 1,
        }}
      />
      <div
        className="border-reverse bg-reverse absolute rounded-full border-2"
        style={{
          top: 0,
          width: "4rem",
          height: "4rem",
          transform: `scaleY(${1 - absSin})`,
          opacity: cos > 0 ? 1 : 0,
        }}
      />

      <div></div>
    </div>
  );
}
