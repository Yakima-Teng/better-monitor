import { onCLS, onTTFB, onLCP, onINP, onFCP } from "web-vitals";
import {
  addPerformanceLog,
  reportPerformanceLogs,
} from "#api/addPerformanceLog";

export const initPerformancePlugin = (): void => {
  onCLS(addPerformanceLog);
  onTTFB(addPerformanceLog);
  onLCP(addPerformanceLog);
  onINP(addPerformanceLog);
  onFCP(addPerformanceLog);

  // Report all available metrics whenever the page is backgrounded or unloaded.
  addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      reportPerformanceLogs();
    }
  });

  // NOTE: Safari does not reliably fire the `visibilitychange` event when the
  // page is being unloaded. If Safari support is needed, you should also flush
  // the queue in the `pagehide` event.
  addEventListener("pagehide", reportPerformanceLogs);
};
