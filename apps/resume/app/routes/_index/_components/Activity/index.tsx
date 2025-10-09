import { ReactNode } from "react";
import { Link } from "@remix-run/react";
import { StickyHeading } from "@rhei/react";
import SectionTitle from "../SectionTitle";

export default function Activity() {
  return (
    <section>
      <SectionTitle content="Activity" />

      <section>
        <StickyHeading>
          <h3 className="text-h3 bg-normal">교내활동</h3>
        </StickyHeading>

        <ol className="flex flex-col gap-2 ps-6">
          {ACTIVITY_UNIV.map((activity) => (
            <li key={activity.title}>
              <article>
                <div className="flex flex-col justify-between gap-x-4 sm:flex-row">
                  <p className="text-pretty break-keep">
                    <span className="mr-2 font-extrabold">
                      {activity.title}
                    </span>
                    {activity.description}
                  </p>

                  <p className="text-sub whitespace-pre">{activity.period}</p>
                </div>

                {activity?.list && (
                  <ul className="ps-6">
                    {activity.list.map((desc, index) => (
                      <li key={index}>
                        <p>
                          {desc.content}{" "}
                          {desc.link && (
                            <Link
                              to={desc.link.href}
                              className="text-brand underline"
                            >
                              {desc.link.title}
                            </Link>
                          )}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <StickyHeading>
          <h3 className="text-h3 bg-normal">외부활동</h3>
        </StickyHeading>

        <ol className="flex flex-col gap-2 ps-6">
          {ACTIVITY_EXTRA.map((activity) => (
            <li key={activity.title}>
              <article>
                <div className="flex flex-col justify-between gap-x-4 sm:flex-row">
                  <p className="text-pretty break-keep">
                    <span className="mr-2 font-extrabold">
                      {activity.title}
                    </span>
                    {activity.description}
                  </p>

                  <p className="text-sub whitespace-pre">{activity.period}</p>
                </div>

                {activity?.list && (
                  <ul className="ps-6">
                    {activity.list.map((desc, index) => (
                      <li key={index}>
                        <p>
                          {desc.content}{" "}
                          {desc.link && (
                            <Link
                              to={desc.link.href}
                              className="text-brand underline"
                            >
                              {desc.link.title}
                            </Link>
                          )}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </li>
          ))}
        </ol>
      </section>
    </section>
  );
}

interface Activity {
  title: string;
  description: string;
  period: string;
  list: {
    content: string | ReactNode;
    link?: {
      title: string;
      href: string;
    };
  }[];
}

const ACTIVITY_UNIV: Activity[] = [
  {
    title: "SGCC",
    description: "서강대학교 중앙 컴퓨터 동아리",
    period: "2019.03 - 2023.08",
    list: [{ content: "부회장 (2020.03 - 2022.02)" }],
  },
  {
    title: "Sogang ICPC Team",
    description: "서강대학교 컴퓨터공학과 알고리즘 문제해결 학회",
    period: "2020.11 - 2023.08",
    list: [
      {
        content: (
          <>
            2023 겨울 신촌지역 대학교 프로그래밍 동아리 연합 알고리즘 캠프
            콘테스트 초급 부문{" "}
            <a
              href="https://www.acmicpc.net/problem/27495"
              className="text-brand underline"
            >
              B번 문항
            </a>{" "}
            출제
          </>
        ),
      },
    ],
  },
  {
    title: "학부 수업 멘토",
    description: "",
    period: "",
    list: [
      {
        content:
          "서강대학교 봄학기 컴퓨팅사고력 강좌 조교 (2021.03. - 2021.06.)",
      },
      {
        content:
          "서강대학교 예비대학생을 위한 파이썬 강좌 멘토(2021.01. - 2021.02.)",
      },
    ],
  },
];

const ACTIVITY_EXTRA: Activity[] = [
  {
    title: "세오스(CEOS)",
    description: "신촌 연합 IT 창업 동아리",
    period: "2024.09 - 2025.01",
    list: [{ content: "20기 데모데이 최우수상 (Team 포토그라운드)" }],
  },
];
