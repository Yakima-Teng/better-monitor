import { getStore, getUserId, updateStore } from "#scripts/StoreUtils";
import { addBug as rawAddBug } from "#api/addBug";
import { addView as rawAddView } from "#api/addView";
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
import { queryConfigData } from "#scripts/ConfigUtils";

const init = (settings: Partial<Store>): void => {
  updateStore(settings);

  initViewPlugin();
  initApiPlugin();
  initActionPlugin();
  initErrorPlugin();

  queryConfigData().catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
  });
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

function addBug(params: ParamsAddBug): void {
  const { projectId: pi, sdk: s } = getStore();
  const u = getUserId();
  const { pageUrl: pu, message: m, stack: st, source: so, type: ty } = params;
  return rawAddBug({
    pi,
    s,
    pu,
    m,
    u,
    st,
    so,
    ty,
    t: Date.now(),
  });
}
function addView(params: ParamsAddView): void {
  const { projectId: pi } = getStore();
  const { pageUrl: p, userId } = params;
  let u: string = String(userId || "");
  if (!u) {
    u = getUserId();
  }
  return rawAddView({
    pi,
    p,
    u,
  });
}

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
