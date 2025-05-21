import { tickCount, tickTime } from "../constants";

export class DebouncedEventModel {
  private eventStarted = false;
  private intervalId: number | null = null;
  public currentTickIndex = 0;

  public startTimer(colorTick: (tickIndex: number) => void) {
    if (this.eventStarted) {
      return;
    }

    this.eventStarted = true;
    this.currentTickIndex = 0;

    this.intervalId = setInterval(() => {
      if (this.currentTickIndex >= tickCount) {
        if (this.intervalId) {
          clearInterval(this.intervalId);
        }
        return;
      }

      colorTick(this.currentTickIndex);
      this.currentTickIndex++;
    }, tickTime);
  }

  public resetTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.eventStarted = false;
    this.currentTickIndex = 0;
  }
}
