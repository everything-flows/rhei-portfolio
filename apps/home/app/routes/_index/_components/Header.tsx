export default function Header() {
  return (
    <header className="relative mx-auto flex w-full max-w-6xl flex-col sm:pt-8 md:pt-12 lg:pt-16">
      <h1>
        <ruby className="text-display">
          강다혜
          <rp>(</rp>
          <rt className="text-display-caption handle-label" />
          <rp>)</rp>
        </ruby>
        <span className="text-display-empty">,</span>
      </h1>

      <h2 className="text-display-sub">FRONT-END 개발자</h2>

      <p className="mt-4 flex flex-col gap-2 text-pretty text-[clamp(1.2rem,3vw,1.5rem)] leading-[1.2]">
        반복되는 UI와 인터랙션을 규칙화해 일관된 사용자 경험을 만들고,
        <br />
        개발자가 실수 없이 사용할 수 있도록 구조와 문서로 풀어내는 데 관심이
        많습니다.
      </p>
    </header>
  );
}
