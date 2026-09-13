export const Tech = {
  JavaScript: "JavaScript",
  TypeScript: "TypeScript",
  React: "React",
  ReactNative: "React Native",
  NextJs: "Next.js",
  Remix: "Remix",
  TanstackQuery: "Tanstack Query",
  Zustand: "Zustand",
  Tailwind: "Tailwind",
  Emotion: "Emotion",
  StyledComponents: "Styled Components",
  Jest: "Jest",
  Supabase: "Supabase",
  Java: "JAVA",
  SpringBoot: "Spring Boot",
} as const;

export type Tech = (typeof Tech)[keyof typeof Tech];

export const TECH_LINKS: Record<Tech, string> = {
  [Tech.JavaScript]: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  [Tech.TypeScript]: "https://www.typescriptlang.org/",
  [Tech.React]: "https://react.dev/",
  [Tech.ReactNative]: "https://reactnative.dev/",
  [Tech.NextJs]: "https://nextjs.org/",
  [Tech.Remix]: "https://remix.run/",
  [Tech.TanstackQuery]: "https://tanstack.com/query/latest",
  [Tech.Zustand]: "https://zustand-demo.pmnd.rs/",
  [Tech.Tailwind]: "https://tailwindcss.com/",
  [Tech.Emotion]: "https://emotion.sh/docs/introduction",
  [Tech.StyledComponents]: "https://styled-components.com/",
  [Tech.Jest]: "https://jestjs.io/",
  [Tech.Supabase]: "https://supabase.com/",
  [Tech.Java]: "https://www.java.com/",
  [Tech.SpringBoot]: "https://spring.io/projects/spring-boot",
};
