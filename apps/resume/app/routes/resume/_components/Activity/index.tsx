import { StickyHeading } from "@rhei/react";

const ACTIVITY_UNIV = [
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
  },
];

const ACTIVITY_EXTRA = [
  {
    title: "세오스(CEOS)",
    description: "신촌 연합 IT 창업 동아리",
    period: "2024.09 - 2025.01",
    list: [{ content: "20기 데모데이 최우수상 (Team 포토그라운드)" }],
  },
];

export default function Activity() {
  return (
    <section>
      <StickyHeading>
        <h2 className="text-h2 bg-normal">활동</h2>
      </StickyHeading>

      <section className="ml-4">
        <StickyHeading>
          <h3 className="text-h3 bg-normal">교내활동</h3>
        </StickyHeading>

        <ol className="flex list-disc flex-col gap-2 ps-5">
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
                  <ul className="list-disc ps-5">
                    {activity.list.map((desc) => (
                      <li key={desc.content}>{desc.content}</li>
                    ))}
                  </ul>
                )}
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section className="ml-4">
        <StickyHeading>
          <h3 className="text-h3 bg-normal">외부활동</h3>
        </StickyHeading>

        <ol className="flex list-disc flex-col gap-2 ps-5">
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
                  <ul className="list-disc ps-5">
                    {activity.list.map((desc) => (
                      <li key={desc.content}>{desc.content}</li>
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
