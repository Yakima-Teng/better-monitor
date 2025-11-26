import { getStore, updateStore } from "#scripts/StoreUtils";

/**
 * Token 缓存有效期（毫秒），默认 1 小时
 */
const TOKEN_CACHE_DURATION = 60 * 60 * 1000;

/**
 * 正在进行的 token 获取 Promise（用于请求去重）
 * 当多个并发请求同时需要获取 token 时，共享同一个 Promise
 */
let pendingTokenPromise: Promise<string> | null = null;

/**
 * 获取项目标识（projectId 或 token）
 * 如果是数字类型，直接返回
 * 如果是函数类型，会异步获取 token 并缓存
 * @returns Promise<number | string> 返回 projectId（数字）或 token（字符串）
 */
export async function getProjectId(): Promise<number | string> {
  const store = getStore();
  const { projectId } = store;

  // 如果是数字，直接返回
  if (typeof projectId === "number") {
    return projectId;
  }

  // 如果是函数，获取 token
  if (typeof projectId === "function") {
    // 检查缓存的 token 是否有效
    const now = Date.now();
    const { _cachedToken, _tokenExpireTime } = store;
    if (_cachedToken && _tokenExpireTime && now < _tokenExpireTime) {
      return _cachedToken;
    }

    // 如果已经有正在进行的 token 获取请求，直接返回同一个 Promise（请求去重）
    if (pendingTokenPromise) {
      try {
        const token = await pendingTokenPromise;
        // 再次检查缓存（可能在等待期间其他请求已经更新了缓存）
        const currentStore = getStore();
        if (currentStore._cachedToken && currentStore._cachedToken === token) {
          return token;
        }
        // 如果缓存不匹配，说明可能有问题，继续执行新的获取流程
      } catch {
        // 如果之前的请求失败，继续执行新的获取流程
        pendingTokenPromise = null;
      }
    }

    // 创建新的 token 获取请求
    const tokenPromise = (async (): Promise<string> => {
      try {
        const token = await projectId();
        if (typeof token !== "string") {
          // eslint-disable-next-line no-console
          console.warn("BetterMonitor: projectId function should return a string token");
          return "";
        }

        const expireTime = Date.now() + TOKEN_CACHE_DURATION;

        // 更新缓存
        updateStore({
          _cachedToken: token,
          _tokenExpireTime: expireTime,
        });

        return token;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("BetterMonitor: Failed to get project token:", error);
        throw error;
      } finally {
        // 清除正在进行的请求标记
        pendingTokenPromise = null;
      }
    })();

    // 保存正在进行的请求
    pendingTokenPromise = tokenPromise;

    try {
      const token = await tokenPromise;
      if (token) {
        return token;
      }
    } catch {
      // 请求失败，继续执行降级策略
    }

    // 如果获取失败，尝试使用缓存的 token（即使已过期）
    const currentStore = getStore();
    if (currentStore._cachedToken) {
      return currentStore._cachedToken;
    }
    return ""; // 返回空字符串，上报时会被后端拒绝
  }

  return "";
}

/**
 * 同步获取项目标识（优先使用缓存）
 * 用于 sendBeacon 等需要同步调用的场景
 * @returns number | string | null 如果无法同步获取则返回 null
 */
export function getProjectIdSync(): number | string | null {
  const { projectId, _cachedToken, _tokenExpireTime } = getStore();

  // 如果是数字，直接返回
  if (typeof projectId === "number") {
    return projectId;
  }

  // 如果是函数，检查是否有有效的缓存 token
  if (typeof projectId === "function") {
    const now = Date.now();
    if (_cachedToken && _tokenExpireTime && now < _tokenExpireTime) {
      return _cachedToken;
    }
    // 即使过期也尝试使用缓存（降级策略）
    if (_cachedToken) {
      return _cachedToken;
    }
    // 没有缓存，无法同步获取，返回 null
    return null;
  }

  return null;
}

/**
 * 清除 token 缓存
 * 用于 token 失效时手动清除缓存
 */
export function clearTokenCache(): void {
  updateStore({
    _cachedToken: undefined,
    _tokenExpireTime: undefined,
  });
}
