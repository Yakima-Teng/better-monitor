import request from '@/api/request'
import { getStore } from '@/store'
import sendBeacon from '@/api/sendBeacon'
import { BACKEND_DOMAIN } from '@/constant'
import isString from '@/common/isString'

/**
 * @apiAnalyze
 * 添加PV、UV、BV数据（page view, user view, browser view）
 * @since 0.02
 * @param params {Object} 包含字段`{ pageUrl: string; userId: string |number; }`
 * @return {Promise<void>}
 */
const addView: BetterMonitor.TAddView = (params) => {
  const { projectId, blackList } = getStore()
  const { pageUrl } = params

  const matchKeyword = (keyword: string | RegExp): boolean => {
    if (isString(keyword)) {
      return pageUrl.includes(keyword)
    }
    return keyword.test(pageUrl)
  }

  // 黑名单中的接口请求不需要进行上报
  if (blackList.some(matchKeyword)) {
    return
  }
  const requestUrl = `${BACKEND_DOMAIN}/api/verybugs/view/addView`
  const requestData = { projectId, ...params }
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

export default addView
