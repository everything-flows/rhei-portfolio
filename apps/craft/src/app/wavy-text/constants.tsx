import { ReactNode } from "react";
import WavyText from "./WavyText";

export interface Example {
  title: string;
  component: ReactNode;
  code: string;
}

export const EXAMPLE_LIST: Example[] = [
  {
    title: "기초 예제",
    component: (
      <p>
        <WavyText>Waaaaavy</WavyText> text
      </p>
    ),
    code: `<p>
    <WavyText>Waaaaavy</WavyText> text
</p>`,
  },
  {
    title: "병렬",
    component: (
      <p>
        This is{" "}
        <WavyText>
          <span className="text-blue-500">Blue</span> and{" "}
          <strong>Strong</strong> and Waaaaavy
        </WavyText>{" "}
        text
      </p>
    ),
    code: `<p>
  This is 
  <WavyText>
    <span className="text-blue-500">Blue</span> and <strong>Strong</strong> and
    Waaaaavy
  </WavyText> 
  text
</p>`,
  },
  {
    title: "중첩",
    component: (
      <p>
        This is{" "}
        <WavyText>
          <span className="text-blue-500">
            <strong>Blue and Strong and Waaaaavy</strong>
          </span>
        </WavyText>{" "}
        text
      </p>
    ),
    code: `<p>
  This is 
  <WavyText> 
    <span className="text-blue-500">
      <strong>Blue and Strong and Waaaaavy</strong>
    </span>
  </WavyText> 
  text
</p>`,
  },
];
