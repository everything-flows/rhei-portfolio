import { RawEventModel } from "./RawEventModel";
import { RawEventView } from "./RawEventView";

export class RawEventController {
  constructor(private model: RawEventModel, private view: RawEventView) {}

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
