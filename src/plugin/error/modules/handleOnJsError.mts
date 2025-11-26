import { addBug, validateBugRequestData } from "#api/addBug";
import { getStore, getUserId } from "#scripts/StoreUtils";
import type { RequestItemAddBug } from "#types/index";

export const handlerFuncForJsError = (e: ErrorEvent): boolean => {
  try {
    e.preventDefault();

    // 注意：error可能为null
    const { error, colno, lineno, filename, type } = e;
    const message: string = error?.message || e.message;
    const stack = error?.stack || "";
    const userId = getUserId();
    const source = `${filename}:${lineno}行:${colno}列`;
    const { sdk } = getStore();

    const requestData: RequestItemAddBug = {
      pi: "", // 临时值，addBug 内部会异步获取并替换
      s: sdk,
      pu: location.href,
      m: message,
      u: userId,
      st: stack,
      so: source,
      ty: type,
      t: Date.now(),
    };

    if (!validateBugRequestData(requestData)) {
      return true;
    }

    // addBug 现在是异步的，但不阻塞错误处理
    addBug(requestData).catch((err) => {
      // eslint-disable-next-line no-console
      console.error("BetterMonitor: Failed to report error:", err);
    });
    return true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log("catch error by BetterMonitor:");
    // eslint-disable-next-line no-console
    console.error(err);
    return true;
  }
};
