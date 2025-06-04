import { idleColor, tickCount } from "@/constants";

export class DebouncedEventView {
  private container: HTMLElement;

  constructor(containerId: string) {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error("Container not found");
    }
    this.container = container;
  }

  public init() {
    this.container.innerHTML = "";

    for (let i = 0; i < tickCount; i++) {
      const tickItem = document.createElement("div");
      tickItem.className = "tick-item";
      this.container.appendChild(tickItem);
    }
  }

  public colorIdleTick(tickIndex: number) {
    const tick = this.container.children[tickIndex] as
      | HTMLDivElement
      | undefined;

    if (!tick || tick.style.backgroundColor) {
      return;
    }

    tick.style.backgroundColor = idleColor;
  }

  public colorActiveTick(tickIndex: number, color: string) {
    const tick = this.container.children[tickIndex] as
      | HTMLDivElement
      | undefined;

    if (!tick) {
      return;
    }

    tick.style.backgroundColor = color;
  }
}
