"use client";

import PillElement from "./PillElement";
import { PillContext } from "./PillContext";

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
  const contextValue = { width, height, speed, fill };

  return (
    <PillContext.Provider value={contextValue}>
      <div
        className="relative"
        style={{ width, height: `calc(${height} * 2 + ${width})` }}
      >
        {/* caps */}
        <PillElement type="cap" position="top" />
        <PillElement type="cap" position="bottom" />

        {/* bodies */}
        <PillElement type="body" position="top" />
        <PillElement type="body" position="bottom" />

        {/* dividers */}
        <PillElement type="divider" position="top" />
        <PillElement type="divider" position="bottom" />
      </div>
    </PillContext.Provider>
  );
}
