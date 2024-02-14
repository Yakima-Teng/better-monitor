import { updateStore } from '@/store'
import addBug from '@/api/addBug'
import addView from '@/api/addView'
import {
  printLog, printWarn, printError, logTime, logTimeEnd
} from '@/api/addAction'
import initLogPlugin from '@/plugin/log/initLogPlugin'
import initActionPlugin from '@/plugin/action/initActionPlugin'
import initErrorPlugin from '@/plugin/error/initErrorPlugin'
import initViewPlugin from '@/plugin/view/initViewPlugin'

const init: BetterMonitor.TInit = (settings) => {
  updateStore(settings)

  initViewPlugin()
  initLogPlugin()
  initActionPlugin()
  initErrorPlugin()
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
        log: ![0, '0'].includes(dataLog || ''),
        error: ![0, '0'].includes(dataError || ''),
        action: ![0, '0'].includes(dataAction || '')
      })
    }
  }
}

tryInitSettingAutomatically()

const returnObj: BetterMonitor.IBetterMonitor = {
  init,
  addBug,
  addView,
  printLog,
  printWarn,
  printError,
  logTime,
  logTimeEnd
}

export default returnObj

window.console.log('%c已集成window.BetterMonitor对象😃\nAPI文档和TS类型声明文件可以参阅https://www.verybugs.com/lib', 'background: #ff5900; color: #000')
