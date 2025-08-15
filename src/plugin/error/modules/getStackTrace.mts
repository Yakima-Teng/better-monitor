export const getStackTrace = (): string => {
  const obj = {}
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (window.Error && window.Error.captureStackTrace) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.Error.captureStackTrace(obj, getStackTrace)
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const stackStr = obj.stack || ''
  return stackStr
    .split('\n')
    .map((line: string) => line.replace(/(^\s+)|(\s+$)/g, ''))
    .join('\n')
}
