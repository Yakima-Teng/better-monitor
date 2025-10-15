import { addBug, validateBugRequestData } from "#api/addBug";
import { getUserId } from "#scripts/StoreUtils";

export const handlerFuncForJsError = async (
  e: ErrorEvent,
): Promise<boolean> => {
  // eslint-disable-next-line no-console
  console.error(e);
  try {
    e.preventDefault();

    // 注意：error可能为null
    const { error, colno, lineno, filename, type } = e;
    const message: string = error?.message || e.message;
    const stack = error?.stack || "";
    const userId = await getUserId();

    const requestData = {
      pageUrl: location.href,
      message,
      stack: stack.substring(0, 2000),
      source: `${filename}:${lineno}行:${colno}列`,
      type,
      userId,
      time: String(Date.now()),
    };

    if (!validateBugRequestData(requestData)) {
      return true;
    }

    addBug(requestData);
    return true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log("catch error by BetterMonitor:");
    // eslint-disable-next-line no-console
    console.error(err);
    return true;
  }
};
