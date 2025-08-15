import { axiosRequest, sendBeacon } from '#scripts/RequestUtils'
import { getStore, updateStore } from '#scripts/StoreUtils'
import {buildVersion, buildDate, API_PREFIX } from '#scripts/ConstantUtils'
import { isString } from '#scripts/TypeUtils'
import { safeStringify } from '#scripts/StringUtils'

let timerAddActions: number = 0
const clearTimerAddActions = () => {
  if (timerAddActions) {
    clearTimeout(timerAddActions)
    timerAddActions = 0
  }
}

const doAddActions = ({ preferSendBeacon = false }: ParamsDoAddActions): void => {
  const { projectId, queuedActions } = getStore()

  if (queuedActions.length === 0) {
    return
  }

  const requestUrl = `${API_PREFIX}action/addActions`
  const sdk = {
    buildDate,
    buildVersion
  }
  const requestData = { projectId, sdk, list: queuedActions }
  let isQueued = false
  if (preferSendBeacon) {
    isQueued = sendBeacon(requestUrl, requestData)
  }
  if (!isQueued) {
    axiosRequest({
      url: requestUrl,
      method: 'post',
      data: requestData,
      timeout: 30 * 1000
    }).catch((err) => {
      throw err
    })
  }
  updateStore({ queuedActions: [] })
}

/**
 * 批量上报行为日志
 */
export const addActions = (params: ParamsAddActions): void => {
  const { preferSendBeacon, delayTime = 0 } = params
  clearTimerAddActions()
  if (!delayTime) {
    doAddActions({ preferSendBeacon })
    return
  }
  timerAddActions = window.setTimeout(() => {
    doAddActions({ preferSendBeacon })
  }, delayTime)
}

/**
 * 上报单条行为日志
 */
export const addAction = (params: ParamsAddAction): void => {
  const { blackList, queuedActions } = getStore()
  const { payload, directly } = params

  const matchKeyword = (keyword: string | RegExp): boolean => {
    if (isString(keyword)) {
      return payload.includes(keyword)
    }
    return keyword.test(payload)
  }

  const selfBlackList = ['better-monitor.min.js', 'better-monitor.js']
  if (
    !location.href.includes('verysites.com')
    && selfBlackList.some(matchKeyword)
  ) {
    return
  }

  // 黑名单中的日志不需要进行上报
  if (blackList.some(matchKeyword)) {
    return
  }

  if (params.payload.length > 2000) {
    params.payload = params.payload.substring(0, 2000)
  }
  queuedActions.push(params)
  updateStore({ queuedActions })

  if (queuedActions.length > 10) {
    addActions({ preferSendBeacon: false, delayTime: 0 })
    return
  }
  if (directly) {
    addActions({ preferSendBeacon: false, delayTime: 300 })
    return
  }
  try {
    const strActions = safeStringify(queuedActions)
    if (strActions.length > 10000) {
      addActions({ preferSendBeacon: false, delayTime: 0 })
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('部分日志因JSON.stringify失败导致无法上传', e)
  }
}
