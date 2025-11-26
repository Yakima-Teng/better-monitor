import { getStore } from "#scripts/StoreUtils";
import { API_PREFIX } from "#scripts/ConstantUtils";
import { isString } from "#scripts/TypeUtils";
import { axiosRequest, sendBeacon } from "#scripts/RequestUtils";
import { limitStringLength } from "#scripts/StringUtils";
import { getProjectId, getProjectIdSync } from "#scripts/ProjectIdUtils";
import type { RequestItemAddView } from "#types/index";

/**
 * @apiAnalyze
 * 添加PV、UV、BV数据（page view, user view, browser view）
 * @since 0.02
 * @param params {Object} 包含字段`{ pageUrl: string; userId: string |number; }`
 * @return {Promise<void>}
 */
export const addView = async (params: RequestItemAddView): Promise<void> => {
  const { blackList, sdk, fields } = getStore();
  const { p: pageUrl } = params;

  const matchKeyword = (keyword: string | RegExp): boolean => {
    if (isString(keyword)) {
      return pageUrl.includes(keyword);
    }
    return keyword.test(pageUrl);
  };

  // 黑名单中的接口请求不需要进行上报
  if (blackList.some(matchKeyword)) {
    return;
  }

  // 限制字段长度
  params.p = limitStringLength(params.p, fields.MAX_LENGTH_PAGE_URL);
  params.u = limitStringLength(params.u, fields.MAX_LENGTH_USER_ID);

  // 先尝试同步获取 projectId（用于 sendBeacon）
  let projectId = getProjectIdSync();

  if (projectId) {
    // 同步获取成功，立即使用 sendBeacon
    params.pi = projectId;
    params.s = sdk;
    const requestUrl = `${API_PREFIX}view/addView`;
    const stringifyRequestData = JSON.stringify(params);
    const isQueued = sendBeacon(requestUrl, stringifyRequestData);
    if (isQueued) return;
  }

  // 同步获取失败或 sendBeacon 失败，异步获取 projectId 并使用 axiosRequest
  projectId = await getProjectId();
  if (!projectId) {
    // eslint-disable-next-line no-console
    console.warn("BetterMonitor: Failed to get projectId, skip reporting");
    return;
  }

  // 设置 projectId 和 sdk
  params.pi = projectId;
  params.s = sdk;

  const requestUrl = `${API_PREFIX}view/addView`;
  const stringifyRequestData = JSON.stringify(params);
  axiosRequest(requestUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/json", // 告诉服务器你发送的是 JSON
    },
    body: stringifyRequestData,
    timeout: 60 * 1000,
  }).catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
  });
};
