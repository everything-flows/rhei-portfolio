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
          <p>
            This is <span className="text-blue-500">blue</span> and{" "}
            <strong>strong</strong> and <WavyText>wavvvvvvvvvy</WavyText> text
          </p>

          <p>
            This is{" "}
            <WavyText>
              <span className="text-blue-500">blue</span> and{" "}
              <strong>strong</strong> and wavvvvvvvvvy
            </WavyText>{" "}
            text
          </p>

          <p>
            This is{" "}
            <WavyText>
              <span className="text-blue-500">
                <strong>blue and strong and wavvvvvvvvvy </strong>
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
