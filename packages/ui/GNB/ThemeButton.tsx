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

      <span className="w-16 h-8 bg-blue-100 rounded-full block cursor-pointer border border-blue-400 transition-all duration-200 ease-out peer-checked:bg-orange-900 peer-checked:border-orange-400" />
      <span className="pointer-events-none rounded-full size-6 bg-blue-500 block absolute top-1 left-1 transition-all duration-200 ease-out peer-checked:translate-x-8 peer-checked:bg-orange-500" />
    </label>
  );
}
