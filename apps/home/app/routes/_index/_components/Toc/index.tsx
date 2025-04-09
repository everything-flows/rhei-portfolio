import { Link } from "@remix-run/react";

// [todo] 자동으로 TOC를 만들 수 없을까?

export default function Toc() {
  return (
    <section className="mx-auto max-w-6xl py-4" id="toc">
      <h2 className="text-title">목차</h2>

      <ol>
        <li>
          <Link to="#about">소개</Link>
        </li>
        <li>
          <Link to="#tools">기술 및 도구</Link>
        </li>
      </ol>
    </section>
  );
}
