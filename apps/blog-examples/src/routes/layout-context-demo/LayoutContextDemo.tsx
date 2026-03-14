import React, { useEffect, useState } from "react";

const BOX_SIZE = "h-24 w-24"; // 96px — 키운 크기
const COLORS = ["red", "blue", "yellow", "green", "orange"] as const;

/**
 * 데모: Figma(캔버스 기준) vs 웹(뷰포트·콘텐츠 기준) 레이아웃 차이.
 * hash #xy → x,y 지정만, #flow → 정렬 배치만
 */
export default function LayoutContextDemo() {
  const [view, setView] = useState<"all" | "xy" | "flow">("all");

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (hash === "xy") setView("xy");
    else if (hash === "flow") setView("flow");
    else setView("all");
  }, []);

  const showXy = view === "all" || view === "xy";
  const showFlow = view === "all" || view === "flow";

  return (
    <div className="min-h-screen bg-white p-4 text-gray-900">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* x, y 지정 배치 */}
        {showXy && (
        <section className="rounded-lg border border-blue-500 bg-blue-50/50 p-4">
          <h2 className="mb-2 text-sm font-semibold text-blue-800">
            이렇게 x, y를 지정하는 배치보다
          </h2>
          <div className="relative h-44 w-full overflow-hidden">
            <div className="relative h-full min-w-[520px] rounded border border-blue-500 bg-white">
              <div
                className={`absolute ${BOX_SIZE} shrink-0`}
                style={{ left: 12, top: 8, backgroundColor: COLORS[0] }}
              />
              <div
                className={`absolute ${BOX_SIZE} shrink-0`}
                style={{ left: 110, top: 44, backgroundColor: COLORS[1] }}
              />
              <div
                className={`absolute ${BOX_SIZE} shrink-0`}
                style={{ left: 200, top: 4, backgroundColor: COLORS[2] }}
              />
              <div
                className={`absolute ${BOX_SIZE} shrink-0`}
                style={{ left: 300, top: 72, backgroundColor: COLORS[3] }}
              />
              <div
                className={`absolute ${BOX_SIZE} shrink-0`}
                style={{ left: 390, top: 100, backgroundColor: COLORS[4] }}
              />
            </div>
          </div>
        </section>
        )}

        {/* 정렬 배치 */}
        {showFlow && (
        <section className="rounded-lg border border-emerald-500 bg-emerald-50/50 p-4">
          <h2 className="mb-2 text-sm font-semibold text-emerald-800">
            이렇게 정렬되는 배치가 더 기본적이에요
          </h2>
          <div className="flex min-h-32 flex-wrap rounded border border-emerald-500 bg-white">
            {COLORS.map((c) => (
              <div
                key={c}
                className={`${BOX_SIZE} shrink-0`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </section>
        )}
      </div>
    </div>
  );
}
