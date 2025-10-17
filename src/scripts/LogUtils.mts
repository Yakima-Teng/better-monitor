import { getStore, getUserId } from "#scripts/StoreUtils";
import { addAction } from "#api/addAction";
import { fillLeft, safeStringify } from "#scripts/StringUtils";

const toDouble = (num: number | string) => {
  return fillLeft(num, 2, "0");
};

const getLogTime = (date?: Date): string => {
  const objDate = date || new Date();
  const year = objDate.getFullYear();
  const month = toDouble(objDate.getMonth() + 1);
  const day = toDouble(objDate.getDate());
  const hour = toDouble(objDate.getHours());
  const min = toDouble(objDate.getMinutes());
  const seconds = toDouble(objDate.getSeconds());
  const milliseconds = objDate.getMilliseconds();
  return `${year}-${month}-${day} ${hour}:${min}:${seconds}.${milliseconds}`;
};

const getLogColorByLevel = (level: LogLevel): string => {
  if (level === "error") {
    return "red";
  }
  if (level === "warn") {
    return "orange";
  }
  return "gray";
};

/**
 * @apiAnalyze
 * 打日志的方法（本地开发时如为方便追中调用栈，可以使用console.error代替console.log）
 * @since 0.0.2
 */
const doLog: FuncLog = (() => {
  // eslint-disable-next-line no-console
  const rawLog = console.log;
  return async (level: LogLevel, ...args: unknown[]): Promise<void> => {
    const date = new Date();
    const timeStr = getLogTime(date);
    const userId = getUserId();
    addAction({
      pageUrl: location.href,
      time: date.getTime(),
      level,
      payload: safeStringify(args),
      userId,
    });
    const store = getStore();
    if (store.debugger) {
      const color = getLogColorByLevel(level);
      return rawLog(`%c[${timeStr}]`, `color:${color};`, ...args);
    }
    return undefined;
  };
})();

// 直接上报
const doLogDirectly: FuncLog = (() => {
  // eslint-disable-next-line no-console
  const rawLog = console.log;
  return async (level: LogLevel, ...args: unknown[]) => {
    const date = new Date();
    const timeStr = getLogTime(date);
    addAction({
      pageUrl: location.href,
      time: date.getTime(),
      level,
      payload: safeStringify(args),
      userId: getUserId(),
      directly: true,
    });
    const store = getStore();
    if (store.debugger) {
      const color = getLogColorByLevel(level);
      return rawLog(`%c[${timeStr}]`, `color:${color};`, ...args);
    }
    return undefined;
  };
})();

// 打印普通日志
export const printLog = (...args: unknown[]): Promise<void> => {
  return doLog("log", ...args);
};
export const printLogDirectly = (...args: unknown[]): Promise<void> => {
  return doLogDirectly("log", ...args);
};

// 打印警告日志
export const printWarn = (...args: unknown[]): Promise<void> => {
  return doLog("warn", ...args);
};
export const printWarnDirectly = (...args: unknown[]): Promise<void> => {
  return doLogDirectly("warn", ...args);
};

// 打印错误日志
export const printError = (...args: unknown[]): Promise<void> => {
  return doLog("error", ...args);
};
export const printErrorDirectly = (...args: unknown[]): Promise<void> => {
  return doLogDirectly("error", ...args);
};

export const logTime = (label: string): void => {
  const { timeLogMap } = getStore();
  const startTime = Date.now();
  timeLogMap.set(label, startTime);
};

export const logTimeEnd = async (label: string): Promise<void> => {
  const { timeLogMap } = getStore();
  const endTime = Date.now();
  const startTime = timeLogMap.get(label);
  if (!startTime) return;
  const duration = endTime - startTime;
  timeLogMap.delete(label);
  if (duration < 100) {
    await printLog(`${label}耗时较快：${duration}ms`);
    return;
  }
  await printError(`${label}耗时较慢：${(duration / 1000).toFixed(3)}s`);
};

export const logTimeEndDirectly = async (label: string): Promise<void> => {
  const { timeLogMap } = getStore();
  const endTime = Date.now();
  const startTime = timeLogMap.get(label);
  if (!startTime) return;
  const duration = endTime - startTime;
  timeLogMap.delete(label);
  if (duration < 100) {
    await printLogDirectly(`${label}耗时较快：${duration}ms`);
    return;
  }
  await printErrorDirectly(`${label}耗时较慢：${(duration / 1000).toFixed(3)}s`);
};
