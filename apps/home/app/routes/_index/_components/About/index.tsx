import { StickyHeading } from "~/components/StickyHeading";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl py-4">
      <StickyHeading>
        <h2 className="text-title bg-normal">소개</h2>
      </StickyHeading>

      <StickyHeading>
        <h3 className="bg-normal text-[2rem]">안녕하세요!</h3>
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
