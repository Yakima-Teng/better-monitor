import getType from '@/common/getType'

/**
 * @apiAnalyze
 * 是否是函数
 * @since 0.02
 * @param val {unknown}
 * @return {boolean}
 */
const isFunction: BetterMonitor.TIsFunction = (
  val
): val is (...args: any[]) => any => getType(val) === 'function'

export default isFunction
