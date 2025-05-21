import { tickCount } from "../constants";

export class rawEventView {
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
}
