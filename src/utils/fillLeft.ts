/**
 * @apiAnalyze
 * 将一个数字或字符串用指定的字符从左侧开始填充到指定长度
 * @since 0.02
 * @param val {string|number}
 * @param len {number} target length after filling
 * @param symbol {string} used to fill string/number
 * @return {string} string after filling
 *
 * @example
 * ```javascript
 * console.log(fillLeft('a', 2, '$')) // '$a'
 * console.log(fillLeft('aa', 2, '$')) // 'aa'
 * console.log(fillLeft('aaa', 2, '$')) // 'aaa'
 * console.log(fillLeft('aa', 10, '0') // '00000000aa'
 * ```
 */
const fillLeft = (
  val: string | number,
  len: number,
  symbol: string
): string => {
  val = `${val}`
  const diffInLength = len - val.length
  if (diffInLength > 0) {
    for (let i = 0; i < diffInLength; i++) {
      val = symbol + val
    }
  }
  return val
}

export default fillLeft
