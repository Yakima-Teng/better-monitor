import addBug, { validateBugRequestData } from '@/api/addBug'

export const handlerFuncForJsError = (e: ErrorEvent) => {
  // eslint-disable-next-line no-console
  console.error(e)
  try {
    e.preventDefault()

    // 注意：error可能为null
    const {
      error, colno, lineno, filename, type
    } = e
    const message: string = error?.message || e.message
    const stack = error?.stack || ''

    const requestData = {
      pageUrl: location.href,
      message,
      stack,
      source: `${filename}:${lineno}行:${colno}列`,
      type
    }

    if (!validateBugRequestData(requestData)) {
      return true
    }

    addBug(requestData)
    return true
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('catch error by BetterMonitor:')
    // eslint-disable-next-line no-console
    console.log(err)
    return true
  }
}
