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

  const addViewBeforeUnload = (): void => {
    const { sdk: s } = getStore();
    const userId = getUserId();
    // addView 现在是异步的，但不阻塞页面卸载
    addView({
      pi: "", // 临时值，addView 内部会异步获取并替换
      s,
      p: location.href,
      u: userId,
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.error("BetterMonitor: Failed to report view:", err);
    });
  };

  window.addEventListener("load", addViewBeforeUnload);
  window.addEventListener("hashchange", addViewBeforeUnload);

  // 执行到这段代码的时候，可能 load 事件已经触发过了，这时候需要判断如果 readyState === 'complete' 时手动执行一次
  if (document.readyState === "complete") {
    addViewBeforeUnload();
  }

  const { history } = window;
  // 劫持pushState
  const oldPushState = history.pushState;
  history.pushState = async (state: unknown, unused: string, url: string | URL): Promise<void> => {
    const userId = getUserId();
    const { sdk: s } = getStore();
    oldPushState.call(history, state, unused, url);
    // addView 现在是异步的
    addView({
      pi: "", // 临时值，addView 内部会异步获取并替换
      s,
      p: location.href,
      u: userId,
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.error("BetterMonitor: Failed to report view:", err);
    });
  };
};
