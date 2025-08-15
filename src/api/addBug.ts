import request from '@/api/request'
import { getStore } from '@/store'
import sendBeacon from '@/api/sendBeacon'
import { BACKEND_DOMAIN, buildDate, buildVersion } from '@/constant'
import isString from '@/common/isString'

// 校验请求参数是否在黑名单中，如果返回false表示在黑名单中，不继续后续上报操作
export const validateBugRequestData = (
  requestData: BetterMonitor.IParamsAddBug
): boolean => {
  const { blackList } = getStore()

  const matchKeyword = (keyword: string | RegExp): boolean => {
    if (isString(keyword)) {
      return (
        requestData.message.includes(keyword)
        || requestData.message.includes(keyword)
        || requestData.stack.includes(keyword)
      )
    }
    return (
      keyword.test(requestData.message)
      || keyword.test(requestData.message)
      || keyword.test(requestData.stack)
    )
  }

  // 当页面不在SDK自身所在项目页面中时，SDK自身的报错不需要上报，否则在上报接口有出错时容易死循环
  const selfBlackList = ['better-monitor.min.js', 'better-monitor.js']
  if (
    !requestData.pageUrl.includes('verysites.com')
    && selfBlackList.some(matchKeyword)
  ) {
    return false
  }
  // 没有具体错误信息，上报也没有意义
  const meaninglessBlackList = ['Script error.']
  if (meaninglessBlackList.some(matchKeyword)) {
    return false
  }
  // 存在有黑名单中关键词的报错信息，不需要上报
  if (blackList.length > 0 && blackList.some(matchKeyword)) {
    return false
  }
  return true
}

/**
 * @apiAnalyze
 * 添加错误上报日志
 * @since 0.02
 * @param params {Object} 包含字段`{ pageUrl: string; errorMessage: string; errorStack: string; json: string }`
 * @return {Promise<void>}
 */
const addBug: BetterMonitor.TAddBug = (params) => {
  const { projectId } = getStore()
  const requestUrl = `${BACKEND_DOMAIN}/api/bugs/bug/addBug`
  const sdk = { buildDate, buildVersion }
  const requestData = { projectId, sdk, ...params }

  const isQueued = sendBeacon(requestUrl, requestData)
  if (isQueued) return
  request<null>(<BetterMonitor.IPayloadRequest>{
    url: requestUrl,
    method: 'post',
    data: requestData,
    timeout: 60 * 1000
  }).catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err)
  })
}

export default addBug
