import { axiosRequest, sendBeacon } from "#scripts/RequestUtils";
import { getStore, updateStore } from "#scripts/StoreUtils";
import { API_PREFIX } from "#scripts/ConstantUtils";
import { isString } from "#scripts/TypeUtils";

/**
 * 批量上报接口日志
 */
export const addApis = (): void => {
  const { queuedApis } = getStore();

  if (queuedApis.length === 0) return;

  const requestUrl = `${API_PREFIX}api/addApis`;
  const requestData: RequestListData<RequestItemAddApi> = { l: queuedApis };
  const isQueued = sendBeacon(requestUrl, JSON.stringify(requestData));
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
  updateStore({ queuedApis: [] });
};

/**
 * @apiAnalyze
 * 添加接口上报日志
 * @since 0.02
 * @param params {Object} 包含字段`{ pageUrl: string; apiUrl: string; payload: string; response: string; json: string; }`
 * @return {Promise<void>}
 */
export const addApi = (params: RequestItemAddApi): void => {
  const { blackList, queuedApis } = getStore();
  const { au: apiUrl } = params;

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

  queuedApis.push(params);
  updateStore({ queuedApis });

  if (getStore().queuedApis.length > 5) {
    addApis();
  }
};
