import React from "react";
import { createRoot } from "react-dom/client";
import Utf8EncodingDemo from "./Utf8EncodingDemo";
import "./index.css";

function applyTheme(theme: "dark" | "light") {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

function getTheme(): "dark" | "light" {
  const stored = localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") return stored;
  const cookie = document.cookie
    .split(";")
    .find((c) => c.trim().startsWith("theme="));
  if (cookie) {
    const v = cookie.split("=")[1];
    if (v === "dark" || v === "light") return v;
  }
  if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) return "dark";
  return "light";
}

const isIframe = window.parent !== window;
let currentAppliedTheme: "dark" | "light" | null = null;

if (isIframe) {
  window.addEventListener(
    "message",
    (event: MessageEvent) => {
      if (event.data?.type === "THEME_UPDATE") {
        const theme = event.data.theme;
        if (theme === "dark" || theme === "light") {
          if (currentAppliedTheme === theme) return;
          currentAppliedTheme = theme;
          applyTheme(theme);
        }
      }
    },
    false,
  );
  try {
    window.parent.postMessage({ type: "REQUEST_THEME" }, "*");
  } catch (_) {}
}

document.addEventListener("DOMContentLoaded", () => {
  if (!isIframe) {
    applyTheme(getTheme());
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (mq) {
      const change = (e: MediaQueryListEvent | MediaQueryList) => {
        const s = localStorage.getItem("theme");
        const c = document.cookie
          .split(";")
          .find((x) => x.trim().startsWith("theme="));
        if (s === "dark" || s === "light") {
          applyTheme(s);
          return;
        }
        const v = c?.split("=")[1];
        if (v === "dark" || v === "light") {
          applyTheme(v);
          return;
        }
        applyTheme("matches" in e ? (e.matches ? "dark" : "light") : (mq.matches ? "dark" : "light"));
      };
      change(mq);
      mq.addEventListener?.("change", change);
    }
  }
  const el = document.getElementById("root");
  if (el) {
    const root = createRoot(el);
    root.render(React.createElement(Utf8EncodingDemo));
  }
});
