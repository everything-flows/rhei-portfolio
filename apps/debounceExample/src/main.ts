import { RawEventModel } from "./rawEvent/RawEventModel";
import { RawEventView } from "./rawEvent/RawEventView";
import { RawEventController } from "./rawEvent/RawEventController";
import "./style.css";

document.addEventListener("DOMContentLoaded", function () {
  const rawEventModel = new RawEventModel();
  const rawEventView = new RawEventView("raw-event-container");
  const rawEventController = new RawEventController(
    rawEventModel,
    rawEventView
  );
  rawEventController.init();
});
