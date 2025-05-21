import "./reset.css";
import "./style.css";

import { RawEventModel } from "./rawEvent/RawEventModel";
import { RawEventView } from "./rawEvent/RawEventView";
import { RawEventController } from "./rawEvent/RawEventController";
import { DebouncedEventModel } from "./debouncedEvent/DebouncedEventModel";
import { DebouncedEventView } from "./debouncedEvent/DebouncedEventView";
import { DebouncedEventController } from "./debouncedEvent/DebouncedEventController";

document.addEventListener("DOMContentLoaded", function () {
  const rawEventModel = new RawEventModel();
  const rawEventView = new RawEventView("raw-event-container");
  const rawEventController = new RawEventController(
    rawEventModel,
    rawEventView
  );
  rawEventController.init();

  const debouncedEventModel = new DebouncedEventModel();
  const debouncedEventView = new DebouncedEventView(
    "debounced-event-container"
  );
  const debouncedEventController = new DebouncedEventController(
    debouncedEventModel,
    debouncedEventView,
    {
      leading: true,
      trailing: false,
    }
  );
  debouncedEventController.init();
});
