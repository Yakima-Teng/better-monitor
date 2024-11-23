/**
 * @apiAnalyze
 * Get the value of localStorage item of specified key/name
 * @since 0.02
 * @param key {string} the specified key/name of the storage item
 * @return {object | null} value of localStorage item
 *
 * @example
 * ```javascript
 * getLocalStorage('localStorageItemName')
 * ```
 */
const getLocalStorage: BetterMonitor.TGetLocalStorage = (key) => {
  if ('localStorage' in window) {
    const rawVal = window.localStorage.getItem(key)
    if (rawVal) {
      return JSON.parse(decodeURI(rawVal))
    }
    return null
  }
  throw new Error('localStorage is not supported!')
}

export default getLocalStorage
