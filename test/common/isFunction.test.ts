import {
  describe, expect, test
} from '@jest/globals'
import isFunction from '../../src/common/isFunction'

describe('测试类型判断方法', () => {
  test('判断是否为函数', () => {
    expect(isFunction(1)).toBe(false)
    expect(isFunction({})).toBe(false)
    expect(isFunction(null)).toBe(false)
    expect(isFunction('0')).toBe(false)
    expect(isFunction('')).toBe(false)
    expect(isFunction([])).toBe(false)
    expect(isFunction([1, 2, 3])).toBe(false)
    expect(isFunction(new Array(3))).toBe(false)
    expect(isFunction(() => {})).toBe(true)
  })
})
