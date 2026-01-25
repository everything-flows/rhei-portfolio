import { useState, useMemo } from "react";

interface UnitAnalysis {
  name: string;
  count: number;
  items: Array<{
    value: string;
    label: string;
    hex?: string;
  }>;
}

export default function StringUnitsDemo() {
  const [input, setInput] = useState("안녕👨‍👩‍👧");

  const analyses = useMemo(() => {
    const bytes = analyzeBytes(input);
    const codePoints = analyzeCodePoints(input);
    const codeUnits = analyzeCodeUnits(input);
    const graphemeClusters = analyzeGraphemeClusters(input);

    return [bytes, codePoints, codeUnits, graphemeClusters];
  }, [input]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-4">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">
          문자열 단위 비교
        </h1>
        <p className="text-sm mb-6 text-gray-600 dark:text-gray-400">
          같은 문자열도 단위에 따라 다르게 해석돼요. 바이트, 코드 포인트, 코드
          유닛, 그래핌 클러스터로 분해해서 확인해보세요.
        </p>
        <div className="space-y-6">
          <div>
            <label
              htmlFor="string-input"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              문자열 입력
            </label>
            <input
              id="string-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-blue-400"
              placeholder="문자열을 입력하세요"
            />
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              기본값: "안녕👨‍👩‍👧"
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {analyses.map((analysis) => (
              <UnitCard key={analysis.name} analysis={analysis} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function UnitCard({ analysis }: { analysis: UnitAnalysis }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-2 text-base font-semibold text-gray-900 dark:text-gray-100">
        {analysis.name}
      </h3>
      <div className="mb-4 text-3xl font-bold text-blue-600 dark:text-blue-400">
        {analysis.count}개
      </div>
      <div className="space-y-2">
        <div className="mb-2 text-xs font-medium text-gray-600 dark:text-gray-400">
          분해 결과:
        </div>
        <div className="flex flex-wrap gap-2">
          {analysis.items.map((item, index) => (
            <div
              key={index}
              className="rounded border border-gray-200 bg-gray-50 px-2 py-1.5 dark:border-gray-600 dark:bg-gray-700"
            >
              <div className="font-mono text-sm text-gray-900 dark:text-gray-100">
                {item.value}
              </div>
              {item.hex && (
                <div className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                  {item.hex}
                </div>
              )}
              {item.label && (
                <div className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                  {item.label}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function analyzeBytes(str: string): UnitAnalysis {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  const items = Array.from(bytes).map((byte) => ({
    value: `0x${byte.toString(16).toUpperCase().padStart(2, "0")}`,
    label: `${byte} (${byte.toString(2).padStart(8, "0")})`,
    hex: undefined,
  }));

  return {
    name: "바이트 (Byte)",
    count: bytes.length,
    items,
  };
}

function analyzeCodePoints(str: string): UnitAnalysis {
  const codePoints: number[] = [];
  for (let i = 0; i < str.length; ) {
    const codePoint = str.codePointAt(i);
    if (codePoint !== undefined) {
      codePoints.push(codePoint);
      i += codePoint > 0xffff ? 2 : 1;
    } else {
      i++;
    }
  }

  const items = codePoints.map((cp) => {
    const char = String.fromCodePoint(cp);
    return {
      value: char,
      label: `U+${cp.toString(16).toUpperCase().padStart(4, "0")}`,
      hex: `U+${cp.toString(16).toUpperCase().padStart(4, "0")}`,
    };
  });

  return {
    name: "코드 포인트 (Code Point)",
    count: codePoints.length,
    items,
  };
}

function analyzeCodeUnits(str: string): UnitAnalysis {
  const codeUnits: number[] = [];
  for (let i = 0; i < str.length; i++) {
    codeUnits.push(str.charCodeAt(i));
  }

  const items = codeUnits.map((cu, index) => {
    const char = str[index];
    return {
      value: char,
      label: `0x${cu.toString(16).toUpperCase().padStart(4, "0")}`,
      hex: `0x${cu.toString(16).toUpperCase().padStart(4, "0")}`,
    };
  });

  return {
    name: "코드 유닛 (Code Unit)",
    count: codeUnits.length,
    items,
  };
}

function analyzeGraphemeClusters(str: string): UnitAnalysis {
  let segmenter: Intl.Segmenter | null = null;
  try {
    segmenter = new Intl.Segmenter("ko", { granularity: "grapheme" });
  } catch {
    // Intl.Segmenter를 지원하지 않는 환경에서는 fallback
  }

  const clusters: string[] = [];
  if (segmenter) {
    const segments = segmenter.segment(str);
    for (const segment of segments) {
      clusters.push(segment.segment);
    }
  } else {
    for (let i = 0; i < str.length; ) {
      const codePoint = str.codePointAt(i);
      if (codePoint !== undefined) {
        const char = String.fromCodePoint(codePoint);
        clusters.push(char);
        i += codePoint > 0xffff ? 2 : 1;
      } else {
        clusters.push(str[i]);
        i++;
      }
    }
  }

  const items = clusters.map((cluster) => {
    const codePoints: number[] = [];
    for (let i = 0; i < cluster.length; ) {
      const cp = cluster.codePointAt(i);
      if (cp !== undefined) {
        codePoints.push(cp);
        i += cp > 0xffff ? 2 : 1;
      } else {
        i++;
      }
    }
    const hex = codePoints
      .map((cp) => `U+${cp.toString(16).toUpperCase().padStart(4, "0")}`)
      .join(" + ");

    return {
      value: cluster,
      label: codePoints.length > 1 ? `${codePoints.length}개 코드 포인트` : "",
      hex: codePoints.length > 1 ? hex : undefined,
    };
  });

  return {
    name: "그래핌 클러스터 (Grapheme Cluster)",
    count: clusters.length,
    items,
  };
}
