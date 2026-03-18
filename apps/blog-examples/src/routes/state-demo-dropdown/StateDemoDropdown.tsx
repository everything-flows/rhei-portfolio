import React, { useState, useRef, useEffect } from "react";

const OPTIONS = ["옵션 A", "옵션 B", "옵션 C"];

export default function StateDemoDropdown() {
  const [goodOpen, setGoodOpen] = useState(false);
  const [badOpen, setBadOpen] = useState(false);
  const [goodValue, setGoodValue] = useState<string | null>(null);
  const [badValue, setBadValue] = useState<string | null>(null);
  const goodRef = useRef<HTMLDivElement>(null);
  const badRef = useRef<HTMLDivElement>(null);

  // Good: ESC & outside click
  useEffect(() => {
    if (!goodOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setGoodOpen(false);
    };
    const handleClick = (e: MouseEvent) => {
      if (goodRef.current && !goodRef.current.contains(e.target as Node)) {
        setGoodOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    window.addEventListener("mousedown", handleClick);
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("mousedown", handleClick);
    };
  }, [goodOpen]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 text-gray-900">
      <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2">
        {/* 잘 된 케이스 */}
        <section className="rounded-lg border border-emerald-500 bg-emerald-50/50 p-4">
          <h2 className="mb-3 text-sm font-semibold text-emerald-800">
            잘 된 케이스
          </h2>
          <p className="mb-3 text-xs text-emerald-700">
            ESC·바깥 클릭으로 닫힘, 키보드로 항목 선택 가능
          </p>
          <div className="relative" ref={goodRef}>
            <button
              type="button"
              className="flex w-full items-center justify-between rounded border border-emerald-600 bg-white px-3 py-2 text-left text-sm hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
              onClick={() => setGoodOpen((o) => !o)}
              aria-expanded={goodOpen}
              aria-haspopup="listbox"
              aria-controls="good-listbox"
              id="good-trigger"
            >
              {goodValue ?? "선택하세요"}
              <span className="text-emerald-600">{goodOpen ? "▲" : "▼"}</span>
            </button>
            {goodOpen && (
              <ul
                id="good-listbox"
                role="listbox"
                className="absolute z-10 mt-1 w-full rounded border border-emerald-600 bg-white py-1 shadow"
              >
                {OPTIONS.map((opt, i) => (
                  <li
                    key={opt}
                    role="option"
                    tabIndex={0}
                    aria-selected={goodValue === opt}
                    className="cursor-pointer px-3 py-2 text-sm hover:bg-emerald-50 focus:bg-emerald-50 focus:outline-none"
                    onClick={() => {
                      setGoodValue(opt);
                      setGoodOpen(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setGoodValue(opt);
                        setGoodOpen(false);
                      }
                    }}
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* 잘 안 된 케이스 */}
        <section className="rounded-lg border border-amber-500 bg-amber-50/50 p-4">
          <h2 className="mb-3 text-sm font-semibold text-amber-800">
            잘 안 된 케이스
          </h2>
          <p className="mb-3 text-xs text-amber-700">ESC/바깥 클릭시 무반응</p>
          <div className="relative" ref={badRef}>
            <div
              className="flex cursor-pointer items-center justify-between rounded border border-gray-400 bg-white px-3 py-2 text-sm"
              onClick={() => setBadOpen((o) => !o)}
            >
              {badValue ?? "선택하세요"}
              <span>{badOpen ? "▲" : "▼"}</span>
            </div>
            {badOpen && (
              <div className="absolute z-10 mt-1 w-full rounded border border-gray-400 bg-white py-1 shadow">
                {OPTIONS.map((opt) => (
                  <div
                    key={opt}
                    className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100"
                    onClick={() => {
                      setBadValue(opt);
                      setBadOpen(false);
                    }}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
