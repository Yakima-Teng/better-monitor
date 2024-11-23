/**
 * 获取变量的类型
 * @param val {any} 需要判断类型的变量
 * @return {string} 返回类型字符串，如`"array"`、`"object"`、`"function"`、`"null"`、`"undefined"`、`"string"`、`"number"`、`"boolean"`、`"date"`、`"regexp"`等
 *
 * @example
 *
 * ```javascript
 * console.log(getType({}) // 'object'
 * console.log(getType([]) // 'array'
 * console.log(getType(() => {})) // 'function'
 * console.log(getType(null)) // 'null'
 * console.log(getType(undefined)) // 'undefined'
 * console.log(getType('')) // 'string'
 * console.log(getType(123)) // 'number'
 * console.log(getType(true)) // 'boolean'
 * console.log(getType(new Date())) // 'date'
 * console.log(getType(/^[0-9]{3}/)) // 'regexp'
 * console.log(getType('test')) // 'string'
 * ```
 */

const getType: BetterMonitor.TGetType = (val) => ({}).toString.call(val).slice(8, -1).toLowerCase() as BetterMonitor.TType

export default getType
