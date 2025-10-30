interface RequestOptions {
  cache?: {
    cacheTimeout: number;
    cacheKey: string | (() => string);
  };
}
type TResponseCode = 200 | 401 | 403 | 404 | 500 | number;
interface IResponse<T> {
  code: TResponseCode;
  data: T;
  message: string;
  timestamp: number;
}
type TRequestResult<T, V> = [Error, undefined, V | null] | [null, T, V];

interface XMLHttpRequestMeta {
  method: string;
  pageUrl: string;
  apiUrl: string;
  params: Record<string, any>;
  timeSend: number;
  body: Record<string, any>;
  timeConsumed: number;
  total: string;
  responseURL: string;
  responseText: string;
  allResponseHeaders: string;
  status: string;
  // 客户端时间戳
  clientTime: number;
}
interface XMLHttpRequestWithMeta extends XMLHttpRequest {
  meta: XMLHttpRequestMeta;
}
