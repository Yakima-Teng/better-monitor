import { getStore, updateStore } from '#scripts/StoreUtils'
import { API_PREFIX } from '#scripts/ConstantUtils'
import { axiosRequest, sendBeacon } from '#scripts/RequestUtils'

export function reportPerformanceLogs(): void {
  const { queuedPerformanceLogs } = getStore()
  if (queuedPerformanceLogs.size === 0) {
    return
  }
  const body = [...queuedPerformanceLogs]

  const { projectId } = getStore()
  const requestUrl = `${API_PREFIX}performance/add`
  const requestData = { projectId, list: body }
  const isQueued = sendBeacon(requestUrl, requestData)
  if (!isQueued) {
    axiosRequest({
      url: requestUrl,
      method: 'post',
      data: requestData,
      timeout: 60 * 1000
    }).catch((err) => {
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
