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
    const userId = await getUserId();
    addView({
      pageUrl: location.href,
      userId,
    });
  };

  window.addEventListener("load", addViewBeforeUnload);
  window.addEventListener("hashchange", addViewBeforeUnload);

  const { history } = window;
  // 劫持pushState
  const oldPushState = history.pushState;
  history.pushState = async (
    state: unknown,
    unused: string,
    url: string | URL,
  ): Promise<void> => {
    const userId = await getUserId();
    oldPushState.call(history, state, unused, url);
    addView({
      pageUrl: location.href,
      userId,
    });
  };

  // 劫持replaceState
  // const oldReplaceState = history.replaceState
  // history.replaceState = (stateObj: any, title: string, url: string | URL) => {
  //   oldReplaceState.call(history, stateObj, title, url)
  //   addView({
  //     pageUrl: location.href,
  //     userId: getUserId(),
  //   })
  // }
};
