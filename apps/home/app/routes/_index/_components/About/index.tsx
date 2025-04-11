import { StickyHeading } from "@rhei/react";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl py-4">
      <StickyHeading>
        <h2 className="text-title bg-normal">소개</h2>
      </StickyHeading>

      <StickyHeading>
        <h3 className="text-brand w-full text-center text-[clamp(2rem,6vw,3rem)] font-bold">
          <span className="bg-brand inline-block skew-x-[-50deg] rounded-[100%] px-2 py-2">
            <span className="bg-normal inline-block skew-y-[2deg] rounded-[100%] px-2 py-2">
              <span className="font-PyeongChangPeaceBold inline-block skew-x-[51deg] skew-y-[-2deg]">
                Panta Rhei
              </span>
            </span>
          </span>
        </h3>
      </StickyHeading>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        voluptatibus, quos, voluptatum, quisquam voluptatibus, quos, voluptatum
        quisquam voluptatibus, quos, voluptatum quisquam voluptatibus, quos,
        voluptatum
      </p>
    </section>
  );
}
