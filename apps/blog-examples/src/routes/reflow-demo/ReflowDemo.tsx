import { useState, useCallback, useRef, useEffect } from "react";

const STEPS = [
  { id: "dom", label: "DOM 생성", short: "DOM" },
  { id: "cssom", label: "CSSOM 생성", short: "CSSOM" },
  { id: "render-tree", label: "Render Tree", short: "Tree" },
  { id: "layout", label: "Layout (Reflow)", short: "Layout" },
  { id: "paint", label: "Paint", short: "Paint" },
  { id: "composite", label: "Composite", short: "Composite" },
] as const;

type ChainStart = 3 | 4 | 5 | null; // index from which the chain runs (3=Layout, 4=Paint, 5=Composite)

type TriggerType = "layout" | "paint" | "composite";

export default function ReflowDemo() {
  const [activeChainFrom, setActiveChainFrom] = useState<ChainStart>(null);
  const [triggerType, setTriggerType] = useState<TriggerType | null>(null);

  // Preview box inline styles - we change these to trigger the corresponding rendering
  const [boxStyle, setBoxStyle] = useState<React.CSSProperties>({
    width: 80,
    height: 80,
    backgroundColor: "oklch(0.65 0.2 250)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    borderRadius: 8,
  });

  const chainTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runChain = useCallback((from: ChainStart, type: TriggerType) => {
    if (chainTimeoutRef.current) {
      clearTimeout(chainTimeoutRef.current);
      chainTimeoutRef.current = null;
    }
    setTriggerType(type);
    setActiveChainFrom(from);
    chainTimeoutRef.current = setTimeout(() => {
      setActiveChainFrom(null);
      setTriggerType(null);
      chainTimeoutRef.current = null;
    }, 1200);
  }, []);

  useEffect(
    () => () => {
      if (chainTimeoutRef.current) clearTimeout(chainTimeoutRef.current);
    },
    []
  );

  const handleLayout = useCallback(() => {
    setBoxStyle((prev) => ({
      ...prev,
      width: prev.width === 80 ? 120 : 80,
      height: prev.height === 80 ? 120 : 80,
    }));
    runChain(3, "layout");
  }, [runChain]);

  const handlePaint = useCallback(() => {
    setBoxStyle((prev) => ({
      ...prev,
      backgroundColor:
        prev.backgroundColor === "oklch(0.65 0.2 250)"
          ? "oklch(0.6 0.25 30)"
          : "oklch(0.65 0.2 250)",
    }));
    runChain(4, "paint");
  }, [runChain]);

  const handleComposite = useCallback(() => {
    setBoxStyle((prev) => ({
      ...prev,
      transform: prev.transform ? "none" : "translateX(20px) scale(1.1)",
    }));
    runChain(5, "composite");
  }, [runChain]);

  return (
    <div className="min-h-screen p-4 bg-normal text-normal">
      <div className="mx-auto max-w-3xl space-y-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          아래 버튼으로 속성을 바꿔 보세요. 어떤 단계부터 다시 실행되는지 확인할
          수 있어요.
        </p>

        {/* Pipeline: 6 steps */}
        <div className="rounded-lg border border-sub bg-gray-50 p-4 dark:bg-gray-950">
          <p className="mb-3 text-xs font-medium text-gray-600 dark:text-gray-400">
            렌더링 파이프라인
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {STEPS.map((step, index) => {
              const isActive =
                activeChainFrom !== null && index >= activeChainFrom;
              return (
                <div key={step.id} className="flex items-center gap-2">
                  <div
                    className={`
                      pipeline-step rounded px-2 py-1.5 text-xs font-medium
                      ${
                        isActive
                          ? "pipeline-step--active bg-blue-100 text-blue-600 dark:bg-orange-900/40 dark:text-orange-400"
                          : "bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                      }
                    `}
                    title={step.label}
                  >
                    {step.short}
                  </div>
                  {index < STEPS.length - 1 && (
                    <span className="text-xs text-gray-400">→</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Triggers */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleLayout}
            className="rounded-md border border-sub bg-gray-50 px-3 py-2 text-sm font-medium text-normal hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-950 dark:hover:bg-gray-900 dark:focus:ring-orange-500"
            title="width/height 변경 → Layout부터 다시 실행"
          >
            Layout 변경 (width/height)
          </button>
          <button
            type="button"
            onClick={handlePaint}
            className="rounded-md border border-sub bg-gray-50 px-3 py-2 text-sm font-medium text-normal hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-950 dark:hover:bg-gray-900 dark:focus:ring-orange-500"
            title="backgroundColor 변경 → Paint부터 다시 실행"
          >
            Paint만 변경 (color)
          </button>
          <button
            type="button"
            onClick={handleComposite}
            className="rounded-md border border-sub bg-gray-50 px-3 py-2 text-sm font-medium text-normal hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-950 dark:hover:bg-gray-900 dark:focus:ring-orange-500"
            title="transform 변경 → Composite만 실행"
          >
            Composite만 (transform)
          </button>
        </div>

        {/* Preview box */}
        <div className="rounded-lg border border-sub bg-gray-50 p-4 dark:bg-gray-950">
          <p className="mb-2 text-xs font-medium text-gray-600 dark:text-gray-400">
            미리보기 (변경된 요소)
          </p>
          <div className="flex items-center gap-4">
            <div style={boxStyle}>박스</div>
            {triggerType && (
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {triggerType === "layout" && "Layout → Paint → Composite 실행"}
                {triggerType === "paint" && "Paint → Composite 실행"}
                {triggerType === "composite" && "Composite만 실행"}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
