import React from "react";

/**
 * Flex 예제: 버튼 묶음처럼 한 방향으로 흐르는 배치
 */
export default function FlexLayoutDemo() {
  return (
    <div className="min-h-screen bg-white p-4 text-gray-900">
      <div className="mx-auto max-w-md space-y-6">
        <div className="flex flex-wrap gap-3 rounded-lg border border-emerald-500 bg-white p-4">
          <button
            type="button"
            className="rounded bg-emerald-600 px-4 py-2 text-sm text-white hover:bg-emerald-700"
          >
            저장
          </button>
          <button
            type="button"
            className="rounded border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-50"
          >
            취소
          </button>
          <button
            type="button"
            className="rounded border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-50"
          >
            미리보기
          </button>
        </div>
        <div className="flex flex-col items-start gap-4 rounded-lg border border-emerald-500 bg-white p-4">
          <span className="flex items-center gap-2 text-sm">
            <span className="inline-block h-4 w-4 rounded bg-gray-300" aria-hidden />
            홈
          </span>
          <span className="flex items-center gap-2 text-sm">
            <span className="inline-block h-4 w-4 rounded bg-gray-300" aria-hidden />
            목록
          </span>
          <span className="flex items-center gap-2 text-sm">
            <span className="inline-block h-4 w-4 rounded bg-gray-300" aria-hidden />
            설정
          </span>
        </div>
      </div>
    </div>
  );
}
