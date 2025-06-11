export default function Info() {
  return (
    <section className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
      <div className="flex items-center gap-6">
        <img
          className="size-20 rounded-full md:size-32"
          src="https://tnzycdohhtvupgagmwfx.supabase.co/storage/v1/object/public/rhei-resume//profile.png"
          alt="profile"
        />
        <div>
          <h1 className="text-h2">강다혜</h1>
          <p className="text-p text-gray-400 dark:text-gray-300">
            FRONT-END 개발자
          </p>
        </div>
      </div>

      <table className="h-fit">
        <tbody>
          <tr>
            <td>GitHub</td>
            <td>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/everything-flows"
                className="text-blue-500 underline dark:text-orange-500"
              >
                everything-flows
              </a>
            </td>
          </tr>
          <tr>
            <td>E-mail</td>
            <td>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="psst5491@naver.com"
                className="text-blue-500 underline dark:text-orange-500"
              >
                psst5491@naver.com
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
