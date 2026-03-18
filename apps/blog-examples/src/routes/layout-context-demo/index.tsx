import React from "react";
import { createRoot } from "react-dom/client";
import LayoutContextDemo from "./LayoutContextDemo";
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
  if (
    window.matchMedia?.("(prefers-color-scheme: dark)").matches
  )
    return "dark";
  return "light";
}

document.addEventListener("DOMContentLoaded", () => {
  applyTheme(getTheme());
  const root = document.getElementById("root");
  if (root) {
    const r = createRoot(root);
    r.render(React.createElement(LayoutContextDemo));
  }
});
