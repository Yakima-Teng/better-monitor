import getType from '@/common/getType'

/**
 * @apiAnalyze
 * 是否是对象
 * @since 0.02
 * @param val {unknown}
 * @return {boolean}
 */
const isObject: BetterMonitor.TIsObject = (val): val is object => getType(val) === 'object'

export default isObject
