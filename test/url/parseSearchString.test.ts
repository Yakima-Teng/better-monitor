import { describe, expect, test } from '@jest/globals'
import parseSearchString from '../../src/url/parseSearchString'

describe('解析url中的查询字符串为一个对象', () => {
  test('测试有查询字符串的情况', () => {
    expect(parseSearchString('http://www.baidu.com?a=1&b=c')).toEqual({
      a: '1',
      b: 'c'
    })
  })

  test('测试只有一个问号的情况', () => {
    expect(parseSearchString('http://www.baidu.com?')).toEqual({})
  })

  test('测试没有查询字符串的情况', () => {
    expect(parseSearchString('http://www.baidu.com/#/path?c=d')).toEqual({})
  })
})
