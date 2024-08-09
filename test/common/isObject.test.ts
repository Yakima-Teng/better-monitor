import {
  describe, expect, test
} from '@jest/globals'
import isObject from '../../src/common/isObject'

describe('测试类型判断方法', () => {
  test('判断是否为对象', () => {
    expect(isObject(1)).toBe(false)
    expect(isObject({})).toBe(true)
    expect(isObject(null)).toBe(false)
    expect(isObject([])).toBe(false)
  })
})
