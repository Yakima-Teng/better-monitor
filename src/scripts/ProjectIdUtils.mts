import { getStore, updateStore } from "#scripts/StoreUtils";

/**
 * Token 缓存有效期（毫秒），默认 1 小时
 */
const TOKEN_CACHE_DURATION = 60 * 60 * 1000;

/**
 * 获取项目标识（projectId 或 token）
 * 如果是数字类型，直接返回
 * 如果是函数类型，会异步获取 token 并缓存
 * @returns Promise<number | string> 返回 projectId（数字）或 token（字符串）
 */
export async function getProjectId(): Promise<number | string> {
  const { projectId, _cachedToken, _tokenExpireTime } = getStore();

  // 如果是数字，直接返回
  if (typeof projectId === "number") {
    return projectId;
  }

  // 如果是函数，获取 token
  if (typeof projectId === "function") {
    // 检查缓存的 token 是否有效
    const now = Date.now();
    if (_cachedToken && _tokenExpireTime && now < _tokenExpireTime) {
      return _cachedToken;
    }

    // 获取新 token
    try {
      const token = await projectId();
      if (typeof token !== "string") {
        // eslint-disable-next-line no-console
        console.warn("BetterMonitor: projectId function should return a string token");
        return "";
      }

      const expireTime = now + TOKEN_CACHE_DURATION;

      // 更新缓存
      updateStore({
        _cachedToken: token,
        _tokenExpireTime: expireTime,
      });

      return token;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("BetterMonitor: Failed to get project token:", error);
      // 如果获取失败，尝试使用缓存的 token（即使已过期）
      if (_cachedToken) {
        return _cachedToken;
      }
      return ""; // 返回空字符串，上报时会被后端拒绝
    }
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
