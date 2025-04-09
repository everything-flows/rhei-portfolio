import { Link } from "@remix-run/react";
import ArrowIcon from "~/assets/ArrowIcon";

export default function Header() {
  return (
    <section className="relative mx-auto flex w-full max-w-6xl flex-col py-[8dvh]">
      {/* <div className="blob-outer-container">
        <div className="blob-inner-container">
          <div className="blob" />
        </div>
      </div> */}

      <div className="flex flex-wrap-reverse items-center justify-between gap-4 overflow-hidden">
        <h1>
          <ruby className="text-display">
            강다혜
            <rp>(</rp>
            <rt className="text-display-caption handle-label" />
            <rp>)</rp>
          </ruby>
          <span className="text-display-empty">,</span>
        </h1>

        <Link
          to="#about"
          className="bg-brand text-reverse flex items-start gap-4 rounded-full px-6 py-4 text-[1.5rem] text-[clamp(2rem,6vw,4rem)] font-bold leading-none"
        >
          자세히
          <ArrowIcon size="2rem" />
        </Link>
      </div>

      <h2 className="text-display-sub">FRONT-END 개발자</h2>

      <ul className="mt-6 list-disc text-pretty pl-5 text-[clamp(1.2rem,3vw,1.5rem)] leading-[1.2]">
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

      <Link to="/contact" className="mt-6 w-fit text-[clamp(1rem,3vw,1.5rem)]">
        🤙 연락하고 지내요!
      </Link>
    </section>
  );
}
