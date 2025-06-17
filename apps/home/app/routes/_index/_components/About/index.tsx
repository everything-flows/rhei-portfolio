export default function About() {
  return (
    <section id="about" className="mx-auto my-12 max-w-6xl md:my-20">
      <h3 className="text-brand w-full text-center text-[clamp(2rem,6vw,3rem)] font-bold">
        <span className="bg-brand inline-block skew-x-[-50deg] rounded-[100%] px-2 py-2">
          <span className="bg-normal inline-block skew-y-[2deg] rounded-[100%] px-2 py-2">
            <span className="font-PyeongChangPeaceBold inline-block skew-x-[51deg] skew-y-[-2deg]">
              Panta Rhei
            </span>
          </span>
        </span>
      </h3>

      <p className="mt-12 text-[clamp(2rem,4vw,3rem)] font-thin">
        모든 것은 흐른다
      </p>
    </section>
  );
}
