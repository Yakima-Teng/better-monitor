import { axiosRequest, sendBeacon } from "#scripts/RequestUtils";
import { getStore, updateStore } from "#scripts/StoreUtils";
import { API_PREFIX } from "#scripts/ConstantUtils";
import { isString } from "#scripts/TypeUtils";
import { limitStringLength, safeStringify } from "#scripts/StringUtils";

let timerAddActions: number = 0;
const clearTimerAddActions = () => {
  if (timerAddActions) {
    clearTimeout(timerAddActions);
    timerAddActions = 0;
  }
};

const doAddActions = (): void => {
  const { queuedActions } = getStore();

  if (queuedActions.length === 0) {
    return;
  }

  const requestUrl = `${API_PREFIX}action/addActions`;
  const requestData: RequestListData<RequestItemAddAction> = { l: queuedActions };

  const stringifyRequestData = JSON.stringify(requestData);
  const preferSendBeacon = stringifyRequestData.length > 10000;

  let isQueued = false;
  if (preferSendBeacon) {
    isQueued = sendBeacon(requestUrl, stringifyRequestData);
  }
  if (!isQueued) {
    axiosRequest(requestUrl, {
      method: "post",
      headers: {
        "Content-Type": "application/json", // 告诉服务器你发送的是 JSON
      },
      body: stringifyRequestData,
      timeout: 30 * 1000,
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
    });
  }
  updateStore({ queuedActions: [] });
};

/**
 * 批量上报行为日志
 */
export const addActions = (delayTime: number): void => {
  clearTimerAddActions();
  if (!delayTime) {
    doAddActions();
    return;
  }
  timerAddActions = window.setTimeout(doAddActions, delayTime);
};

/**
 * 上报单条行为日志
 */
export const addAction = (params: RequestItemAddAction, directly: boolean): void => {
  const { blackList, queuedActions } = getStore();
  const { p: payload } = params;

  const matchKeyword = (keyword: string | RegExp): boolean => {
    if (isString(keyword)) {
      return payload.includes(keyword);
    }
    return keyword.test(payload);
  };

  const selfBlackList = ["better-monitor.min.js", "better-monitor.js"];
  if (!location.href.includes("verysites.com") && selfBlackList.some(matchKeyword)) {
    return;
  }

  // 黑名单中的日志不需要进行上报
  if (blackList.some(matchKeyword)) {
    return;
  }

  // 限制字段长度
  const { fields } = getStore();
  params.pu = limitStringLength(params.pu, fields.MAX_LENGTH_PAGE_URL);
  params.p = limitStringLength(params.p, fields.MAX_LENGTH_ACTION);
  params.u = limitStringLength(params.u, fields.MAX_LENGTH_USER_ID);

  queuedActions.push(params);
  updateStore({ queuedActions });

  // 如果队列条数超过10条，则立即上报
  if (queuedActions.length > 10) {
    addActions(0);
    return;
  }
  // 如果消息内容较长，也直接上报
  const strActions = safeStringify(queuedActions);
  if (strActions.length > 10000) {
    addActions(0);
    return;
  }
  addActions(directly ? 0 : 300);
};
