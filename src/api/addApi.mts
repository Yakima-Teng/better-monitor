import { axiosRequest, sendBeacon } from "#scripts/RequestUtils";
import { getStore, updateStore } from "#scripts/StoreUtils";
import { API_PREFIX } from "#scripts/ConstantUtils";
import { isString } from "#scripts/TypeUtils";
import { limitStringLength } from "#scripts/StringUtils";
import { getProjectId } from "#scripts/ProjectIdUtils";
import type { RequestItemAddApi, RequestListData } from "#types/index";

/**
 * 批量上报接口日志
 */
export const addApis = async (): Promise<void> => {
  const { queuedApis } = getStore();

  if (queuedApis.length === 0) return;

  // 确保所有队列中的数据都有有效的 projectId
  const validApis = queuedApis.filter((api) => api.pi !== undefined && api.pi !== null && api.pi !== "");
  if (validApis.length === 0) {
    updateStore({ queuedApis: [] });
    return;
  }

  const requestUrl = `${API_PREFIX}api/addApis`;
  const requestData: RequestListData<RequestItemAddApi> = { l: validApis };
  const stringifyRequestData = JSON.stringify(requestData);
  const isQueued = sendBeacon(requestUrl, stringifyRequestData);
  if (!isQueued) {
    axiosRequest(requestUrl, {
      method: "post",
      headers: {
        "Content-Type": "application/json", // 告诉服务器你发送的是 JSON
      },
      body: stringifyRequestData,
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
  const { blackList, queuedApis, sdk, fields } = getStore();
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

  // 获取 projectId
  const projectId = getProjectId();
  if (!projectId) {
    // eslint-disable-next-line no-console
    console.warn("BetterMonitor: Failed to get projectId, skip reporting");
    return;
  }

  // 对上报字段长度进行限制
  params.pu = limitStringLength(params.pu, fields.MAX_LENGTH_PAGE_URL);
  params.au = limitStringLength(params.au, fields.MAX_LENGTH_API_URL);
  params.u = limitStringLength(params.u, fields.MAX_LENGTH_USER_ID);
  params.m = limitStringLength(params.m, fields.MAX_LENGTH_HTTP_METHOD);
  params.st = limitStringLength(params.st, fields.MAX_LENGTH_HTTP_STATUS);
  params.rh = limitStringLength(params.rh, fields.MAX_LENGTH_RESPONSE_HEADERS);
  if (params.pa.length + params.da.length > fields.MAX_LENGTH_API_PAYLOAD) {
    const ratio = fields.MAX_LENGTH_API_PAYLOAD / (params.pa.length + params.da.length);
    params.pa = limitStringLength(params.pa, Math.floor(params.pa.length * ratio) - 1);
    params.da = limitStringLength(params.da, Math.floor(params.da.length * ratio) - 1);
  }

  // 设置 projectId 和 sdk
  params.pi = projectId;
  params.s = sdk;

  queuedApis.push(params);
  updateStore({ queuedApis });

  if (getStore().queuedApis.length > 5) {
    addApis().catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
  }
};
