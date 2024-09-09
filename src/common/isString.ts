import getType from '@/common/getType'

/**
 * @apiAnalyze
 * 是否是字符串
 * @since 0.02
 * @param val {unknown}
 * @return {boolean}
 */
const isString: BetterMonitor.TIsString = (val): val is string => getType(val) === 'string'

export default isString
