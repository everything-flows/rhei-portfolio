import { useState, useMemo } from "react";

type ByteLength = 1 | 2 | 3 | 4;

const UTF8_PATTERNS: Record<ByteLength, string[]> = {
  1: ["0xxxxxxx"],
  2: ["110xxxxx", "10xxxxxx"],
  3: ["1110xxxx", "10xxxxxx", "10xxxxxx"],
  4: ["11110xxx", "10xxxxxx", "10xxxxxx", "10xxxxxx"],
};

type Cell = { isFixed: boolean; value: 0 | 1; chunkIndex?: number };

function getByteLength(codePoint: number): ByteLength | null {
  if (codePoint <= 0x7f) return 1;
  if (codePoint <= 0x7ff) return 2;
  if (codePoint <= 0xffff) return 3;
  if (codePoint <= 0x10ffff) return 4;
  return null;
}

function encodeUtf8Grid(codePoint: number): {
  chunks: string[];
  grid: Cell[][];
  bytes: number[];
} | null {
  const len = getByteLength(codePoint);
  if (!len) return null;

  const bitCount = len === 1 ? 7 : len === 2 ? 11 : len === 3 ? 16 : 21;
  const bits: number[] = [];
  for (let i = bitCount - 1; i >= 0; i--) {
    bits.push((codePoint >> i) & 1);
  }
  // bits[0]=MSB .. bits[bitCount-1]=LSB

  const patterns = UTF8_PATTERNS[len];
  const xCounts = patterns.map((p) => (p.match(/x/g) || []).length);
  let bitStart = bits.length;
  const chunks: string[] = [];

  for (let byteIdx = patterns.length - 1; byteIdx >= 0; byteIdx--) {
    const take = xCounts[byteIdx];
    bitStart -= take;
    const slice = bits.slice(bitStart, bitStart + take);
    chunks.unshift(slice.join(""));
  }
  // chunks[0]=첫 Byte에 들어가는 비트, chunks[1]=두 번째, ...

  const grid: Cell[][] = [];
  const bytes: number[] = [];

  for (let byteIdx = 0; byteIdx < len; byteIdx++) {
    const pattern = patterns[byteIdx];
    const chunk = chunks[byteIdx];
    const row: Cell[] = [];
    let chIdx = 0;
    for (const c of pattern) {
      if (c === "x") {
        const v = parseInt(chunk[chIdx] ?? "0", 10) as 0 | 1;
        row.push({ isFixed: false, value: v, chunkIndex: byteIdx });
        chIdx++;
      } else {
        row.push({ isFixed: true, value: c === "1" ? 1 : 0 });
      }
    }
    grid.push(row);
    let dataIdx = 0;
    const fullBin = pattern
      .split("")
      .map((p) => (p === "x" ? (chunk[dataIdx++] ?? "0") : p))
      .join("");
    bytes.push(parseInt(fullBin, 2));
  }

  return { chunks, grid, bytes };
}

const CHUNK_BG = [
  "bg-blue-200 dark:bg-blue-800",
  "bg-emerald-200 dark:bg-emerald-800",
  "bg-amber-200 dark:bg-amber-800",
  "bg-violet-200 dark:bg-violet-800",
];
const FIXED_BG = "bg-gray-400 dark:bg-gray-600";

const PRESETS: { char: string; label: string }[] = [
  { char: "A", label: "A (1Byte)" },
  { char: "é", label: "é (2Byte)" },
  { char: "가", label: "가 (3Byte)" },
  { char: "🌊", label: "🌊 (4Byte)" },
];

export default function Utf8EncodingDemo() {
  const [input, setInput] = useState("🌊");

  const result = useMemo(() => {
    const cp = input.length > 0 ? (input.codePointAt(0) ?? 0) : 0;
    return encodeUtf8Grid(cp);
  }, [input]);

  const cp = input.length > 0 ? (input.codePointAt(0) ?? 0) : 0;
  const hex = `U+${cp.toString(16).toUpperCase().padStart(4, "0")}`;

  return (
    <div className="min-h-screen p-4 bg-normal text-normal">
      <div className="space-y-4 max-w-2xl mx-auto">
        <div className="flex flex-wrap gap-1">
          {PRESETS.map(({ char: c, label }) => (
            <button
              key={c}
              type="button"
              onClick={() => setInput(c)}
              className="rounded border border-gray-200 dark:border-gray-700 px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex gap-2 items-center flex-wrap">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, 2))}
            className="rounded-md border border-gray-200 dark:border-gray-700 bg-inherit px-3 py-2 font-mono text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-400 flex-1 min-w-0"
            placeholder="문자"
          />
        </div>

        {!result && input && (
          <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-3 text-sm">
            U+10FFFF 이하는 표에서 확인할 수 있어요.
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 px-3 pt-2 pb-1">
                코드 포인트: {hex}
              </p>
              <div className="px-3 pb-3 flex flex-wrap items-center gap-1.5">
                {result.chunks.map((chunk, i) => (
                  <span
                    key={i}
                    className={`font-mono text-sm px-2 py-0.5 rounded ${CHUNK_BG[i]}`}
                  >
                    {chunk}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 px-3 pt-2 pb-1">
                UTF-8 비트 표 ({result.grid.length} Byte × 8 bit)
              </p>
              <div className="p-3 overflow-x-auto">
                <table className="border-collapse font-mono text-sm">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 px-2 py-1 text-left text-xs font-normal w-10">
                        Byte
                      </th>
                      {[7, 6, 5, 4, 3, 2, 1, 0].map((b) => (
                        <th
                          key={b}
                          className="border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 px-0.5 py-1 text-center w-8 text-xs"
                        >
                          {b}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.grid.map((row, rowIdx) => (
                      <tr key={rowIdx}>
                        <td className="border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs">
                          {rowIdx + 1}
                        </td>
                        {row.map((cell, colIdx) => (
                          <td
                            key={colIdx}
                            className={`border border-gray-300 dark:border-gray-600 text-center w-8 py-1 font-medium ${
                              cell.isFixed
                                ? FIXED_BG
                                : cell.chunkIndex !== undefined
                                  ? CHUNK_BG[cell.chunkIndex]
                                  : ""
                            }`}
                          >
                            {cell.value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-3 pb-3 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                <span className="inline-flex items-center gap-1.5">
                  <span
                    className={`w-4 h-4 rounded ${FIXED_BG} border border-gray-400 dark:border-gray-500 inline-block`}
                  />
                  고정 비트
                </span>
                {result.chunks.map((_, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5">
                    <span
                      className={`w-4 h-4 rounded ${CHUNK_BG[i]} border border-gray-400/50 dark:border-gray-500/50 inline-block`}
                    />
                    청크 {i + 1}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-3">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                UTF-8 결과
              </p>
              <div className="font-mono text-sm">
                {result.bytes
                  .map((b) => b.toString(2).padStart(8, "0"))
                  .join(" ")}{" "}
                ={" "}
                {result.bytes
                  .map(
                    (b) => `0x${b.toString(16).toUpperCase().padStart(2, "0")}`,
                  )
                  .join(" ")}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
