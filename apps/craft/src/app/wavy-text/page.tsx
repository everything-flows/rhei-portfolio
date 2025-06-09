import { Footer } from "@rhei/ui";
import WavyText from "./WavyText";

export default function Page() {
  return (
    <>
      <main className="content-x">
        <h1 className="mx-auto w-full max-w-6xl text-[2rem] font-bold">
          Wavy text
        </h1>

        <section className="mx-auto w-full max-w-6xl">
          <p className="text-[1.5rem]">
            <WavyText>Waaaaavy</WavyText> text
          </p>

          <p className="text-[1.5rem]">
            This is{" "}
            <WavyText>
              <span className="text-blue-500">Blue</span> and{" "}
              <strong>Strong</strong> and Waaaaavy
            </WavyText>{" "}
            text
          </p>

          <p className="text-[1.5rem]">
            This is{" "}
            <WavyText>
              <span className="text-blue-500">
                <strong>Blue and Strong and Waaaaavy </strong>
              </span>
            </WavyText>{" "}
            text
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
