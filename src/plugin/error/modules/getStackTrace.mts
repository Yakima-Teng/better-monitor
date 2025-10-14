export const getStackTrace = (): string => {
  const obj = {};

  // @ts-ignore
  if (window.Error && window.Error.captureStackTrace) {
    // @ts-ignore
    window.Error.captureStackTrace(obj, getStackTrace);
  }

  // @ts-ignore
  const stackStr = obj.stack || "";
  return stackStr
    .split("\n")
    .map((line: string) => line.replace(/(^\s+)|(\s+$)/g, ""))
    .join("\n");
};
