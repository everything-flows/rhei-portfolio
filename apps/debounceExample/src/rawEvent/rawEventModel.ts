import { tickCount, tickTime } from "../constants";

export class RawEventModel {
  private eventStarted = false;
  public currentTickIndex = 0;

  public startTimer(colorTick: (tickIndex: number) => void) {
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
      colorTick(this.currentTickIndex);
      this.currentTickIndex++;
    }, tickTime);
  }
}
