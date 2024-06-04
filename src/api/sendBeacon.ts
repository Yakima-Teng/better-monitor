import { safeStringify } from '@/utils/utils'

/**
 * 即navigator.sendBeacon()方法，可用于通过HTTP将少量数据异步传输到Web服务器
 *
 * @return {boolean} The sendBeacon() method returns true if the user agent successfully queued the data for transfer. Otherwise, it returns false.
 */
const sendBeacon: BetterMonitor.TSendBeacon = (url, jsonData) => {
  if (typeof navigator.sendBeacon === 'function') {
    return navigator.sendBeacon(url, safeStringify(jsonData))
  }
  return false
}

export default sendBeacon
