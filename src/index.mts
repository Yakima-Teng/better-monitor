import { getStore, updateStore } from '#scripts/StoreUtils'
import { addBug } from '#api/addBug'
import { addView } from '#api/addView'
import {
  printLog,
  printWarn,
  printError,
  logTime,
  logTimeEnd,
  printLogDirectly,
  printWarnDirectly,
  printErrorDirectly,
  logTimeEndDirectly
} from '#scripts/LogUtils'
import { initLogPlugin } from '#plugin/log/initLogPlugin'
import { initActionPlugin } from '#plugin/action/initActionPlugin'
import { initErrorPlugin } from '#plugin/error/initErrorPlugin'
import { initViewPlugin } from '#plugin/view/initViewPlugin'
import { initPerformancePlugin } from '#plugin/performance/initPerformancePlugin'
import { env, buildDate, buildVersion } from '#scripts/ConstantUtils'

const init = (settings: Partial<Store>): void => {
  updateStore(settings)

  initViewPlugin()
  initLogPlugin()
  initActionPlugin()
  initErrorPlugin()
  initPerformancePlugin()
}

// 尝试找到引入better-monitor.min.js文件的script标签，如果用户主动设置了`data-project-id`属性则直接进行初始化
const tryInitSettingAutomatically = () => {
  const elemScripts = document.querySelectorAll('script') as NodeList
  let targetElem: HTMLScriptElement | null = null
  for (let i = 0, len = elemScripts.length; i < len; i++) {
    const elem = elemScripts[i] as HTMLScriptElement
    const src = elem.getAttribute('src')
    if (src && src.includes('/better-monitor.min.js')) {
      targetElem = elem
      break
    }
  }
  if (targetElem) {
    const dataProjectId = targetElem.getAttribute('data-project-id')
    const dataView = targetElem.getAttribute('data-view')
    const dataLog = targetElem.getAttribute('data-log')
    const dataError = targetElem.getAttribute('data-error')
    const dataAction = targetElem.getAttribute('data-action')
    if (dataProjectId) {
      init({
        projectId: dataProjectId,
        view: ![0, '0'].includes(dataView || ''),
        log: [1, '1'].includes(dataLog || ''),
        error: ![0, '0'].includes(dataError || ''),
        action: ![0, '0'].includes(dataAction || '')
      })
    }
  }
}

tryInitSettingAutomatically()

const exportObj: ExportObj = {
  env,
  buildDate,
  buildVersion,
  init,
  addBug,
  addView,
  printLog,
  printLogDirectly,
  printWarn,
  printWarnDirectly,
  printError,
  printErrorDirectly,
  logTime,
  logTimeEnd,
  logTimeEndDirectly,
  updateStore,
  getStore
}

export default exportObj

// window.console.log('%c已集成window.BetterMonitor对象😃\n详情请参阅官网https://www.verybugs.com/', 'background: #ff5900; color: #000')

// eslint-disable-next-line max-len
// window.console.log('%c2025年6月23日最新通知：SDK地址已更新为https://cdn.verysites.com/verybugs/better-monitor/better-monitor.min.js, \n使用旧地址的同学请尽早更换地址', 'background: #22ddff; color: #000')
