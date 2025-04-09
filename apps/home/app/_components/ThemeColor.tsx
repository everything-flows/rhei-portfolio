import { useEffect } from "react";

export default function ThemeColor() {
  useEffect(() => {
    const updateThemeColor = () => {
      const isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute(
          "content",
          isDarkMode ? "#000000" : "#ffffff",
        );
      }
    };

    updateThemeColor();

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", updateThemeColor);

    return () => {
      media.removeEventListener("change", updateThemeColor);
    };
  }, []);

  return <meta name="theme-color" content="#ffffff" />;
}
