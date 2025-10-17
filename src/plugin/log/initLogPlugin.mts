import { addApis, addApi } from "#api/addApi";
import { parseSearchString } from "#scripts/UrlUtils";
import { getStore, getUserId } from "#scripts/StoreUtils";
import { safeStringify } from "#scripts/StringUtils";
import { buildDate, buildVersion } from "#scripts/ConstantUtils";

export const initLogPlugin = () => {
  const { log } = getStore();

  if (!log) {
    return;
  }

  window.addEventListener("beforeunload", addApis);
  window.addEventListener("unload", addApis);

  interface IXMLHttpRequestWithMeta extends XMLHttpRequest {
    meta: {
      method: string;
      pageUrl: string;
      apiUrl: string;
      params: Record<string, any>;
      timeSend: string;
      body: Record<string, any>;
      timeConsumed: string;
      total: string;
      responseURL: string;
      responseText: string;
      allResponseHeaders: string;
      status: string;
      // 客户端时间戳
      clientTime: number;
    };
  }

  const nativeAjaxOpen = XMLHttpRequest.prototype.open;
  const nativeAjaxSend = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.open = function (
    method: string,
    url: string,
    async?: boolean,
    user?: null | string,
    password?: null | string,
  ): void {
    const xhrInstance = this as IXMLHttpRequestWithMeta;
    xhrInstance.meta = {
      method,
      pageUrl: location.href,
      apiUrl: url.startsWith("http") ? url : `${location.origin}${url}`,
      params: parseSearchString(url),
      timeSend: "",
      body: {},
      timeConsumed: "",
      total: "",
      responseURL: "",
      responseText: "",
      allResponseHeaders: "",
      status: "",
      clientTime: Date.now(),
    };
    return nativeAjaxOpen.apply(this, [
      method,
      url,
      typeof async === "undefined" ? true : async,
      typeof user === "string" ? user : null,
      typeof password === "string" ? password : null,
    ]);
  };

  XMLHttpRequest.prototype.send = function (body?: Document | XMLHttpRequestBodyInit | null | undefined): void {
    const xhrInstance = this as IXMLHttpRequestWithMeta;
    const { meta } = xhrInstance;

    const tempObj = {
      timeSend: `${Date.now()}`,
      body: {},
    };
    if (typeof body === "string") {
      try {
        tempObj.body = JSON.parse(body);
      } catch (err: any) {
        // eslint-disable-next-line no-console
        console.log("JSON.parse(body) error:", err);
      }
    }
    Object.assign(meta, tempObj);

    xhrInstance.addEventListener("loadend", (e: ProgressEvent<XMLHttpRequestEventTarget>) => {
      const timeLoadEnd = Date.now();

      Object.assign(meta, {
        timeConsumed: `${timeLoadEnd - +meta.timeSend}`,
        total: `${e.total}`,
        responseText: "",
        status: "",
      });

      /**
       * DOMException: Failed to read the 'responseText' property from 'XMLHttpRequest': The value is only accessible if the object's 'responseType' is '' or 'text' (was 'arraybuffer').
       */
      const { target } = e;
      if (target instanceof XMLHttpRequest) {
        const { responseType, status } = target;
        Object.assign(meta, {
          responseURL: target.responseURL,
          responseText: ["", "text"].includes(responseType) ? target.responseText : responseType,
          allResponseHeaders: target.getAllResponseHeaders(),
          status: `${status}`,
        });
      }

      const sdk = { buildDate, buildVersion };

      addApi({
        pageUrl: meta.pageUrl,
        apiUrl: meta.responseURL || meta.apiUrl,
        payload: safeStringify({
          params: meta.params,
          data: meta.body,
        }),
        time: String(Date.now()),
        response: meta.responseText.substring(0, 5000),
        userId: String(getUserId()),
        json: safeStringify({
          method: meta.method,
          status: meta.status,
          timeConsumed: meta.timeConsumed,
          allResponseHeaders: meta.allResponseHeaders,
          clientTime: meta.clientTime,
          sdk,
        }),
      });
    });

    return nativeAjaxSend.apply(this, [typeof body === "undefined" ? null : body]);
  };
};
