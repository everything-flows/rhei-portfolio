import "@/reset.css";
import "@/style.css";

import { RawEventModel } from "@/rawEvent/RawEventModel";
import { RawEventView } from "@/rawEvent/RawEventView";
import { RawEventController } from "@/rawEvent/RawEventController";
import { ThrottledEventModel } from "@/throttledEvent/ThrottledEventModel";
import { ThrottledEventView } from "@/throttledEvent/ThrottledEventView";
import { ThrottledEventController } from "@/throttledEvent/ThrottledEventController";

document.addEventListener("DOMContentLoaded", function () {
  const rawEventModel = new RawEventModel();
  const rawEventView = new RawEventView("raw-event-container");
  const rawEventController = new RawEventController(
    rawEventModel,
    rawEventView
  );
  rawEventController.init();

  const throttledEventModel = new ThrottledEventModel();
  const throttledEventView = new ThrottledEventView(
    "throttled-event-container"
  );
  const throttledEventController = new ThrottledEventController(
    throttledEventModel,
    throttledEventView,
    {
      leading: true,
      trailing: false,
    }
  );
  throttledEventController.init();
});
