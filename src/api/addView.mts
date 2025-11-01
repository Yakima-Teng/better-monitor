import { getStore } from "#scripts/StoreUtils";
import { API_PREFIX } from "#scripts/ConstantUtils";
import { isString } from "#scripts/TypeUtils";
import { axiosRequest, sendBeacon } from "#scripts/RequestUtils";
import { limitStringLength } from "#scripts/StringUtils";

/**
 * @apiAnalyze
 * 添加PV、UV、BV数据（page view, user view, browser view）
 * @since 0.02
 * @param params {Object} 包含字段`{ pageUrl: string; userId: string |number; }`
 * @return {Promise<void>}
 */
export const addView = (params: RequestItemAddView): void => {
  const { blackList } = getStore();
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
  const { fields } = getStore();
  params.p = limitStringLength(params.p, fields.MAX_LENGTH_PAGE_URL);
  params.u = limitStringLength(params.u, fields.MAX_LENGTH_USER_ID);

  const requestUrl = `${API_PREFIX}view/addView`;
  const stringifyRequestData = JSON.stringify(params);
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
