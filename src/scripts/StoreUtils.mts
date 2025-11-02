import { buildVersion } from "#scripts/ConstantUtils";
import { generateRobustUserId } from "#scripts/UserUtils";

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
  projectName: "",
  originList: [],
  fields: {
    MAX_LENGTH_USER_ID: 32,
    MAX_LENGTH_PAGE_URL: 512,
    MAX_LENGTH_API_URL: 512,
    MAX_LENGTH_API_PAYLOAD: 1024,
    MAX_LENGTH_REFERER: 512,
    MAX_LENGTH_COOKIE: 1024,
    MAX_LENGTH_MESSAGE: 255,
    MAX_LENGTH_USER_AGENT: 512,
    MAX_LENGTH_ORIGIN: 50,
    MAX_LENGTH_MULTIPLE_ORIGINS: 255,
    MAX_LENGTH_PROJECT_NAME: 128,
    MAX_LENGTH_OPERATING_SYSTEM: 255,
    MAX_LENGTH_BROWSER: 255,
    MAX_LENGTH_DATE: 8,
    MAX_LENGTH_JSON: 1024,
    MAX_LENGTH_ACTION: 1024,
    MAX_LENGTH_SDK_VERSION: 8,
    MIN_LENGTH_SDK_VERSION: 5,
    MAX_LENGTH_HTTP_METHOD: 7,
    MIN_LENGTH_HTTP_METHOD: 3,
    MAX_LENGTH_HTTP_STATUS: 3,
    MAX_LENGTH_TIMESTAMP: 13,
    MAX_LENGTH_RESPONSE_HEADERS: 1024 - 100 - 8 - 7 - 3 - 13,
  },
  getUserId: generateRobustUserId,
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
