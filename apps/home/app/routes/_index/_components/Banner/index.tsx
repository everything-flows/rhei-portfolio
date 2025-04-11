import Marquee from "./Marquee";

export default function Banner() {
  return (
    <section>
      <Marquee style="-content-x bg-blue-500 dark:bg-orange-500 overflow-x-clip">
        <p className="text-reverse whitespace-nowrap px-4 py-2 text-[clamp(1rem,4vw,2rem)] font-extrabold">
          배너 텍스트 1
        </p>
      </Marquee>
      <Marquee style="-content-x overflow-x-clip" reverse>
        <p className="whitespace-nowrap px-4 py-2 text-[clamp(1rem,4vw,2rem)] font-extrabold text-blue-500 dark:text-orange-500">
          배너 텍스트 2
        </p>
      </Marquee>
    </section>
  );
}
