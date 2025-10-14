import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { API_PREFIX } from "#scripts/ConstantUtils";
import { getError } from "#scripts/TypeUtils";
import { cache } from "#scripts/CacheUtils";

const transformRequest = (data: Record<string, string>): string => {
  return JSON.stringify(data);
};
const transformResponse = (data: string): Record<string, string> => {
  return JSON.parse(data);
};

const instance = axios.create({
  baseURL: API_PREFIX,
  timeout: 20000,
  headers: {
    "content-type": "application/json; charset=utf-8",
  },
  transformRequest: [transformRequest],
  transformResponse: [transformResponse],
});
instance.interceptors.request.use(
  async function <D>(
    config: InternalAxiosRequestConfig<D>,
  ): Promise<InternalAxiosRequestConfig<D>> {
    const data = config.data;
    if (data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
  },
  function (error: Error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function <T, D>(response: AxiosResponse<T, D>) {
    return response;
  },
  function (error: any): { data: IResponse<any> } {
    return {
      data: {
        code: error?.response?.data?.code || error?.status || 500,
        data: error?.response?.data?.data || null,
        message: error?.response?.data?.message || error.message,
        timestamp: error?.response?.data?.timestamp || Date.now(),
      },
    };
  },
);

// 传递的类型中D表示入参的类型，T表示返回的data字段的类型
export const axiosRequest = async <D, T>(
  config: AxiosRequestConfig<D>,
  options?: RequestOptions,
): Promise<TRequestResult<T, AxiosResponse<IResponse<T>>>> => {
  try {
    options = options || {};

    const funcPromise = async (): Promise<
      TRequestResult<T, AxiosResponse<IResponse<T>>>
    > => {
      try {
        const response = await instance.request<
          IResponse<T>,
          AxiosResponse<IResponse<T>, D>,
          D
        >(config);
        const data = response.data.data;
        if (response.data.code !== 200) {
          return [new Error(response.data.message), undefined, response];
        }
        return [null, data, response];
      } catch (err) {
        if (axios.isAxiosError<IResponse<T>, D>(err)) {
          return [
            new Error(err.message),
            undefined,
            err.response as AxiosResponse<IResponse<T>>,
          ];
        }
        return [getError(err), undefined, null];
      }
    };

    const cacheOptions = options.cache;
    if (cacheOptions) {
      const { cacheKey, cacheTimeout } = cacheOptions;
      const key = typeof cacheKey === "function" ? cacheKey() : cacheKey;
      return cache(key, cacheTimeout, funcPromise);
    }
    return funcPromise();
  } catch (err) {
    if (axios.isAxiosError<IResponse<T>, D>(err)) {
      return [
        new Error(err.message),
        undefined,
        err.response as AxiosResponse<IResponse<T>>,
      ];
    }
    return [getError(err), undefined, null];
  }
};

export const sendBeacon = (
  url: string,
  jsonData: Record<string, unknown>,
): boolean => {
  if (typeof navigator.sendBeacon === "function") {
    return navigator.sendBeacon(url, JSON.stringify(jsonData));
  }
  return false;
};
