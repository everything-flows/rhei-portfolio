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
    <div className="min-h-screen p-4 bg-normal text-normal">
      <div className="space-y-6">
        <div>
          <label htmlFor="string-input" className="mb-2 text-sm font-medium">
            변환할 문자열
          </label>
          <input
            id="string-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full rounded-md border border-gray-200 px-3 bg-inherit py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-800 dark:focus:ring-orange-400"
            placeholder="문자열을 입력하세요"
          />
        </div>

        <div className="flex flex-col gap-2">
          {analyses.map((analysis) => (
            <UnitCard key={analysis.name} analysis={analysis} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ChevronIcon({ isExpanded }: { isExpanded: boolean }) {
  return (
    <svg
      width="1rem"
      height="1rem"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-transform duration-200 ${
        isExpanded ? "rotate-180" : ""
      }`}
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UnitCard({ analysis }: { analysis: UnitAnalysis }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-gray-200 p-3 shadow-sm dark:border-gray-800">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between text-left"
      >
        <p className="font-semibold">
          {analysis.count} {analysis.name}
        </p>
        <ChevronIcon isExpanded={isExpanded} />
      </button>
      {isExpanded && (
        <div className="mt-4">
          <div className="flex flex-wrap gap-1">
            {analysis.items.map((item, index) => (
              <div
                key={index}
                className="rounded border border-gray-200 bg-gray-50 px-2 py-1 dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="font-mono text-sm">{item.value}</div>
                {item.hex && <div className="mt-0.5 text-xs">{item.hex}</div>}
                {item.label && (
                  <div className="mt-0.5 text-xs">{item.label}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
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
    // Intl.Segmenter를 지원하지 않는 환경
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
