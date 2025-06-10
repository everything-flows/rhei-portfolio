import { Footer } from "@rhei/ui";

const EXAMPLE_LIST = [
  {
    title: "1. Trailing Edge에서 실행하기",
    description:
      "디바운스(Debounce)된 함수는 마지막 이벤트 발생 이후 일정 시간이 지나야 원래 함수가 실행됩니다.\nLodash나 es-toolkit을 이용해 디바운싱된 함수는 기본적으로 Trailing Edge에서만 실행됩니다.",
    src: "https://debounce.rhei.me/debounce/trailing",
    img: "https://tnzycdohhtvupgagmwfx.supabase.co/storage/v1/object/public/rhei-craft/debounce/debounce-trailing.webp",
  },
  {
    title: "2. Leading Edge에서 실행하기",
    description:
      "디바운싱된 함수가 호출되면 즉시 원래 함수가 실행됩니다.\n그 후 일정 시간 동안은 다시 호출되지 않습니다.",
    src: "https://debounce.rhei.me/debounce/leading",
    img: "https://tnzycdohhtvupgagmwfx.supabase.co/storage/v1/object/public/rhei-craft/debounce/debounce-leading.webp",
  },
  {
    title: "3. Leading Edge와 Trailing Edge에서 실행하기",
    description:
      "디바운싱된 함수는 처음 호출될 때와 마지막 호출 이후 일정 시간이 지난 뒤, 총 두 번 실행됩니다.\n단, 마지막 실행이 발생하려면 디바운스 함수가 일정 시간 내에 최소 두 번 이상 호출되어야 합니다.",
    src: "https://debounce.rhei.me/debounce/leading-trailing",
    img: "https://tnzycdohhtvupgagmwfx.supabase.co/storage/v1/object/public/rhei-craft/debounce/debounce-leading-trailing.webp",
  },
];

function Card({ data }: { data: any }) {
  const { title, description, src, img } = data;

  return (
    <article className="flex w-full flex-col">
      <h2 className="text-[1.5rem] font-bold">{title}</h2>
      <p className="whitespace-pre-wrap text-gray-500 dark:text-gray-200">
        {description}
      </p>

      <h3 className="mt-4 text-[1.25rem] font-bold">예시</h3>
      <img
        src={img}
        alt={`${title} 예시`}
        className="border-sub mx-auto max-w-[400px] rounded-md border"
      />

      <h3 className="mt-4 text-[1.25rem] font-bold">직접 해보기</h3>
      <p className="text-gray-500 dark:text-gray-200">
        text input에 아무 텍스트나 입력해 input 이벤트가 어떻게 처리되는지
        살펴봅시다.
      </p>
      <iframe
        src={src}
        allowFullScreen
        loading="lazy"
        className="bg-gray-white border-sub h-[280px] w-full rounded-md border"
      ></iframe>
    </article>
  );
}

export default async function DebouncePage() {
  return (
    <>
      <main className="content-x">
        <h1 className="mx-auto w-full max-w-6xl text-[2rem] font-bold">
          디바운스 (Debounce) 예제
        </h1>

        <section className="mx-auto mt-4 flex w-full max-w-6xl flex-wrap gap-x-4 gap-y-12">
          {EXAMPLE_LIST.map((item) => (
            <Card key={item.title} data={item} />
          ))}
        </section>

        <p className="mx-auto mt-20 w-full max-w-6xl">
          reference:{" "}
          <a
            href="https://css-tricks.com/debouncing-throttling-explained-examples/"
            className="text-brand underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://css-tricks.com/debouncing-throttling-explained-examples/
          </a>
        </p>
      </main>

      <Footer />
    </>
  );
}

export const runtime = "edge";
