import request from '@/api/request'
import { getStore, updateStore } from '@/store'
import sendBeacon from '@/api/sendBeacon'
import { BACKEND_DOMAIN, buildVersion, buildDate } from '@/constant'
import isString from '@/common/isString'
import getLogTime from '@/utils/getLogTime'
import getUserId from '@/utils/getUserId'
import { safeStringify } from '@/utils/utils'
import BetterMonitor from '../../types/better-monitor'

let timerAddActions: number = 0
const clearTimerAddActions = () => {
  if (timerAddActions) {
    clearTimeout(timerAddActions)
    timerAddActions = 0
  }
}

const doAddActions = ({ preferSendBeacon = false }) => {
  const { projectId, queuedActions } = getStore()

  if (queuedActions.length === 0) return

  const requestUrl = `${BACKEND_DOMAIN}/api/verybugs/actions/addActions`
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
  updateStore({ queuedActions: [] })
}
/**
 * 批量上报行为日志
 */
export const addActions: BetterMonitor.TAddActions = (params) => {
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
const addAction: BetterMonitor.TAddAction = (params) => {
  const { blackList, queuedActions } = getStore()
  const { payload, directly } = params

  const matchKeyword = (keyword: string | RegExp): boolean => {
    if (isString(keyword)) {
      return payload.includes(keyword)
    }
    return keyword.test(payload)
  }

  const selfBlackList = ['better-monitor.min.js', 'better-monitor.js']
  if (!location.href.includes('verybugs.com') && selfBlackList.some(matchKeyword)) {
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

const getLogColorByLevel = (level: 'log' | 'warn' | 'error'): string => {
  if (level === 'error') {
    return 'red'
  }
  if (level === 'warn') {
    return 'orange'
  }
  return 'gray'
}

/**
 * @apiAnalyze
 * 打日志的方法（本地开发时如为方便追中调用栈，可以使用console.error代替console.log）
 * @since 0.0.2
 */
const doLog: BetterMonitor.TDoLog = (() => {
  // eslint-disable-next-line no-console
  const rawLog = console.log
  return (level, ...args: any[]) => {
    const time = getLogTime()
    addAction({
      pageUrl: location.href,
      time,
      level,
      payload: safeStringify(args),
      userId: getUserId()
    })
    const store = getStore()
    if (store.debugger) {
      const color = getLogColorByLevel(level)
      return rawLog(`%c[${time}]`, `color:${color};`, ...args)
    }
    return undefined
  }
})()

// 直接上报
const doLogDirectly: BetterMonitor.TDoLog = (() => {
  // eslint-disable-next-line no-console
  const rawLog = console.log
  return (level, ...args: any[]) => {
    const time = getLogTime()
    addAction({
      pageUrl: location.href,
      time,
      level,
      payload: safeStringify(args),
      userId: getUserId(),
      directly: true
    })
    const store = getStore()
    if (store.debugger) {
      const color = getLogColorByLevel(level)
      return rawLog(`%c[${time}]`, `color:${color};`, ...args)
    }
    return undefined
  }
})()

// 打印普通日志
export const printLog: BetterMonitor.TPrintLog = (...args) => {
  return doLog('log', ...args)
}
export const printLogDirectly: BetterMonitor.TPrintLog = (...args) => {
  return doLogDirectly('log', ...args)
}

// 打印警告日志
export const printWarn: BetterMonitor.TPrintWarn = (...args) => {
  return doLog('warn', ...args)
}
export const printWarnDirectly: BetterMonitor.TPrintWarn = (...args) => {
  return doLogDirectly('warn', ...args)
}

// 打印错误日志
export const printError: BetterMonitor.TPrintError = (...args) => {
  return doLog('error', ...args)
}
export const printErrorDirectly: BetterMonitor.TPrintError = (...args) => {
  return doLogDirectly('error', ...args)
}

export const logTime: BetterMonitor.TLogTime = (label) => {
  const { timeLogMap } = getStore()
  const startTime = Date.now()
  timeLogMap.set(label, startTime)
}

export const logTimeEnd: BetterMonitor.TLogTimeEnd = (label) => {
  const { timeLogMap } = getStore()
  const endTime = Date.now()
  const startTime = timeLogMap.get(label)
  if (!startTime) return
  const duration = endTime - startTime
  timeLogMap.delete(label)
  if (duration < 100) {
    printLog(`${label}耗时较快：${duration}ms`)
    return
  }
  printError(`${label}耗时较慢：${(duration / 1000).toFixed(3)}s`)
}

export const logTimeEndDirectly: BetterMonitor.TLogTimeEnd = (label) => {
  const { timeLogMap } = getStore()
  const endTime = Date.now()
  const startTime = timeLogMap.get(label)
  if (!startTime) return
  const duration = endTime - startTime
  timeLogMap.delete(label)
  if (duration < 100) {
    printLogDirectly(`${label}耗时较快：${duration}ms`)
    return
  }
  printErrorDirectly(`${label}耗时较慢：${(duration / 1000).toFixed(3)}s`)
}

export default addAction
