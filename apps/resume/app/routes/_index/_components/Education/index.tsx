import SectionTitle from "../SectionTitle";

export default function Education() {
  return (
    <section>
      <SectionTitle content="Education" />

      <ol className="flex flex-col gap-2">
        {EDUCATION.map((education) => (
          <li key={education.title}>
            <article>
              <div className="flex flex-col justify-between gap-x-4 sm:flex-row">
                <p>
                  <span className="mr-2 font-extrabold">{education.title}</span>
                  {education.major}
                </p>

                <p className="text-sub">
                  <span className="mr-2">{education.period}</span>
                  {education.location}
                </p>
              </div>

              {education.description && (
                <ul className="ps-6">
                  {education.description?.map((desc) => (
                    <li key={desc.content}>{desc.content}</li>
                  ))}
                </ul>
              )}
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}

const EDUCATION = [
  {
    title: "서강대학교",
    major: "철학과 / 컴퓨터공학과",
    period: "2019.03 - 2023.08",
    location: "서울시 마포구",
    description: [
      { content: "우등(Cum Laude) 졸업" },
      { content: "CGPA 3.94 / 4.5" },
      { content: "전공 GPA 3.73 / 4.5" },
    ],
  },
  {
    title: "김해외국어고등학교",
    major: "영어일본어과",
    period: "2016.03 - 2019.02",
    location: "경상남도",
  },
];
