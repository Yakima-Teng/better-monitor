import { addBug, validateBugRequestData } from "#api/addBug";
import { getStackTrace } from "#plugin/error/modules/getStackTrace";
import { getUserId } from "#scripts/StoreUtils";

export const handlerFuncForJsUnhandledRejection = async (
  e: PromiseRejectionEvent,
): Promise<boolean> => {
  // eslint-disable-next-line no-console
  console.error(e);
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
    const userId = await getUserId();

    const requestData = {
      pageUrl: location.href,
      message,
      stack: stack.substring(0, 2000),
      source: "",
      type,
      userId,
    };

    if (!validateBugRequestData(requestData)) {
      return true;
    }

    addBug(requestData);
    return true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return true;
  }
};
