import { axiosRequest, sendBeacon } from "#scripts/RequestUtils";
import { getStore, updateStore } from "#scripts/StoreUtils";
import { API_PREFIX } from "#scripts/ConstantUtils";
import { isString } from "#scripts/TypeUtils";

/**
 * 批量上报接口日志
 */
export const addApis = (): void => {
  const { projectId, queuedLogs } = getStore();

  if (queuedLogs.length === 0) return;

  const requestUrl = `${API_PREFIX}/api/addApis`;
  const requestData = { projectId, list: queuedLogs };
  const isQueued = sendBeacon(requestUrl, requestData);
  if (!isQueued) {
    axiosRequest({
      url: requestUrl,
      method: "post",
      data: requestData,
      timeout: 60 * 1000,
    }).catch((err: any) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
  }
  updateStore({ queuedLogs: [] });
};

/**
 * @apiAnalyze
 * 添加接口上报日志
 * @since 0.02
 * @param params {Object} 包含字段`{ pageUrl: string; apiUrl: string; payload: string; response: string; json: string; }`
 * @return {Promise<void>}
 */
export const addApi = (params: ParamsAddApi): void => {
  const { blackList, queuedLogs } = getStore();
  const { apiUrl } = params;

  const matchKeyword = (keyword: string | RegExp): boolean => {
    if (isString(keyword)) {
      return apiUrl.includes(keyword);
    }
    return keyword.test(apiUrl);
  };

  const selfBlackList = ["cdn.verysites.com"];
  if (!location.href.includes("verysites.com") && selfBlackList.some(matchKeyword)) {
    return;
  }

  // 黑名单中的接口请求不需要进行上报
  if (blackList.some(matchKeyword)) {
    return;
  }

  queuedLogs.push(params);
  updateStore({ queuedLogs });

  if (getStore().queuedLogs.length > 5) {
    addApis();
  }
};
