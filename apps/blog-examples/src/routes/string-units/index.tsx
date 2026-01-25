import React from "react";
import { createRoot } from "react-dom/client";
import StringUnitsDemo from "./StringUnitsDemo";
import "./index.css";

function applyTheme(theme: "dark" | "light") {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

function getTheme(): "dark" | "light" {
  const stored = localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") {
    return stored;
  }

  const cookie = document.cookie
    .split(";")
    .find((c) => c.trim().startsWith("theme="));
  if (cookie) {
    const theme = cookie.split("=")[1];
    if (theme === "dark" || theme === "light") {
      return theme;
    }
  }

  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }

  return "light";
}

let currentAppliedTheme: "dark" | "light" | null = null;
let isIframe = window.parent !== window;

if (isIframe) {
  const messageHandler = (event: MessageEvent) => {
    if (event.data?.type === "THEME_UPDATE") {
      const theme = event.data.theme;
      if (theme === "dark" || theme === "light") {
        if (currentAppliedTheme === theme) {
          return;
        }
        currentAppliedTheme = theme;
        applyTheme(theme);
      }
    }
  };

  window.addEventListener("message", messageHandler, false);

  try {
    window.parent.postMessage({ type: "REQUEST_THEME" }, "*");
  } catch (e) {}
}

document.addEventListener("DOMContentLoaded", function () {
  if (!isIframe) {
    applyTheme(getTheme());

    if (window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
        const stored = localStorage.getItem("theme");
        const cookie = document.cookie
          .split(";")
          .find((c) => c.trim().startsWith("theme="));

        if (stored === "dark" || stored === "light") {
          applyTheme(stored);
          return;
        }

        if (cookie) {
          const theme = cookie.split("=")[1];
          if (theme === "dark" || theme === "light") {
            applyTheme(theme);
            return;
          }
        }

        applyTheme(e.matches ? "dark" : "light");
      };

      handleChange(mediaQuery);

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", handleChange);
      } else {
        mediaQuery.addListener(handleChange);
      }
    }
  }

  const rootElement = document.getElementById("root");
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(React.createElement(StringUnitsDemo));
  }
});
