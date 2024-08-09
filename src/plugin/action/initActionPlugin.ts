import { addActions } from '@/api/addAction'
import { getStore } from '@/store'

const initActionPlugin = () => {
  const { action } = getStore()

  if (!action) {
    return
  }

  const tryAddActions = () => {
    addActions({ preferSendBeacon: true, delayTime: 0 })
  }

  window.addEventListener('beforeunload', tryAddActions)
  window.addEventListener('unload', tryAddActions)

  const { history } = window
  // 劫持pushState
  const oldPushState = history.pushState
  history.pushState = (state: unknown, unused: string, url: string | URL) => {
    oldPushState.call(history, state, unused, url)
    tryAddActions()
  }
}

export default initActionPlugin
