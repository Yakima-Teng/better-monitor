/**
 * @apiAnalyze
 * 解析url中的查询字符串为一个对象
 * @since 0.0.2
 * @param url {string} the url, usually got from window.location.href
 * @return {string} the value of specified query parameter
 *
 * @example
 * ```javascript
 * parseSearchString('http://www.baidu.com?a=1&b=c') // { a: '1', b: 'c' }
 * ```
 */
export const parseSearchString = (url: string): Record<string, string> => {
  let urlInstance: URL;
  if (url.startsWith("http")) {
    urlInstance = new URL(url);
  } else if (url.startsWith("/")) {
    urlInstance = new URL(`${location.origin}${url}`);
  } else {
    urlInstance = new URL(url, location.href);
  }
  const { searchParams } = urlInstance;
  const returnObj = Object.create(null);
  searchParams.forEach((val, key) => {
    returnObj[key] = val;
  });
  return returnObj;
};
