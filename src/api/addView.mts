import { getStore } from "#scripts/StoreUtils";
import { API_PREFIX } from "#scripts/ConstantUtils";
import { isString } from "#scripts/TypeUtils";
import { axiosRequest, sendBeacon } from "#scripts/RequestUtils";
import { limitStringLength } from "#scripts/StringUtils";
import { getProjectId } from "#scripts/ProjectIdUtils";
import type { RequestItemAddView } from "#types/index";

/**
 * @apiAnalyze
 * 添加PV、UV、BV数据（page view, user view, browser view）
 * @since 0.02
 * @param params {Object} 包含字段`{ pageUrl: string; userId: string |number; }`
 * @return {Promise<void>}
 */
export const addView = (params: RequestItemAddView): void => {
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

  // 获取 projectId
  const projectId = getProjectId();
  if (!projectId) {
    // eslint-disable-next-line no-console
    console.warn("BetterMonitor: Failed to get projectId, skip reporting");
    return;
  }

  // 限制字段长度
  params.p = limitStringLength(params.p, fields.MAX_LENGTH_PAGE_URL);
  params.u = limitStringLength(params.u, fields.MAX_LENGTH_USER_ID);

  // 设置 projectId 和 sdk
  params.pi = projectId;
  params.s = sdk;

  const requestUrl = `${API_PREFIX}view/addView`;
  const stringifyRequestData = JSON.stringify(params);

  // 尝试使用 sendBeacon（同步方式）
  const isQueued = sendBeacon(requestUrl, stringifyRequestData);
  if (isQueued) return;
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
