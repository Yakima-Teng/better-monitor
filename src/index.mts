import { getStore, getUserId, updateStore as rawUpdateStore } from "#scripts/StoreUtils";
import { addBug as rawAddBug } from "#api/addBug";
import { addView as rawAddView } from "#api/addView";
import { addEvent } from "#api/addEvent";
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
import { generateRobustUserId } from "#scripts/UserUtils";
import type { ExportObj, ParamsAddBug, ParamsAddView, ParamsInitStore, Store } from "#types/index";

const init = (settings: ParamsInitStore): void => {
  const storeToUpdate: Partial<Store> = {
    ...settings,
    getUserId: function () {
      if (typeof settings.getUserId === "function") {
        return settings.getUserId(generateRobustUserId);
      }
      return generateRobustUserId();
    },
  };
  updateStore(storeToUpdate);

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
  const { sdk: s } = getStore();
  const u = getUserId();
  const { pageUrl: pu, message: m, stack: st, source: so, type: ty } = params;
  // rawAddBug 内部会获取 projectId，这里传递临时值
  rawAddBug({
    pi: "", // 临时值，rawAddBug 内部会获取并替换
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
  // TODO
  window.console.log("addView 方法已废弃，后续将不再对外暴露，请勿继续使用该 API。");
  const { sdk: s } = getStore();
  const { pageUrl: p, userId } = params;
  let u: string = String(userId || "");
  if (!u) {
    u = getUserId();
  }
  // rawAddView 内部会获取 projectId，这里传递临时值
  rawAddView({
    pi: "", // 临时值，rawAddView 内部会获取并替换
    s,
    p,
    u,
  });
}
function updateStore(params: Partial<Store>) {
  // TODO
  window.console.log("updateStore 方法已废弃，后续将不再对外暴露，请勿继续使用该 API。");
  return rawUpdateStore(params);
}

const exportObj: ExportObj = {
  NODE_ENV,
  MODE,
  buildDate,
  buildVersion,
  init,
  addBug,
  addView,
  addEvent,
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
