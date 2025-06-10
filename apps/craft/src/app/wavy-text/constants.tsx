import { ReactNode } from "react";
import WavyText from "./WavyText";

export interface Example {
  title: string;
  description: string;
  component: ReactNode;
  code: string;
}

export const EXAMPLE_LIST: Example[] = [
  {
    title: "혼자 사용하기",
    description:
      "단어 또는 문장을 WavyText 컴포넌트로 감싸서 사용할 수 있습니다.",
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
    title: "다른 태그와 함께 사용하기",
    description:
      "WavyText 컴포넌트 내부에서 다양한 태그(span, strong)를 혼합해서 사용할 수 있습니다.",
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
];
