export default function Info() {
  return (
    <section className="flex flex-wrap items-start justify-between gap-x-8 gap-y-3">
      <div className="flex items-center gap-5">
        <img
          className="size-[clamp(5rem,8vw,6.5rem)] rounded-full"
          src={PROFILE_IMAGE}
          alt="Rhei's profile"
        />
        <div>
          <h1 className="text-h2">강다혜</h1>
          <p className="text-p text-gray-400 dark:text-gray-400">
            FRONT-END 개발자
          </p>
        </div>
      </div>

      <table className="h-fit" role="table" aria-label="연락처 정보">
        <thead>
          <tr>
            <th scope="col" className="sr-only">
              항목
            </th>
            <th scope="col" className="sr-only">
              주소
            </th>
          </tr>
        </thead>
        <tbody>
          {CONTACT_INFO.map((contact) => (
            <tr key={contact.label}>
              <th scope="row" className="text-left font-semibold">
                {contact.label}
              </th>
              <td className="pl-2">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={contact.linkHref}
                  className="text-blue-500 underline dark:text-orange-500"
                  aria-label={`${contact.label} - 새 창에서 열림`}
                >
                  {contact.linkLabel}
                  <span className="sr-only"> (새 창에서 열림)</span>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

const PROFILE_IMAGE =
  "https://tnzycdohhtvupgagmwfx.supabase.co/storage/v1/object/public/rhei-resume//profile.png";
const CONTACT_INFO = [
  {
    label: "GitHub",
    linkHref: "https://github.com/everything-flows",
    linkLabel: "everything-flows",
  },
  {
    label: "E-mail",
    linkHref: "mailto:psst5491@naver.com",
    linkLabel: "psst5491@naver.com",
  },
];
