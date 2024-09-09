import addView from '@/api/addView'
import { getStore } from '@/store'
import getUserId from '@/utils/getUserId'

/**
 * @apiAnalyze
 * 支持添加PV、UV、BV数据（page view, user view, browser view）
 * @since 0.02
 * @example
 * ```typescript
 * BetterMonitor.initViewPlugin()
 * ```
 */
const initViewPlugin = () => {
  const { view } = getStore()

  if (!view) {
    return
  }

  const addViewBeforeUnload = () => {
    addView({
      pageUrl: location.href,
      userId: getUserId()
    })
  }

  window.addEventListener('load', addViewBeforeUnload)
  window.addEventListener('hashchange', addViewBeforeUnload)

  const { history } = window
  // 劫持pushState
  const oldPushState = history.pushState
  history.pushState = (state: unknown, unused: string, url: string | URL) => {
    oldPushState.call(history, state, unused, url)
    addView({
      pageUrl: location.href,
      userId: getUserId()
    })
  }

  // 劫持replaceState
  // const oldReplaceState = history.replaceState
  // history.replaceState = (stateObj: any, title: string, url: string | URL) => {
  //   oldReplaceState.call(history, stateObj, title, url)
  //   addView({
  //     pageUrl: location.href,
  //     userId: getUserId(),
  //   })
  // }
}

export default initViewPlugin
