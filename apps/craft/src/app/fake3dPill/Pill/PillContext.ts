import { createContext, useContext } from "react";

type PillContextType = {
  width: string;
  height: string;
  speed: number;
  fill: boolean;
};

export const PillContext = createContext<PillContextType | null>(null);

export function usePillContext() {
  const context = useContext(PillContext);

  if (!context)
    throw new Error("PillElement은 PillProvider 내부에서만 사용해야 합니다.");

  return context;
}
