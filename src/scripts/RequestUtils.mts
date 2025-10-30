export const sendBeacon = (url: string, jsonString: string): boolean => {
  if (typeof navigator.sendBeacon === "function") {
    // 请求接口以Beacon结尾，方便服务端判断是否为sendBeacon发起的ping请求（依赖服务端判断content-type为text/plain和accept为*/*等特征并不稳妥，因为非ping请求也能带这些特征）
    return navigator.sendBeacon(`${url}Beacon`, jsonString);
  }
  return false;
};

// 检查是否支持 fetch（fetch 依赖 Promise）
const isFetchSupported =
  typeof window !== "undefined" && typeof window.fetch !== "undefined" && typeof Promise !== "undefined";

// 对于支持fetch的浏览器，使用 fetch 发送请求
async function fetchRequest<T = unknown>(url: string, timeout: number, options: RequestOptions = {}): Promise<T> {
  const { withCredentials = false, ...fetchOptions } = options;

  // === 使用 fetch + AbortController 实现 timeout ===
  const controller = typeof AbortController !== "undefined" ? new AbortController() : null;

  const signal = controller?.signal;

  // 设置超时定时器
  let timeoutId: number | null = null;
  if (timeout > 0 && controller) {
    timeoutId = window.setTimeout(() => {
      controller.abort();
    }, timeout);
  }

  try {
    // 使用 fetch
    const credentials =
      withCredentials === true ? "include" : withCredentials === "same-origin" ? "same-origin" : "omit";

    const response = await fetch(url, {
      ...fetchOptions,
      credentials,
      // 传递 signal 以支持中止
      signal,
    });

    // 清除定时器
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return (await response.json()) as T;
    }
    // 非 JSON 响应也尝试返回文本
    const text = await response.text();
    try {
      return JSON.parse(text) as T;
    } catch {
      // 如果不是 JSON，返回原始文本（需调用方处理类型）
      return text as unknown as T;
    }
  } catch (error) {
    // 清除定时器（防止内存泄漏）
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error(`Request timeout after ${timeout}ms`);
      }
    }
    throw error;
  }
}

// 对于不支持fetch的浏览器，降级使用 XMLHttpRequest 发送请求
function legacyRequest<T = unknown>(url: string, timeout: number, options: RequestOptions = {}): Promise<T> {
  const { withCredentials = false, ...fetchOptions } = options;

  return new Promise<T>((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open((fetchOptions.method || "GET").toUpperCase(), url, true);

    // 设置超时
    if (timeout > 0) {
      xhr.timeout = timeout;
    }

    // 设置 withCredentials（仅支持 boolean）
    xhr.withCredentials = withCredentials === true;

    // 设置请求头
    if (fetchOptions.headers) {
      const headers = fetchOptions.headers as Record<string, string>;
      for (const [key, value] of Object.entries(headers)) {
        xhr.setRequestHeader(key, value);
      }
    }

    // 处理响应
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        let data: unknown;
        const contentType = xhr.getResponseHeader("content-type");
        try {
          if (contentType && contentType.includes("application/json")) {
            data = JSON.parse(xhr.responseText);
          } else {
            data = xhr.responseText;
          }
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error(err);
          reject(new Error("Failed to parse response"));
          return;
        }
        resolve(data as T);
      } else {
        reject(new Error(`HTTP Error: ${xhr.status} ${xhr.statusText}`));
      }
    };

    xhr.onerror = () => {
      reject(new Error("Network error"));
    };

    xhr.ontimeout = () => {
      reject(new Error("Request timeout"));
    };

    // 发送 body
    let body: string | null = null;
    if (fetchOptions.body) {
      if (typeof fetchOptions.body === "string") {
        body = fetchOptions.body;
      } else if (fetchOptions.body instanceof FormData) {
        body = fetchOptions.body as unknown as string; // FormData 由浏览器自动处理
      } else {
        body = JSON.stringify(fetchOptions.body);
      }
    }

    xhr.send(body as Document | XMLHttpRequestBodyInit | null | undefined);
  });
}

/**
 * 泛型请求函数
 * @param url 请求地址
 * @param options 请求配置
 * @returns Promise<T> 响应数据（自动 JSON.parse）
 */
export async function axiosRequest<T = unknown>(url: string, options: RequestOptions = {}): Promise<T> {
  const { withCredentials = false, timeout = 0, ...fetchOptions } = options;

  if (isFetchSupported) {
    return await fetchRequest<T>(url, timeout, { withCredentials, ...fetchOptions });
  }
  return legacyRequest<T>(url, timeout, { withCredentials, ...fetchOptions });
}
