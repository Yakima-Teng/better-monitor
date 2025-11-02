// 一个轻量级的哈希函数，用于处理基础信息
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // 转为32位整数
  }
  return hash.toString(36);
}

export function generateRobustUserId(): string {
  const STORAGE_KEY = "__bm_user_id_v1";

  // 1. 优先从 localStorage 读取已生成的完整 ID
  try {
    const storedId = localStorage.getItem(STORAGE_KEY);
    if (storedId) {
      return storedId;
    }
  } catch {
    // localStorage 不可用，直接视为用户使用的浏览器的隐私模式，尊重用户选择，这里就不上传特异性的值（作为日志SDK，这里可以接收一定程度的误判）
    return "";
  }

  // 2. 收集轻量级的环境特征 (作为“盐”或“前缀”)
  const features = [
    navigator.userAgent?.slice(0, 50) || "", // 取前50字符，避免过长
    navigator.language || "",
    screen.width + "x" + screen.height,
    // 可选：navigator.platform, window.devicePixelRatio
  ].join("|");

  // 3. 对特征进行哈希，得到一个代表设备环境的“指纹”
  const featureHash = simpleHash(features);

  // 4. 生成一个高质量的随机后缀
  let randomSuffix;
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    // 使用加密安全的随机数
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    randomSuffix = array[0].toString(36);
  } else {
    // 降级方案
    randomSuffix = Math.random().toString(36).substr(2, 8);
  }

  // 5. 组合: [特征哈希] + [随机后缀] + [时间戳(可选)]
  const newId = `${featureHash}-${randomSuffix}-${Date.now().toString(36).slice(-4)}`;

  // 6. 尝试持久化这个完整的 ID
  try {
    localStorage.setItem(STORAGE_KEY, newId);
    // 某些浏览器的隐私模式下，存进去的值不一定真地存进去了
    if (localStorage.getItem(STORAGE_KEY) === newId) {
      return newId;
    }
    // 如果用户使用了隐私模式，尊重用户行为，直接用空字符串
    return "";
  } catch {
    // 有可能是存储空间不够了，页可能是默写浏览器的隐私模式，这些情况直接返回空字符串
    return "";
  }
}
