import { axiosRequest, sendBeacon } from "#scripts/RequestUtils";
import { getStore } from "#scripts/StoreUtils";
import { API_PREFIX } from "#scripts/ConstantUtils";
import { isString } from "#scripts/TypeUtils";
import { limitStringLength } from "#scripts/StringUtils";
import { getProjectId } from "#scripts/ProjectIdUtils";
import type { RequestItemAddBug } from "#types/index";

// 校验请求参数是否在黑名单中，如果返回false表示在黑名单中，不继续后续上报操作
export const validateBugRequestData = (requestData: RequestItemAddBug): boolean => {
  const { m: message, st: stack, pu: pageUrl } = requestData;
  const { blackList } = getStore();

  const matchKeyword = (keyword: string | RegExp): boolean => {
    if (isString(keyword)) {
      return message.includes(keyword) || message.includes(keyword) || stack.includes(keyword);
    }
    return keyword.test(message) || keyword.test(message) || keyword.test(stack);
  };

  // 当页面不在SDK自身所在项目页面中时，SDK自身的报错不需要上报，否则在上报接口有出错时容易死循环
  const selfBlackList = ["better-monitor.min.js", "better-monitor.js"];
  if (!pageUrl.includes("verysites.com") && selfBlackList.some(matchKeyword)) {
    return false;
  }
  // 没有具体错误信息，上报也没有意义
  const meaninglessBlackList = ["Script error."];
  if (meaninglessBlackList.some(matchKeyword)) {
    return false;
  }
  // 存在有黑名单中关键词的报错信息，不需要上报
  if (blackList.length > 0 && blackList.some(matchKeyword)) {
    return false;
  }
  return true;
};

/**
 * @apiAnalyze
 * 添加错误上报日志
 * @since 0.02
 * @param params {Object} 包含字段`{ pageUrl: string; errorMessage: string; errorStack: string; json: string }`
 * @return {Promise<void>}
 */
export const addBug = (params: RequestItemAddBug): void => {
  const requestUrl = `${API_PREFIX}bug/addBug`;
  const { sdk, fields } = getStore();

  // 限制字段长度
  params.pu = limitStringLength(params.pu, fields.MAX_LENGTH_PAGE_URL);
  params.m = limitStringLength(params.m, fields.MAX_LENGTH_MESSAGE);
  params.u = limitStringLength(params.u, fields.MAX_LENGTH_USER_ID);
  if (params.so.length + params.s.length + params.ty.length > fields.MAX_LENGTH_JSON) {
    params.so = limitStringLength(params.so, fields.MAX_LENGTH_JSON - params.s.length - params.ty.length);
  }

  // 获取 projectId
  const projectId = getProjectId();
  if (!projectId) {
    // eslint-disable-next-line no-console
    console.warn("BetterMonitor: Failed to get projectId, skip reporting");
    return;
  }

  // 构建完整的请求数据
  const requestData: RequestItemAddBug = {
    ...params,
    pi: projectId,
    s: sdk,
  };

  const stringifyRequestData = JSON.stringify(requestData);

  // 尝试使用 sendBeacon（同步方式）
  const isQueued = sendBeacon(requestUrl, stringifyRequestData);
  if (isQueued) return;

  // 使用 fetch/axiosRequest（异步方式）
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
