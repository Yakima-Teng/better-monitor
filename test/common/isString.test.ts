import {
  describe, expect, test
} from '@jest/globals'
import isString from '../../src/common/isString'

describe('测试类型判断方法', () => {
  test('判断是否为字符串', () => {
    expect(isString(1)).toBe(false)
    expect(isString({})).toBe(false)
    expect(isString(null)).toBe(false)
    expect(isString('0')).toBe(true)
    expect(isString('')).toBe(true)
    expect(isString([])).toBe(false)
  })
})
