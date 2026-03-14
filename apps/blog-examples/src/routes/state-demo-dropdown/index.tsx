import React from "react";
import { createRoot } from "react-dom/client";
import StateDemoDropdown from "./StateDemoDropdown";
import "./index.css";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  if (root) {
    const r = createRoot(root);
    r.render(React.createElement(StateDemoDropdown));
  }
});
