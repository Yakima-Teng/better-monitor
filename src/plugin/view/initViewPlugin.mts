import { addView } from "#api/addView";
import { getStore } from "#scripts/StoreUtils";
import { getUserId } from "#scripts/StoreUtils";

/**
 * @apiAnalyze
 * 支持添加PV、UV、BV数据（page view, user view, browser view）
 * @since 0.02
 * @example
 * ```typescript
 * BetterMonitor.initViewPlugin()
 * ```
 */
export const initViewPlugin = (): void => {
  const { view } = getStore();

  if (!view) {
    return;
  }

  const addViewBeforeUnload = async (): Promise<void> => {
    const { projectId, sdk: s } = getStore();
    const userId = getUserId();
    addView({
      pi: projectId,
      s,
      p: location.href,
      u: userId,
    });
  };

  window.addEventListener("load", addViewBeforeUnload);
  window.addEventListener("hashchange", addViewBeforeUnload);

  const { history } = window;
  // 劫持pushState
  const oldPushState = history.pushState;
  history.pushState = async (state: unknown, unused: string, url: string | URL): Promise<void> => {
    const userId = getUserId();
    const { projectId, sdk: s } = getStore();
    oldPushState.call(history, state, unused, url);
    addView({
      pi: projectId,
      s,
      p: location.href,
      u: userId,
    });
  };
};
