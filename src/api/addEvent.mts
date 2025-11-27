import type { RequestItemAddEvent } from "#types/index";
import { getStore } from "#scripts/StoreUtils";
import { limitStringLength } from "#scripts/StringUtils";
import { API_PREFIX } from "#scripts/ConstantUtils";
import { axiosRequest, sendBeacon } from "#scripts/RequestUtils";
import { getProjectId } from "#scripts/ProjectIdUtils";

export const addEvent = (name: string, payload?: object): void => {
  const { sdk, fields } = getStore();

  // 获取 projectId
  const projectId = getProjectId();
  if (!projectId) {
    // eslint-disable-next-line no-console
    console.warn("BetterMonitor: Failed to get projectId, skip reporting");
    return;
  }

  const requestData: RequestItemAddEvent = {
    // projectId (支持 number 或 string token)
    pi: projectId,
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

  const requestUrl = `${API_PREFIX}event/addEvent`;
  const stringifyRequestData = JSON.stringify(requestData);

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
