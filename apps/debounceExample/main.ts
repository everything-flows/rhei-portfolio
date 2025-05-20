import "./style.css";
import { startTimer } from "./timer";

const tickCount = 50;

document.addEventListener("DOMContentLoaded", function () {
  initRawEventContainer();
  initDebouncedEventContainer();

  const inputElement = document.getElementById("event-input");
  inputElement?.addEventListener("input", () => {
    startTimer();
  });
});

function initRawEventContainer() {
  const rawEventContainerElement = document.getElementById(
    "raw-event-container"
  );
  for (let i = 0; i < tickCount; i++) {
    if (!rawEventContainerElement) {
      return;
    }
    const element = document.createElement("div");
    element.setAttribute("class", "tick-element");
    rawEventContainerElement.appendChild(element);
  }
}

function initDebouncedEventContainer() {
  const debouncedEventContainerElement = document.getElementById(
    "debounced-event-container"
  );
  for (let i = 0; i < tickCount; i++) {
    if (!debouncedEventContainerElement) {
      return;
    }
    const element = document.createElement("div");
    element.setAttribute("class", "tick-element");
    debouncedEventContainerElement.appendChild(element);
  }
}
