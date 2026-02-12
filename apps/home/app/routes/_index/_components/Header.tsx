import { motion } from "motion/react";

import ArrowIcon from "~/assets/ArrowIcon";

export default function Header() {
  return (
    <section className="relative mx-auto flex w-full max-w-6xl flex-col py-[8dvh]">
      {/* <div className="blob-outer-container">
        <div className="blob-inner-container">
          <div className="blob" />
        </div>
      </div> */}

      <div className="flex flex-wrap-reverse items-center justify-between gap-4 overflow-visible">
        <h1>
          <ruby className="text-display">
            강다혜
            <rp>(</rp>
            <rt className="text-display-caption handle-label" />
            <rp>)</rp>
          </ruby>
          <span className="text-display-empty">,</span>
        </h1>

        {/* NOTE: 앱간 라우팅을 위해 Link 대신 a 태그 사용 */}
        <a href="/resume">
          <motion.div
            className="bg-brand text-reverse flex items-start gap-2 rounded-full px-4 py-3 text-[clamp(2.25rem,6vw,3.5rem)] font-bold leading-none md:gap-4 md:px-6 md:py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            이력
            <ArrowIcon size="2rem" />
          </motion.div>
        </a>
      </div>

      <h2 className="text-display-sub">FRONT-END 개발자</h2>

      <ul className="mt-6 flex list-disc flex-col gap-2 text-pretty ps-6 text-[clamp(1.2rem,3vw,1.5rem)] leading-[1.2]">
        <li>
          인턴, 창업 동아리 활동을 통해{" "}
          <strong className="font-extrabold">빠르고 정확하게 MVP를 개발</strong>
          한 경험이 있습니다
        </li>
        <li>
          CS 지식을 활용하여{" "}
          <strong className="font-extrabold">문제를 해결</strong>하는 것을
          좋아합니다.
        </li>
      </ul>
    </section>
  );
}
