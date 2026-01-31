import { Link } from "@remix-run/react";

const PROJECT_TREE = `.
├── apps
│   ├── home
│   ├── blog
│   ├── resume
│   └── craft
└── packages
    ├── ui
    └── react
`;

const codeStyle = "rounded-md bg-gray-200 px-1 dark:bg-gray-700";
const strongStyle = "text-brand font-extrabold";
const rheiChatStyle =
  "text-[1.1rem] w-fit max-w-[80%] rounded-[2rem] rounded-tl-none bg-gray-300/20 p-4 text-pretty";
const myChatStyle =
  "text-reverse w-fit text-[1.1rem] font-bold ml-auto max-w-[80%] rounded-[2rem] rounded-tr-none bg-gradient-to-br from-blue-400 to-blue-500 p-4 dark:from-orange-500 dark:to-orange-600 text-pretty";

function Thumbnail() {
  return (
    <img
      className="border-sub size-10 rounded-full border sm:size-12"
      src="https://tnzycdohhtvupgagmwfx.supabase.co/storage/v1/object/public/rhei-home//profile.webp"
      alt="profile"
    />
  );
}

export default function Notification() {
  return (
    <section className="mx-auto mt-[10dvh] flex max-w-3xl flex-col gap-4 py-4">
      <div className="flex gap-4">
        <Thumbnail />
        <article className={rheiChatStyle}>
          <p>
            이 웹은 <code className={codeStyle}>rhei.me</code>
            라는 <strong className={strongStyle}>하나의 도메인</strong> 아래에서
            Remix, Next.js로 만든{" "}
            <strong className={strongStyle}>서로 다른 프로젝트들</strong>을
            통합해 서비스하고 있어요.
          </p>
        </article>
      </div>

      <article>
        <p className={myChatStyle}>네?</p>
      </article>

      <div className="flex gap-4">
        <Thumbnail />
        <article className={rheiChatStyle}>
          <p>
            <code className={codeStyle}>/</code>,{" "}
            <code className={codeStyle}>/blog</code>,{" "}
            <code className={codeStyle}>/resume</code>,{" "}
            <code className={codeStyle}>/craft</code>페이지는 각각 따로 배포되어
            있지만, Cloudflare Pages의 Functions 기능을 활용해 요청이 들어올
            때마다{" "}
            <strong className={strongStyle}>적절한 웹사이트로 프록시</strong>
            되도록 설정했어요.
            <br />
            <br />
            예를 들어, <code className={codeStyle}>rhei.me/blog/...</code>{" "}
            페이지로 오는 요청은 실제로{" "}
            <code className={codeStyle}>blog.rhei.me/blog/...</code>으로
            보내진답니다!
          </p>
        </article>
      </div>

      <article className={myChatStyle}>
        <p>각 프로젝트는 독립된 레포로 관리되나요?</p>
      </article>

      <div className="flex gap-4">
        <Thumbnail />
        <article className={rheiChatStyle}>
          <p>
            코드는 <strong className={strongStyle}>모노레포</strong>로 관리되고
            있어요.
            <br />
            따라서 tailwind의 테마 설정이나 GNB, Footer 등의 공통 컴포넌트를
            여러 앱에서 공유할 수 있어요 🙌
          </p>
        </article>
      </div>

      <article className={myChatStyle}>
        <p>자세한 구현이 궁금해요</p>
      </article>

      <div className="flex gap-4">
        <Thumbnail />
        <article className={rheiChatStyle}>
          <p className="mb-2">프로젝트는 이런 폴더 구조를 가지고 있어요.</p>
          <pre className="w-fit rounded-lg bg-gray-200 px-4 py-2 dark:bg-gray-600">
            <code>{PROJECT_TREE}</code>
          </pre>

          <p className="mt-4">
            <Link
              to="https://github.com/psst54/rhei-portfolio"
              className="text-brand underline"
            >
              GitHub
            </Link>
            에서 전체 코드를 확인할 수도 있어요.
          </p>
        </article>
      </div>
    </section>
  );
}
