import { buildVersion } from "#scripts/ConstantUtils";

const store: Store = {
  sdk: buildVersion,
  debug: false,
  // 项目id
  projectId: 0,
  view: true,
  api: false,
  error: true,
  action: true,
  statistics: true,
  // 黑名单中的接口不会进行上报
  blackList: [],
  queuedApis: [],
  queuedActions: [],
  timeLogMap: new Map(),
  getUserId: () => {
    return "";
  },
};

export const updateStore = (config: Partial<Store>): Store => {
  return Object.assign(store, config);
};

export const getStore = (): Store => {
  return store;
};

export const getUserId = (): string => {
  return store.getUserId();
};
