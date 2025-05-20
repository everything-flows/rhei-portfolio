import "./style.css";

const tickTime = 400; // ms
const tickCount = 50;

document.addEventListener("DOMContentLoaded", function () {
  initRawEventContainer();
  initDebouncedEventContainer();
});

function initRawEventContainer() {
  const rawEventContainer = document.getElementById("raw-event-container");
  for (let i = 0; i < tickCount; i++) {
    if (!rawEventContainer) {
      return;
    }
    const element = document.createElement("div");
    element.setAttribute("class", "tick-element");
    rawEventContainer.appendChild(element);
  }
}

function initDebouncedEventContainer() {
  const debouncedEventContainer = document.getElementById(
    "debounced-event-container"
  );
  for (let i = 0; i < tickCount; i++) {
    if (!debouncedEventContainer) {
      return;
    }
    const element = document.createElement("div");
    element.setAttribute("class", "tick-element");
    debouncedEventContainer.appendChild(element);
  }
}
