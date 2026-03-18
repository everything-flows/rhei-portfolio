import React, { useState } from "react";

export default function StateDemoForm() {
  const [goodLoading, setGoodLoading] = useState(false);
  const [goodError, setGoodError] = useState<string | null>(null);
  const [goodEmail, setGoodEmail] = useState("");
  const [badLoading, setBadLoading] = useState(false);
  const [badError, setBadError] = useState<string | null>(null);
  const [badEmail, setBadEmail] = useState("");

  const handleGoodSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGoodError(null);
    setGoodLoading(true);
    setTimeout(() => {
      if (!goodEmail.includes("@")) {
        setGoodError("올바른 이메일을 입력하세요.");
      }
      setGoodLoading(false);
    }, 1200);
  };

  const handleBadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBadError(null);
    setBadLoading(true);
    setTimeout(() => {
      if (!badEmail.includes("@")) {
        setBadError("올바른 이메일을 입력하세요.");
      }
      setBadLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 text-gray-900">
      <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2">
        {/* 잘 된 케이스 */}
        <section className="rounded-lg border border-emerald-500 bg-emerald-50/50 p-4">
          <h2 className="mb-3 text-sm font-semibold text-emerald-800">
            잘 된 케이스
          </h2>
          <p className="mb-3 text-xs text-emerald-700">
            제출 시 loading 표시, 에러 시 메시지·시각적 피드백
          </p>
          <form onSubmit={handleGoodSubmit} className="space-y-3">
            <div>
              <label
                htmlFor="good-email"
                className="mb-1 block text-xs font-medium text-gray-700"
              >
                이메일
              </label>
              <input
                id="good-email"
                type="email"
                value={goodEmail}
                onChange={(e) => setGoodEmail(e.target.value)}
                className="w-full rounded border border-emerald-600 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="you@example.com"
                aria-invalid={!!goodError}
                aria-describedby={goodError ? "good-error" : undefined}
              />
              {goodError && (
                <p
                  id="good-error"
                  className="mt-1 text-xs text-red-600"
                  role="alert"
                >
                  {goodError}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={goodLoading}
              className="w-full rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {goodLoading ? "제출 중…" : "제출"}
            </button>
          </form>
        </section>

        {/* 잘 안 된 케이스 */}
        <section className="rounded-lg border border-amber-500 bg-amber-50/50 p-4">
          <h2 className="mb-3 text-sm font-semibold text-amber-800">
            잘 안 된 케이스
          </h2>
          <p className="mb-3 text-xs text-amber-700">
            로딩 중에도 버튼 그대로 클릭 가능, focus ring 없음
          </p>
          <form onSubmit={handleBadSubmit} className="space-y-3">
            <div>
              <label
                htmlFor="bad-email"
                className="mb-1 block text-xs font-medium text-gray-700"
              >
                이메일
              </label>
              <input
                id="bad-email"
                type="email"
                value={badEmail}
                onChange={(e) => setBadEmail(e.target.value)}
                className="w-full rounded border border-gray-400 px-3 py-2 text-sm"
                placeholder="you@example.com"
              />
              {badError && (
                <p className="mt-1 text-xs text-red-600">{badError}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 active:bg-emerald-800"
            >
              제출
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
