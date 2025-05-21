import * as _ from "lodash";

import { DebouncedEventModel } from "./DebouncedEventModel";
import { DebouncedEventView } from "./DebouncedEventView";
import { debounceTime } from "../constants";

export class DebouncedEventController {
  private debouncedFunction: () => void;

  constructor(
    private model: DebouncedEventModel,
    private view: DebouncedEventView,
    options?: { leading?: boolean; trailing?: boolean; maxWait?: number }
  ) {
    this.debouncedFunction = _.debounce(
      () => {
        this.view.colorActiveTick(this.model.currentTickIndex);
      },
      debounceTime,
      options
    );
  }

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
      this.debouncedFunction();
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
