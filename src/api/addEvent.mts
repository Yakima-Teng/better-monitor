import type { RequestItemAddEvent } from "#types/index";
import { getStore } from "#scripts/StoreUtils";
import { limitStringLength } from "#scripts/StringUtils";
import { API_PREFIX } from "#scripts/ConstantUtils";
import { axiosRequest, sendBeacon } from "#scripts/RequestUtils";
import { getProjectId, getProjectIdSync } from "#scripts/ProjectIdUtils";

export const addEvent = async (name: string, payload?: object): Promise<void> => {
  const { sdk, fields } = getStore();

  const requestData: RequestItemAddEvent = {
    // projectId (支持 number 或 string token) - 稍后设置
    pi: "",
    // sdk
    s: sdk,
    // pageUrl
    pu: location.href,
    // event name
    n: name,
    // event payload
    p: JSON.stringify(payload || {}),
    // time
    t: Date.now(),
  };

  // 限制字段长度
  requestData.pu = limitStringLength(requestData.pu, fields.MAX_LENGTH_PAGE_URL);
  requestData.n = limitStringLength(requestData.n, fields.MAX_LENGTH_EVENT_NAME);
  requestData.p = limitStringLength(requestData.p, fields.MAX_LENGTH_EVENT_PAYLOAD);

  // 先尝试同步获取 projectId（用于 sendBeacon）
  let projectId = getProjectIdSync();

  if (projectId) {
    // 同步获取成功，立即使用 sendBeacon
    requestData.pi = projectId;
    const requestUrl = `${API_PREFIX}event/addEvent`;
    const stringifyRequestData = JSON.stringify(requestData);
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

  requestData.pi = projectId;
  const requestUrl = `${API_PREFIX}event/addEvent`;
  const stringifyRequestData = JSON.stringify(requestData);
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
