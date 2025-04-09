import { ReactNode } from "react";

export default function Button({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="px-4 py-2 bg-blue-500 text-gray-white rounded-full"
    >
      {children}
    </button>
  );
}
