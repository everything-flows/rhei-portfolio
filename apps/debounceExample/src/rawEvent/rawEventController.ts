import { rawEventModel } from "./rawEventModel";
import { rawEventView } from "./rawEventView";

export class rawEventController {
  constructor(private model: rawEventModel, private view: rawEventView) {}

  public init() {
    // init view
    this.view.init();

    // add event handler
    const inputElement = document.getElementById("event-input");
    if (!inputElement) {
      return;
    }

    inputElement.addEventListener("input", () => {
      this.model.startTimer();
    });
  }
}
