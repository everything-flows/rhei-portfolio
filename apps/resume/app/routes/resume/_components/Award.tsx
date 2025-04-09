import { StickyHeading } from "@rhei/react";

const AWARD = [
  {
    date: "2022.04",
    content: "2022년 제 13회 서강대학교 스타트업 오디션(창업경진대회)",
    place: "우수상",
  },
  {
    date: "2021.02",
    content:
      "신촌지역 대학생 프로그래밍 대회 동아리 연합 겨울 대회 (SUAPC 2021 WINTER)",
    place: "6th place (동상)",
  },
  {
    date: "2020.11",
    content:
      "서강대학교 프로그래밍 경진 대회 (Sogang Programming Contest) Master division",
    place: "5th place (동상)",
  },
  {
    date: "2019.08",
    content: "성적우수상",
    place: "성적우수상",
  },
];

export default function Award() {
  return (
    <section>
      <StickyHeading>
        <h2 className="text-h2 bg-normal">수상</h2>
      </StickyHeading>

      <div className="overflow-auto">
        <table className="table-auto border-separate border-spacing-x-4 border-spacing-y-2 text-pretty break-keep">
          <thead>
            <tr>
              <td className="text-center">성적</td>
              <td>대회</td>
              <td className="text-center">일자</td>
            </tr>
          </thead>
          <tbody>
            {AWARD.map((award) => (
              <tr key={award.content}>
                <td>
                  <span className="font-extrabold">{award.place}</span>
                </td>
                <td className="w-full min-w-[20rem]">{award.content}</td>
                <td className="text-sub">{award.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
