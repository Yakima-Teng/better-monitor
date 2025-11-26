import { addBug, validateBugRequestData } from "#api/addBug";
import { getStackTrace } from "#plugin/error/modules/getStackTrace";
import { getStore, getUserId } from "#scripts/StoreUtils";
import type { RequestItemAddBug } from "#types/index";

export const handlerFuncForJsUnhandledRejection = (e: PromiseRejectionEvent): boolean => {
  try {
    e.preventDefault();

    /**
     * reason
     * 可能是字符串，比如promise内部reject('string')时
     * 也可能是一个Error对象（含message和stack），比如promise内部throw了new Error('string')时，或者在promise内部reject(new Error('string'))时
     * 建议业务代码里，reject时都reject出一个Error实例，不要直接reject字符串，这样方便拿stack错误栈信息
     */
    const { reason, type } = e;
    const message = reason?.message || reason || "";
    const stack = reason?.stack || getStackTrace() || "";
    const userId = getUserId();
    const { sdk } = getStore();
    const source = "";

    const requestData: RequestItemAddBug = {
      pi: "", // 临时值，addBug 内部会异步获取并替换
      s: sdk,
      pu: location.href,
      m: message,
      st: stack,
      so: source,
      ty: type,
      u: userId,
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
    console.log(err);
    return true;
  }
};
