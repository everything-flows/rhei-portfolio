import React from "react";
import { createRoot } from "react-dom/client";
import StringUnitsDemo from "./StringUnitsDemo";

document.addEventListener("DOMContentLoaded", function () {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(React.createElement(StringUnitsDemo));
  }
});
