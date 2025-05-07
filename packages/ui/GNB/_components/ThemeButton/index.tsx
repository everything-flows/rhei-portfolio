import { useEffect, useState } from "react";

import "./style.css";
import StarIcon from "../StarIcon";

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
    <label className="theme-toggle">
      <input
        id="theme-toggle"
        type="checkbox"
        onChange={handleChange}
        checked={isDark}
      />

      <span className="theme-toggle-container">
        <div id="cloud">
          <div id="dark-cloud-wrapper">
            <div className="dark-cloud" />
            <div className="dark-cloud" />
            <div className="dark-cloud" />
            <div className="dark-cloud" />
          </div>

          <div id="light-cloud-wrapper">
            <div className="light-cloud" />
            <div className="light-cloud" />
            <div className="light-cloud" />
            <div className="light-cloud" />
          </div>
        </div>

        <div id="star-wrapper">
          <div className="star">
            <StarIcon size="0.6rem" />
          </div>
          <div className="star">
            <StarIcon size="0.4rem" />
          </div>
          <div className="star">
            <StarIcon size="0.5rem" />
          </div>
          <div className="star">
            <StarIcon size="0.35rem" />
          </div>
        </div>

        <span className="theme-toggle-slider">
          <div id="sunlight-wrapper">
            <div className="sunlight" />
            <div className="sunlight" />
          </div>
          <div id="slider" />
        </span>
      </span>
    </label>
  );
}
