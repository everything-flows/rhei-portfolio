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
    const inputElement = document.getElementById("event-input");
    if (!inputElement) {
      return;
    }

    inputElement.addEventListener("input", () => {
      this.model.startTimer((tickIndex: number) =>
        this.view.colorIdleTick(tickIndex)
      );

      this.debouncedFunction();
    });
  }
}
