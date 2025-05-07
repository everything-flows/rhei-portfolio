import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const theme =
      document.cookie.match(/theme=(dark|light)/)?.[1] ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");

    setIsDark(theme === "dark");
    document.documentElement.classList.toggle("dark", theme === "dark");
    setHydrated(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsDark(checked);
    document.documentElement.classList.toggle("dark", checked);
    document.cookie = `theme=${
      checked ? "dark" : "light"
    }; path=/; max-age=31536000`;
  };

  if (!hydrated) {
    return null;
  }

  return (
    <label className="relative">
      <input
        id="theme-toggle"
        type="checkbox"
        onChange={handleChange}
        className="hidden peer"
        checked={isDark}
      />

      <span className={container} />
      <span className={slider} />
    </label>
  );
}

const container = `
w-16 h-8 rounded-full block cursor-pointer
transition-all duration-200 ease-out
bg-blue-100 peer-checked:bg-orange-900
border border-blue-400 peer-checked:border-orange-400
`;

const slider = `
block pointer-events-none rounded-full size-6
absolute top-1 left-1
bg-blue-500 peer-checked:bg-orange-500
transition-all duration-200 ease-out peer-checked:translate-x-8 

before:absolute before:-left-[10%] before:top-[2%]
before:size-4 before:rounded-full
before:bg-blue-100 before:peer-checked:bg-orange-900
before:scale-0 before:peer-checked:scale-100 
`;
