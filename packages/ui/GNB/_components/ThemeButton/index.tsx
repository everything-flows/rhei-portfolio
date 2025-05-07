import { useEffect, useState } from "react";
import "./style.css";
import StarIcon from "../StarIcon";

export default function ThemeButton() {
  const [isDark, setIsDark] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const updateFromClass = () => {
      const hasDarkClass = document.documentElement.classList.contains("dark");
      setIsDark(hasDarkClass);
    };

    updateFromClass();

    const observer = new MutationObserver(() => {
      updateFromClass();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    setHydrated(true);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    document.documentElement.classList.toggle("dark", checked);
    document.cookie = `theme=${
      checked ? "dark" : "light"
    }; path=/; max-age=31536000`;
    localStorage.setItem("theme", checked ? "dark" : "light");
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
