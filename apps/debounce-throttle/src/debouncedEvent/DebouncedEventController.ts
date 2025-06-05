import * as _ from "lodash";

import { debounceTime, tickColorList } from "@/constants";

import { DebouncedEventModel } from "./DebouncedEventModel";
import { DebouncedEventView } from "./DebouncedEventView";

export class DebouncedEventController {
  private debouncedFunction: () => void;
  private changeColor: () => void;

  private colorIndex = 0;

  constructor(
    private model: DebouncedEventModel,
    private view: DebouncedEventView,
    options?: { leading?: boolean; trailing?: boolean; maxWait?: number }
  ) {
    this.debouncedFunction = _.debounce(
      () => {
        this.view.colorActiveTick(
          this.model.currentTickIndex,
          tickColorList[this.colorIndex % tickColorList.length]
        );
      },
      debounceTime,
      options
    );
    this.changeColor = _.debounce(
      () => {
        this.colorIndex++;
      },
      debounceTime,
      { leading: false, trailing: true }
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
      this.changeColor();
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
