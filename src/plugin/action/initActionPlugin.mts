import { addActions } from "#api/addAction";
import { getStore } from "#scripts/StoreUtils";

export const initActionPlugin = (): void => {
  const { action } = getStore();

  if (!action) {
    return;
  }

  const tryAddActions = () => {
    addActions(0);
  };

  window.addEventListener("beforeunload", tryAddActions);

  const { history } = window;
  // 劫持pushState
  const oldPushState = history.pushState;
  history.pushState = (state: unknown, unused: string, url: string | URL) => {
    oldPushState.call(history, state, unused, url);
    tryAddActions();
  };
};
