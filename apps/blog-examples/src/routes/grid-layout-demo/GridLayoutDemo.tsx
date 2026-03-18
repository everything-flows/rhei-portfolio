import React from "react";

const CARD = "rounded-lg border border-gray-200 bg-white p-4 shadow-sm";

/**
 * Grid 예제: 카드 갤러리처럼 행·열을 함께 다루는 배치
 */
export default function GridLayoutDemo() {
  return (
    <div className="min-h-screen bg-white p-4 text-gray-900">
      <div className="mx-auto max-w-md space-y-6">
        <div className="grid grid-cols-3 gap-4 rounded-lg border border-blue-500 bg-white p-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className={CARD}>
              <div className="mb-2 h-3 w-3/4 rounded bg-gray-200" />
              <div className="h-2 w-full rounded bg-gray-100" />
            </div>
          ))}
        </div>
        <div
          className="grid gap-3 rounded-lg border border-blue-500 bg-white p-4"
          style={{ gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "auto auto 1fr" }}
        >
          <div className={`${CARD} col-span-3`}>
            <div className="mb-1 h-2 w-1/4 rounded bg-gray-200" />
            <div className="h-3 w-full rounded bg-gray-100" />
          </div>
          <div className={`${CARD} col-span-2 row-span-2`}>
            <div className="mb-2 h-2 w-1/3 rounded bg-gray-200" />
            <div className="h-16 rounded bg-gray-100" />
            <div className="mt-2 h-2 w-2/3 rounded bg-gray-100" />
          </div>
          <div className={CARD}>
            <div className="mb-1 h-2 w-full rounded bg-gray-200" />
            <div className="h-2 rounded bg-gray-100" />
          </div>
          <div className={CARD}>
            <div className="mb-1 h-2 w-1/2 rounded bg-gray-200" />
            <div className="h-2 rounded bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
}
