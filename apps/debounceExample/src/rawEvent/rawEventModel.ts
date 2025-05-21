import { tickCount, tickTime } from "../constants";

export class rawEventModel {
  private eventStarted = false;
  private currentTickIndex = 0;

  public startTimer() {
    if (this.eventStarted) {
      return;
    }

    this.eventStarted = true;
    this.currentTickIndex = 0;

    const intervalId = setInterval(() => {
      if (this.currentTickIndex >= tickCount) {
        clearInterval(intervalId);
        return;
      }

      console.log("[currentTickIndex]", this.currentTickIndex);
      this.currentTickIndex++;
    }, tickTime);
  }
}
