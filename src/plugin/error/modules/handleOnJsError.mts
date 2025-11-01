import { addBug, validateBugRequestData } from "#api/addBug";
import { getStore, getUserId } from "#scripts/StoreUtils";

export const handlerFuncForJsError = async (e: ErrorEvent): Promise<boolean> => {
  try {
    e.preventDefault();

    // 注意：error可能为null
    const { error, colno, lineno, filename, type } = e;
    const message: string = error?.message || e.message;
    const stack = error?.stack || "";
    const userId = getUserId();
    const source = `${filename}:${lineno}行:${colno}列`;
    const { projectId, sdk } = getStore();

    const requestData: RequestItemAddBug = {
      pi: projectId,
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
