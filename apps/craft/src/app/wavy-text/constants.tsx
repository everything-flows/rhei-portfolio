import WavyText from "./WavyText";

export interface Example {
  title: string;
  component: JSX.Element;
}

export const EXAMPLE_LIST: Example[] = [
  {
    title: "기초 예제",
    component: (
      <>
        <WavyText>Waaaaavy</WavyText> text
      </>
    ),
  },
  {
    title: "병렬",
    component: (
      <>
        This is{" "}
        <WavyText>
          <span className="text-blue-500">Blue</span> and{" "}
          <strong>Strong</strong> and Waaaaavy
        </WavyText>{" "}
        text
      </>
    ),
  },
  {
    title: "중첩",
    component: (
      <>
        This is{" "}
        <WavyText>
          <span className="text-blue-500">
            <strong>Blue and Strong and Waaaaavy</strong>
          </span>
        </WavyText>{" "}
        text
      </>
    ),
  },
];
