const tickTime = 400; // ms
let rawTimerId: number | undefined = undefined;
let rawCurrentIndex = 0;

export function startTimer() {
  if (!rawTimerId) {
    rawTimerId = setInterval(() => {
      const container = document.getElementById("raw-event-container");
      if (!container) {
        return;
      }

      const elements = container.querySelectorAll(".tick-element");

      if (!elements || rawCurrentIndex >= elements.length) {
        clearInterval(rawTimerId);
        rawTimerId = undefined;
        return;
      }

      (elements[rawCurrentIndex] as HTMLDivElement).style.backgroundColor =
        "#cccccc";

      rawCurrentIndex++;
    }, tickTime);
  }
}
