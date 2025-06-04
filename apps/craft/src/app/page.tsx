import { Footer } from "@rhei/ui";
import Link from "next/link";

const ITEM_LIST = [
  {
    title: "Debounce 예시",
    description:
      "사용자 입력이 멈췄을 때만 이벤트를 실행하여 과도한 호출을 방지합니다.",
    link: "/debounce",
    thumbnail:
      "https://tnzycdohhtvupgagmwfx.supabase.co/storage/v1/object/public/rhei-craft//debounce.webp",
  },
  {
    title: "Throttle 예시",
    description:
      "정해진 시간 간격마다 이벤트를 실행하여 호출 빈도를 제어합니다.",
    link: "/throttle",
    thumbnail:
      "https://tnzycdohhtvupgagmwfx.supabase.co/storage/v1/object/public/rhei-craft//throttle.webp",
  },
  {
    title: "Fake 3D 알약",
    description:
      "원과 사각형 요소만으로 입체적으로 회전하는 알약 애니메이션을 만듭니다.",
    link: "/fake3dPill",
    thumbnail:
      "https://tnzycdohhtvupgagmwfx.supabase.co/storage/v1/object/public/rhei-craft//fake3dPill.webp",
  },
];

export default async function Home() {
  return (
    <>
      <main className="content-x">
        <section className="mx-auto w-full max-w-6xl">
          <h1>나의 작은 쓰레기장</h1>

          <div className="mt-8 grid grid-cols-[1fr] gap-x-4 gap-y-5 sm:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr]">
            {ITEM_LIST.map((item) => (
              <Link
                key={item.title}
                href={item.link}
                className="rounded-3xl bg-[#eaeaea] p-2 hover:text-blue-500 dark:bg-[#222222]"
              >
                <article className="flex flex-col">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="mb-2 aspect-[16/9] rounded-2xl object-cover"
                  />
                  <div className="p-2">
                    <h3 className="text-[1.4rem] font-bold">{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export const runtime = "edge";
