import { addApis, addApi } from "#api/addApi";
import { parseSearchString } from "#scripts/UrlUtils";
import { getStore, getUserId } from "#scripts/StoreUtils";
import type { XMLHttpRequestMeta, XMLHttpRequestWithMeta } from "#types/index";

export const initApiPlugin = () => {
  const { api } = getStore();

  if (!api) {
    return;
  }

  window.addEventListener("beforeunload", addApis);

  const nativeAjaxOpen = XMLHttpRequest.prototype.open;
  const nativeAjaxSend = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.open = function (
    method: string,
    url: string,
    async?: boolean,
    user?: null | string,
    password?: null | string,
  ): void {
    const xhrInstance = this as XMLHttpRequestWithMeta;
    xhrInstance.meta = {
      method,
      pageUrl: location.href,
      apiUrl: url.startsWith("http") ? url : `${location.origin}${url}`,
      params: parseSearchString(url),
      timeSend: 0,
      body: {},
      timeConsumed: 0,
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
    const xhrInstance = this as XMLHttpRequestWithMeta;
    const { meta } = xhrInstance;

    const tempObj: Pick<XMLHttpRequestMeta, "timeSend" | "body"> = {
      timeSend: Date.now(),
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
        timeConsumed: timeLoadEnd - meta.timeSend,
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

      const { sdk } = getStore();
      addApi({
        pi: "", // 临时值，addApi 内部会获取并替换
        s: sdk,
        t: meta.clientTime,
        pu: meta.pageUrl,
        au: meta.responseURL || meta.apiUrl,
        r: meta.responseText,
        u: getUserId(),
        pa: JSON.stringify(meta.params),
        da: JSON.stringify(meta.body),
        m: meta.method,
        st: meta.status,
        tc: meta.timeConsumed,
        rh: meta.allResponseHeaders,
      });
    });

    return nativeAjaxSend.apply(this, [typeof body === "undefined" ? null : body]);
  };
};
