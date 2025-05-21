import { DebouncedEventModel } from "./DebouncedEventModel";
import { DebouncedEventView } from "./DebouncedEventView";

export class DebouncedEventController {
  constructor(
    private model: DebouncedEventModel,
    private view: DebouncedEventView
  ) {}

  public init() {
    // init view
    this.view.init();

    // add event handler
    const inputElement = document.getElementById("event-input");
    if (!inputElement) {
      return;
    }

    inputElement.addEventListener("input", () => {
      this.model.startTimer((tickIndex: number) =>
        this.view.colorIdleTick(tickIndex)
      );
      this.view.colorActiveTick(this.model.currentTickIndex);
    });
  }
}
