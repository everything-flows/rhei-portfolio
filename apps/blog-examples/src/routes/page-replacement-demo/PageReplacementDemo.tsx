import React, { useMemo, useState } from "react";

type Step = {
  step: number;
  page: number;
  isFault: boolean;
  frames: number[];
  evicted: number | null;
};

function parseSequence(input: string): number[] {
  return input
    .split(/[\s,]+/)
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => !Number.isNaN(n) && n > 0);
}

function runFIFO(sequence: number[], frameCount: number): Step[] {
  const steps: Step[] = [];
  const frames: number[] = [];

  for (let i = 0; i < sequence.length; i++) {
    const page = sequence[i];
    const idx = frames.indexOf(page);
    let evicted: number | null = null;

    if (idx >= 0) {
      steps.push({
        step: i + 1,
        page,
        isFault: false,
        frames: [...frames],
        evicted: null,
      });
      continue;
    }

    if (frames.length >= frameCount) {
      evicted = frames.shift() ?? null;
    }
    frames.push(page);
    steps.push({
      step: i + 1,
      page,
      isFault: true,
      frames: [...frames],
      evicted,
    });
  }

  return steps;
}

function runLRU(sequence: number[], frameCount: number): Step[] {
  const steps: Step[] = [];
  const frames: number[] = [];
  const lastUsed: Record<number, number> = {};

  for (let i = 0; i < sequence.length; i++) {
    const page = sequence[i];
    const idx = frames.indexOf(page);
    let evicted: number | null = null;

    if (idx >= 0) {
      lastUsed[page] = i;
      steps.push({
        step: i + 1,
        page,
        isFault: false,
        frames: [...frames],
        evicted: null,
      });
      continue;
    }

    if (frames.length >= frameCount) {
      const toEvict = frames.reduce((a, b) =>
        lastUsed[a] <= lastUsed[b] ? a : b
      );
      evicted = toEvict;
      const idxEvict = frames.indexOf(toEvict);
      frames.splice(idxEvict, 1);
      delete lastUsed[toEvict];
    }
    frames.push(page);
    lastUsed[page] = i;
    steps.push({
      step: i + 1,
      page,
      isFault: true,
      frames: [...frames],
      evicted,
    });
  }

  return steps;
}

function AlgorithmView({
  title,
  steps,
  faultCount,
  isDark,
}: {
  title: string;
  steps: Step[];
  faultCount: number;
  isDark: boolean;
}) {
  const card = isDark
    ? "bg-gray-800 border-gray-700"
    : "bg-white border-gray-200";
  const tableBorder = isDark ? "border-gray-600" : "border-gray-200";
  const text = isDark ? "text-gray-100" : "text-gray-900";
  const muted = isDark ? "text-gray-400" : "text-gray-500";

  return (
    <div className={`rounded-lg border p-3 ${card}`}>
      <div className="mb-2 flex items-center justify-between">
        <span className="font-medium">{title}</span>
        <span className={`text-sm ${muted}`}>
          Page Fault: <strong className={text}>{faultCount}</strong>회
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className={`w-full border-collapse text-xs ${tableBorder}`}>
          <thead>
            <tr>
              <th
                className={`border px-2 py-1.5 text-left font-medium ${tableBorder}`}
              >
                단계
              </th>
              <th
                className={`border px-2 py-1.5 text-left font-medium ${tableBorder}`}
              >
                접근
              </th>
              <th
                className={`border px-2 py-1.5 text-center font-medium ${tableBorder}`}
              >
                Hit / Fault
              </th>
              <th
                className={`border px-2 py-1.5 text-left font-medium ${tableBorder}`}
              >
                교체
              </th>
              <th
                className={`border px-2 py-1.5 text-left font-medium ${tableBorder}`}
              >
                프레임 상태
              </th>
            </tr>
          </thead>
          <tbody>
            {steps.map((s) => (
              <tr key={s.step} className={tableBorder}>
                <td className={`border px-2 py-1.5 ${tableBorder}`}>
                  {s.step}
                </td>
                <td className={`border px-2 py-1.5 font-mono ${tableBorder}`}>
                  {s.page}
                </td>
                <td
                  className={`border px-2 py-1.5 text-center ${tableBorder} ${
                    s.isFault
                      ? "text-red-600 dark:text-red-400"
                      : "text-green-600 dark:text-green-400"
                  }`}
                >
                  {s.isFault ? "Fault" : "Hit"}
                </td>
                <td className={`border px-2 py-1.5 font-mono ${tableBorder}`}>
                  {s.evicted !== null ? s.evicted : "—"}
                </td>
                <td
                  className={`border px-2 py-1.5 font-mono ${tableBorder}`}
                  title={s.frames.join(", ")}
                >
                  [{s.frames.join(", ")}]
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const DEFAULT_FRAMES = 3;
const DEFAULT_SEQUENCE = "1, 2, 1, 3, 2, 4, 1, 2, 3, 4, 2, 1";

export default function PageReplacementDemo() {
  const [frameCountInput, setFrameCountInput] = useState(String(DEFAULT_FRAMES));
  const [sequenceInput, setSequenceInput] = useState(DEFAULT_SEQUENCE);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  React.useEffect(() => {
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

  const frameCount = Math.max(
    1,
    Math.min(16, parseInt(frameCountInput, 10) || DEFAULT_FRAMES)
  );
  const sequence = useMemo(() => parseSequence(sequenceInput), [sequenceInput]);

  const fifoSteps = useMemo(
    () => (sequence.length > 0 ? runFIFO(sequence, frameCount) : []),
    [sequence, frameCount]
  );
  const lruSteps = useMemo(
    () => (sequence.length > 0 ? runLRU(sequence, frameCount) : []),
    [sequence, frameCount]
  );

  const fifoFaults = fifoSteps.filter((s) => s.isFault).length;
  const lruFaults = lruSteps.filter((s) => s.isFault).length;

  const isDark = theme === "dark";
  const card = isDark
    ? "bg-gray-800 border-gray-700"
    : "bg-white border-gray-200";
  const text = isDark ? "text-gray-100" : "text-gray-900";
  const muted = isDark ? "text-gray-400" : "text-gray-500";
  const inputBg = isDark
    ? "bg-gray-700 border-gray-600 text-gray-100"
    : "bg-white border-gray-300";

  return (
    <div className={`min-h-[320px] rounded-lg p-4 font-sans text-sm ${text}`}>
      <h3 className="mb-2 text-base font-semibold">
        페이지 교체 알고리즘 (FIFO vs LRU)
      </h3>
      <p className={`mb-4 text-xs ${muted}`}>
        접근 순서와 프레임 개수를 입력하면, 동일한 데이터로 FIFO와 LRU를 각각
        시뮬레이션해요.
      </p>

      {/* 공유 입력 */}
      <div className={`mb-4 rounded-lg border p-3 ${card}`}>
        <div className="mb-3 grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium">프레임 개수</label>
            <input
              type="number"
              min={1}
              max={16}
              value={frameCountInput}
              onChange={(e) => setFrameCountInput(e.target.value)}
              className={`w-full rounded border px-2 py-1.5 ${inputBg}`}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium">
              접근 순서 (쉼표 또는 공백 구분)
            </label>
            <input
              type="text"
              value={sequenceInput}
              onChange={(e) => setSequenceInput(e.target.value)}
              placeholder="1, 2, 1, 3, 2, 4, 1, 2, 3, 4, 2, 1"
              className={`w-full rounded border px-2 py-1.5 ${inputBg}`}
            />
          </div>
        </div>
        {sequence.length > 0 ? (
          <p className={`text-xs ${muted}`}>
            해석된 접근 열: [{sequence.join(", ")}] (총 {sequence.length}회)
          </p>
        ) : (
          <p className="text-xs text-amber-600 dark:text-amber-400">
            ※ 1 이상의 숫자를 쉼표 또는 공백으로 구분해 입력해 주세요.
          </p>
        )}
      </div>

      {/* FIFO / LRU 뷰 */}
      <div className="grid gap-4 sm:grid-cols-2">
        <AlgorithmView
          title="FIFO (First-In First-Out)"
          steps={fifoSteps}
          faultCount={fifoFaults}
          isDark={isDark}
        />
        <AlgorithmView
          title="LRU (Least Recently Used)"
          steps={lruSteps}
          faultCount={lruFaults}
          isDark={isDark}
        />
      </div>

      {sequence.length > 0 && (
        <p className={`mt-3 text-xs ${muted}`}>
          같은 접근 열에서 FIFO Page Fault {fifoFaults}회, LRU Page Fault{" "}
          {lruFaults}회예요.
        </p>
      )}
    </div>
  );
}
