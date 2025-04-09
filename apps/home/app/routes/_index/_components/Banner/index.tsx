import Marquee from "./Marquee";

export default function Banner() {
  return (
    <section>
      <Marquee style="-content-x bg-blue-500 dark:bg-orange-500 overflow-x-clip">
        <p className="whitespace-nowrap px-4 py-2 text-[clamp(1rem,4vw,2rem)] font-bold text-gray-white">
          보고 싶은 것도 보여주고 싶은 것도 많은
        </p>
      </Marquee>
      <Marquee style="-content-x overflow-x-clip" reverse>
        <p className="whitespace-nowrap px-4 py-2 text-[clamp(1rem,4vw,2rem)] font-bold text-blue-500 dark:text-orange-500">
          보고 싶은 것도 보여주고 싶은 것도 많은
        </p>
      </Marquee>
    </section>
  );
}
