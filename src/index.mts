import { getStore, updateStore } from "#scripts/StoreUtils";
import { addBug } from "#api/addBug";
import { addView } from "#api/addView";
import {
  printLog,
  printWarn,
  printError,
  logTime,
  logTimeEnd,
  printLogDirectly,
  printWarnDirectly,
  printErrorDirectly,
  logTimeEndDirectly,
} from "#scripts/LogUtils";
import { initApiPlugin } from "#plugin/api/initApiPlugin";
import { initActionPlugin } from "#plugin/action/initActionPlugin";
import { initErrorPlugin } from "#plugin/error/initErrorPlugin";
import { initViewPlugin } from "#plugin/view/initViewPlugin";
import { NODE_ENV, MODE, buildDate, buildVersion, FRONTEND_DOMAIN } from "#scripts/ConstantUtils";

const init = (settings: Partial<Store>): void => {
  updateStore(settings);

  initViewPlugin();
  initApiPlugin();
  initActionPlugin();
  initErrorPlugin();
};

// 尝试找到引入better-monitor.min.js文件的script标签，如果用户主动设置了`data-project-id`属性则直接进行初始化
const tryInitSettingAutomatically = () => {
  const elemScripts = document.querySelectorAll("script") as NodeList;
  let targetElem: HTMLScriptElement | null = null;
  for (let i = 0, len = elemScripts.length; i < len; i++) {
    const elem = elemScripts[i] as HTMLScriptElement;
    const src = elem.getAttribute("src");
    if (src && src.includes("better-monitor")) {
      targetElem = elem;
      break;
    }
  }
  if (targetElem) {
    const dataProjectId = targetElem.getAttribute("data-project-id");
    const dataView = targetElem.getAttribute("data-view");
    const dataApi = targetElem.getAttribute("data-api");
    const dataError = targetElem.getAttribute("data-error");
    const dataAction = targetElem.getAttribute("data-action");
    if (dataProjectId) {
      init({
        projectId: Number(dataProjectId || 0),
        view: ![0, "0"].includes(dataView || ""),
        api: [1, "1"].includes(dataApi || ""),
        error: ![0, "0"].includes(dataError || ""),
        action: ![0, "0"].includes(dataAction || ""),
      });
    }
  }
};

tryInitSettingAutomatically();

const exportObj: ExportObj = {
  NODE_ENV,
  MODE,
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
  getStore,
};

export default exportObj;

window.console.log(
  `%c已集成window.BetterMonitor对象😃\n详情请参阅官网${FRONTEND_DOMAIN}`,
  "background: #ff5900; color: #000",
);
