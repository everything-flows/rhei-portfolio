import React from "react";

const CARD_BASE = "rounded-lg border border-gray-200 bg-white p-4 shadow-sm";

/**
 * 1) 디자이너가 의도한 카드 디자인
 * 2) 타이틀이 너무 길어서 카드가 이상하게 보이는 예시
 * 3) 카드 줄바꿈이 잘못되어 뒤 공간이 너무 남는 예시
 */
export default function CardLayoutDemo() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 text-gray-900">
      <div className="mx-auto max-w-4xl space-y-10">
        {/* 1. 의도한 카드 디자인 */}
        <section className="rounded-lg border border-emerald-500 bg-emerald-50/50 p-4">
          <h2 className="mb-3 text-sm font-semibold text-emerald-800">
            1. 의도한 카드 디자인
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { title: "카드 제목", desc: "짧은 설명 텍스트입니다." },
              { title: "서비스 소개", desc: "한두 줄로 끝나는 설명." },
              { title: "기능 안내", desc: "간결한 문장으로 정리." },
            ].map((card, i) => (
              <div key={i} className={CARD_BASE}>
                <h3 className="mb-1 truncate text-sm font-medium text-gray-800">
                  {card.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. 타이틀이 너무 길어서 깨진 예시 */}
        <section className="rounded-lg border border-blue-500 bg-blue-50/50 p-4">
          <h2 className="mb-3 text-sm font-semibold text-blue-800">
            2. 타이틀이 너무 길어서 카드가 이상하게 보이는 예시
          </h2>
          <div className="grid grid-cols-3 items-start gap-4">
            <div className={CARD_BASE}>
              <h3 className="mb-1 text-sm font-medium text-gray-800">
                카드 제목
              </h3>
              <p className="text-xs text-gray-500">짧은 설명입니다.</p>
            </div>
            <div className={CARD_BASE}>
              <h3 className="mb-1 text-sm font-medium text-gray-800">
                이 카드의 제목이 엄청나게 길어서 한 줄에 다 들어오지 않고
                다음 줄로 넘어가거나 영역을 뚫고 나가버리는 문제가 생깁니다
              </h3>
              <p className="text-xs text-gray-500">
                설명도 길어지면 카드 높이가 제각각이 됩니다. 실제 서비스에서는
                제목과 본문 길이가 카드마다 달라서 그리드가 울퉁불퉁해 보이기 쉽습니다.
              </p>
            </div>
            <div className={CARD_BASE}>
              <h3 className="mb-1 text-sm font-medium text-gray-800">
                서비스 소개
              </h3>
              <p className="text-xs text-gray-500">
                한두 줄로 끝나는 설명. 이 카드만 설명이 조금 더 길어서
                두 세 줄이 되면 옆 카드와 높이가 맞지 않습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 3. 줄바꿈 잘못되어 공간이 남는 예시 — flex + 고정 너비 */}
        <section className="rounded-lg border border-blue-500 bg-blue-50/50 p-4">
          <h2 className="mb-3 text-sm font-semibold text-blue-800">
            3. 카드 줄바꿈이 잘못되어 뒤 공간이 너무 남는 예시
          </h2>
          <div
            className="flex flex-wrap gap-4"
            style={{ gap: "1rem" }}
          >
            {[
              "카드 1",
              "카드 2",
              "카드 3",
              "카드 4",
            ].map((title, i) => (
              <div
                key={i}
                className={CARD_BASE}
                style={{ width: "200px", minWidth: "200px" }}
              >
                <h3 className="mb-1 text-sm font-medium text-gray-800">
                  {title}
                </h3>
                <p className="text-xs text-gray-500">고정 너비 200px라서 한 줄에 3개씩 안 채워지면 오른쪽에 빈 공간이 많이 남습니다.</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
