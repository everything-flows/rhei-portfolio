import React, { useState } from "react";

export default function StateDemoButton() {
  const [goodDisabled, setGoodDisabled] = useState(false);
  const [badDisabled, setBadDisabled] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-4 text-gray-900">
      <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2">
        {/* 잘 된 케이스 */}
        <section className="rounded-lg border border-emerald-500 bg-emerald-50/50 p-4">
          <h2 className="mb-3 text-sm font-semibold text-emerald-800">
            잘 된 케이스
          </h2>
          <p className="mb-3 text-xs text-emerald-700">
            disabled일 때 실제로 클릭 막힘
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700 active:scale-[0.98] active:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none"
              onClick={() => alert("클릭됨")}
              disabled={goodDisabled}
            >
              제출
            </button>
            <button
              type="button"
              className="rounded border border-emerald-600 bg-white px-4 py-2 text-emerald-700 hover:bg-emerald-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none"
              onClick={() => setGoodDisabled((d) => !d)}
            >
              {goodDisabled ? "disabled 해제" : "disabled 켜기"}
            </button>
          </div>
        </section>

        {/* 잘 안 된 케이스 */}
        <section className="rounded-lg border border-amber-500 bg-amber-50/50 p-4">
          <h2 className="mb-3 text-sm font-semibold text-amber-800">
            잘 안 된 케이스
          </h2>
          <p className="mb-3 text-xs text-amber-700">
            disabled에서 실제로는 클릭됨
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700 active:scale-[0.98] active:bg-emerald-800"
              style={badDisabled ? { opacity: 0.5 } : {}}
              onClick={() => {
                alert("클릭됨");
              }}
            >
              제출
            </button>
            <button
              type="button"
              className="rounded border border-amber-600 bg-white px-4 py-2 text-amber-700"
              onClick={() => setBadDisabled((d) => !d)}
            >
              {badDisabled ? "disabled 해제" : "disabled처럼 보이게"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
