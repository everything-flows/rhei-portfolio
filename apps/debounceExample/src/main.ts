import { rawEventModel } from "./rawEvent/rawEventModel";
import { rawEventView } from "./rawEvent/rawEventView";
import { rawEventController } from "./rawEvent/rawEventController";
import "./style.css";

document.addEventListener("DOMContentLoaded", function () {
  const model = new rawEventModel();
  const view = new rawEventView("raw-event-container");
  const controller = new rawEventController(model, view);
  controller.init();
});
