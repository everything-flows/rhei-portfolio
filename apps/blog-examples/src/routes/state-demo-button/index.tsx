import React from "react";
import { createRoot } from "react-dom/client";
import StateDemoButton from "./StateDemoButton";
import "./index.css";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  if (root) {
    const r = createRoot(root);
    r.render(React.createElement(StateDemoButton));
  }
});
