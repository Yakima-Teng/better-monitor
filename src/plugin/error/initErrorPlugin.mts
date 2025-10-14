import { getStore } from "#scripts/StoreUtils";
import { handlerFuncForJsError } from "#plugin/error/modules/handleOnJsError";
import { handlerFuncForJsUnhandledRejection } from "#plugin/error/modules/handleOnUnhandledRejection";

export const initErrorPlugin = () => {
  const { error } = getStore();

  if (!error) {
    return;
  }

  // 初始化js报错监听器
  window.addEventListener("error", handlerFuncForJsError, {
    capture: false,
    passive: false,
  });
  // 初始化js未处理异常报错监听器
  window.addEventListener(
    "unhandledrejection",
    handlerFuncForJsUnhandledRejection,
    { capture: false, passive: false },
  );
};
