import React, { useEffect, useState } from "react";

const PAGE_SIZE = 4096; // 4KB
const OFFSET_BITS = 12; // log2(4096)
const OFFSET_MASK = (1 << OFFSET_BITS) - 1; // 0xFFF

// 문서 예시와 추가 예시 매핑 (VPN → Frame)
const EXAMPLE_PAGE_TABLE: Record<number, number> = {
  0x12345: 0xabcde,
  0x10000: 0x20000,
  0x00001: 0x0f001,
};

function parseHex(hex: string): number | null {
  const cleaned = hex.replace(/^0x/i, "").trim();
  if (!/^[0-9a-fA-F]+$/.test(cleaned)) return null;
  const n = parseInt(cleaned, 16);
  return Number.isNaN(n) ? null : n >>> 0;
}

function formatHex(n: number, width = 8): string {
  return "0x" + n.toString(16).toUpperCase().padStart(width, "0");
}

export default function MMUDemo() {
  const [virtualInput, setVirtualInput] = useState("0x12345678");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (
        e.data?.type === "THEME_UPDATE" &&
        (e.data.theme === "dark" || e.data.theme === "light")
      ) {
        setTheme(e.data.theme);
      }
    };
    window.addEventListener("message", handler);
    if (window.parent !== window) {
      window.parent.postMessage({ type: "REQUEST_THEME" }, "*");
    }
    return () => window.removeEventListener("message", handler);
  }, []);

  const virtual = parseHex(virtualInput);
  const vpn = virtual !== null ? (virtual >>> OFFSET_BITS) >>> 0 : null;
  const offset = virtual !== null ? (virtual & OFFSET_MASK) >>> 0 : null;
  const frame =
    vpn !== null && vpn in EXAMPLE_PAGE_TABLE ? EXAMPLE_PAGE_TABLE[vpn] : null;
  const physical =
    frame !== null && offset !== null
      ? (frame * PAGE_SIZE + offset) >>> 0
      : null;
  const pageFault = vpn !== null && !(vpn in EXAMPLE_PAGE_TABLE);

  const isDark = theme === "dark";
  const card = isDark
    ? "bg-gray-800 border-gray-700"
    : "bg-white border-gray-200";
  const text = isDark ? "text-gray-100" : "text-gray-900";
  const muted = isDark ? "text-gray-400" : "text-gray-500";
  const inputBg = isDark
    ? "bg-gray-700 border-gray-600 text-gray-100"
    : "bg-white border-gray-300";
  const tableBorder = isDark ? "border-gray-600" : "border-gray-200";
  const highlight = isDark
    ? "bg-amber-900/40 border-amber-600"
    : "bg-amber-50 border-amber-200";
  const stepNum = isDark ? "bg-blue-600 text-white" : "bg-blue-500 text-white";

  return (
    <div className={`min-h-[420px] rounded-lg p-4 font-sans text-sm ${text}`}>
      <h3 className="mb-3 text-base font-semibold">
        가상 주소 → 물리 주소 변환 예시 (4KB 페이지)
      </h3>
      <p className={`mb-4 text-xs ${muted}`}>
        가상 주소를 입력하면 VPN·offset 분리 → 페이지 테이블 조회 → 물리 주소
        계산을 단계별로 수행해요.
      </p>

      <div className={`mb-4 rounded-lg border p-3 ${card}`}>
        <label className="mb-1 block text-xs font-medium">
          가상 주소 (hex)를 입력해주세요.
        </label>
        <input
          type="text"
          value={virtualInput}
          onChange={(e) => setVirtualInput(e.target.value)}
          placeholder="0x12345678"
          className={`w-full rounded border px-2 py-1.5 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBg}`}
        />
      </div>

      {/* Step 1: VPN + Offset */}
      <div className={`mb-4 rounded-lg border p-3 ${card}`}>
        <div className="mb-2 flex items-center gap-2">
          <span
            className={`flex h-6 w-6 items-center justify-center rounded text-xs font-bold ${stepNum}`}
          >
            1
          </span>
          <span className="font-medium">
            가상 주소를 VPN과 offset으로 나눠요.
          </span>
        </div>
        <p className={`mb-3 text-xs ${muted}`}>
          페이지 크기는 4KB (= 2¹² Byte)이므로, 하위 12비트(16진수 3자리)가
          offset, 나머지 상위 비트가 VPN이에요.
        </p>
        {virtual !== null ? (
          <div className="flex flex-col items-center gap-2">
            <span className={`text-xs ${muted}`}>가상 주소</span>
            <div className="flex font-mono text-2xl tracking-wide sm:text-3xl">
              <span className="text-gray-500 dark:text-gray-400">0x</span>
              <span
                className="rounded bg-blue-500/10 px-1.5 py-0.5 text-blue-600 dark:bg-blue-400/20 dark:text-blue-400"
                title="VPN (상위 비트)"
              >
                {(virtual >>> OFFSET_BITS)
                  .toString(16)
                  .toUpperCase()
                  .padStart(5, "0")}
              </span>
              <span
                className="rounded bg-green-500/10 px-1.5 py-0.5 text-green-600 dark:bg-green-400/20 dark:text-green-400"
                title="offset (하위 12비트)"
              >
                {(virtual & OFFSET_MASK)
                  .toString(16)
                  .toUpperCase()
                  .padStart(3, "0")}
              </span>
            </div>
            <div className="flex gap-4 text-xs">
              <span className="text-blue-600 dark:text-blue-400">▸ VPN</span>
              <span className="text-green-600 dark:text-green-400">
                ▸ offset (12비트)
              </span>
            </div>
          </div>
        ) : (
          <p className={muted}>
            올바른 16진수 주소를 입력해 주세요 (예: 0x12345678)
          </p>
        )}
      </div>

      {/* Step 2: Page table */}
      <div className={`mb-4 rounded-lg border p-3 ${card}`}>
        <div className="mb-2 flex items-center gap-2">
          <span
            className={`flex h-6 w-6 items-center justify-center rounded text-xs font-bold ${stepNum}`}
          >
            2
          </span>
          <span className="font-medium">
            페이지 테이블에서 VPN → 물리 프레임 번호 조회
          </span>
        </div>
        <p className={`mb-2 text-xs ${muted}`}>
          아래는 예시용으로 임의의 VPN 3개만 넣은 표예요. 실제 페이지 테이블은
          OS가 프로세스·상황에 따라 다르게 구성해요.
        </p>
        <div className="overflow-x-auto">
          <table className={`w-full border-collapse text-xs ${tableBorder}`}>
            <thead>
              <tr className={tableBorder}>
                <th className={`border px-2 py-1.5 text-left ${tableBorder}`}>
                  VPN
                </th>
                <th className={`border px-2 py-1.5 text-left ${tableBorder}`}>
                  물리 프레임
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(EXAMPLE_PAGE_TABLE).map(([v, f]) => (
                <tr
                  key={v}
                  className={
                    vpn !== null && Number(v) === vpn
                      ? `border ${highlight}`
                      : tableBorder
                  }
                >
                  <td className={`border px-2 py-1.5 font-mono ${tableBorder}`}>
                    {formatHex(Number(v), 5)}
                  </td>
                  <td className={`border px-2 py-1.5 font-mono ${tableBorder}`}>
                    {formatHex(Number(f), 5)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {vpn !== null &&
          (pageFault ? (
            <p className="mt-2 text-red-500 dark:text-red-400">
              VPN {formatHex(vpn, 5)}에 대한 매핑이 없어요 → 페이지 폴트
            </p>
          ) : (
            <p className={`mt-2 ${muted}`}>
              VPN {formatHex(vpn, 5)} → 물리 프레임{" "}
              <strong className={text}>{formatHex(frame!, 5)}</strong>
            </p>
          ))}
      </div>

      {/* Step 3: Physical address */}
      <div className={`rounded-lg border p-3 ${card}`}>
        <div className="mb-2 flex items-center gap-2">
          <span
            className={`flex h-6 w-6 items-center justify-center rounded text-xs font-bold ${stepNum}`}
          >
            3
          </span>
          <span className="font-medium">물리 주소 계산</span>
        </div>
        <p className={`mb-3 text-xs ${muted}`}>
          물리 주소 = (물리 프레임 번호 × 페이지 크기) + offset
        </p>
        {physical !== null ? (
          <div className="flex flex-col items-center gap-2">
            <span className={`text-xs ${muted}`}>물리 주소</span>
            <div className="flex font-mono text-2xl tracking-wide sm:text-3xl">
              <span className="text-gray-500 dark:text-gray-400">0x</span>
              <span
                className="rounded bg-amber-500/10 px-1.5 py-0.5 text-amber-600 dark:bg-amber-400/20 dark:text-amber-400"
                title="물리 프레임 번호 (상위 비트)"
              >
                {(physical >>> OFFSET_BITS)
                  .toString(16)
                  .toUpperCase()
                  .padStart(5, "0")}
              </span>
              <span
                className="rounded bg-green-500/10 px-1.5 py-0.5 text-green-600 dark:bg-green-400/20 dark:text-green-400"
                title="offset (하위 12비트)"
              >
                {(physical & OFFSET_MASK)
                  .toString(16)
                  .toUpperCase()
                  .padStart(3, "0")}
              </span>
            </div>
            <div className="flex gap-4 text-xs">
              <span className="text-amber-600 dark:text-amber-400">
                ▸ 물리 프레임
              </span>
              <span className="text-green-600 dark:text-green-400">
                ▸ offset (12비트)
              </span>
            </div>
          </div>
        ) : (
          <p className={muted}>
            {pageFault
              ? "페이지 폴트로 변환할 수 없어요."
              : "가상 주소를 입력해 주세요."}
          </p>
        )}
      </div>
    </div>
  );
}
