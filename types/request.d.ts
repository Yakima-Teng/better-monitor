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
