import request from '@/api/request'
import { getStore, updateStore } from '@/store'
import sendBeacon from '@/api/sendBeacon'
import { BACKEND_DOMAIN } from '@/constant'
import isString from '@/common/isString'

/**
 * 批量上报接口日志
 */
export const addLogs: BetterMonitor.TAddLogs = () => {
  const { projectId, queuedLogs } = getStore()

  if (queuedLogs.length === 0) return

  const requestUrl = `${BACKEND_DOMAIN}/api/verybugs/logs/addLogs`
  const requestData = { projectId, list: queuedLogs }
  const isQueued = sendBeacon(requestUrl, requestData)
  if (!isQueued) {
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
  updateStore({ queuedLogs: [] })
}

/**
 * @apiAnalyze
 * 添加接口上报日志
 * @since 0.02
 * @param params {Object} 包含字段`{ pageUrl: string; apiUrl: string; payload: string; response: string; json: string; }`
 * @return {Promise<void>}
 */
const addLog: BetterMonitor.TAddLog = (params) => {
  const { blackList, queuedLogs } = getStore()
  const { apiUrl } = params

  const matchKeyword = (keyword: string | RegExp): boolean => {
    if (isString(keyword)) {
      return apiUrl.includes(keyword)
    }
    return keyword.test(apiUrl)
  }

  const selfBlackList = ['api.verysites.com']
  if (!location.href.includes('verybugs.com') && selfBlackList.some(matchKeyword)) {
    return
  }

  // 黑名单中的接口请求不需要进行上报
  if (blackList.some(matchKeyword)) {
    return
  }

  queuedLogs.push(params)
  updateStore({ queuedLogs })

  if (getStore().queuedLogs.length > 5) {
    addLogs()
  }
}

export default addLog
