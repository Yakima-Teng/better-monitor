import { getStore, updateStore } from '@/store'
import { BACKEND_DOMAIN } from '@/constant'
import sendBeacon from '@/api/sendBeacon'
import request from '@/api/request'
import { Metric } from 'web-vitals'

export function reportPerformanceLogs() {
  const { queuedPerformanceLogs } = getStore()
  if (queuedPerformanceLogs.size === 0) {
    return
  }
  const body = [...queuedPerformanceLogs]

  const { projectId } = getStore()
  const requestUrl = `${BACKEND_DOMAIN}/api/verybugs/performance/add`
  const requestData = { projectId, list: body }
  const isQueued = sendBeacon(requestUrl, requestData)
  if (!isQueued) {
    request<null>(<BetterMonitor.IPayloadRequest>{
      url: requestUrl,
      method: 'post',
      data: requestData,
      timeout: 60 * 1000
    })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
      })
  }

  queuedPerformanceLogs.clear()
  updateStore({ queuedPerformanceLogs })
}

export function addPerformanceLog(metric: Metric): void {
  if (!['navigate', 'reload'].includes(metric.navigationType)) {
    return
  }
  const { queuedPerformanceLogs } = getStore()
  queuedPerformanceLogs.add({
    name: metric.name,
    rating: metric.rating,
    value: metric.value,
    navigationType: metric.navigationType,
    pageUrl: location.href
  })
  updateStore({ queuedPerformanceLogs })
  if (window.requestIdleCallback) {
    window.requestIdleCallback(reportPerformanceLogs)
  }
}
