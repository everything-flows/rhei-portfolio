import { RawEventModel } from "./RawEventModel";
import { RawEventView } from "./RawEventView";

export class RawEventController {
  constructor(private model: RawEventModel, private view: RawEventView) {}

  public init() {
    // init view
    this.view.init();

    // add event handler
    this.addInputHandler();
    this.addResetHandler();
  }

  private addInputHandler() {
    const input = document.getElementById("event-input");
    if (!input) {
      return;
    }

    input.addEventListener("input", () => {
      this.model.startTimer((tickIndex: number) =>
        this.view.colorIdleTick(tickIndex)
      );
      this.view.colorActiveTick(this.model.currentTickIndex);
    });
  }

  private addResetHandler() {
    const button = document.getElementById("reset-button");
    if (!button) {
      return;
    }

    button.addEventListener("click", () => {
      this.view.init();
      this.model.resetTimer();
    });
  }
}
