type LogLevel = "log" | "warn" | "error";

type VariableType =
  | "object"
  | "array"
  | "function"
  | "null"
  | "undefined"
  | "number"
  | "boolean"
  | "date"
  | "regexp"
  | "string";

type Func = (...args: unknown[]) => unknown;

type FuncLog = (level: LogLevel, ...args: any[]) => Promise<void>;

type BMJSONString<T = any> = string & { __brand: "JSONString"; __type: T };

interface RequestListData<T> {
  l: T[];
}

interface RequestItemAddAction {
  // projectId
  pi: number;
  // sdk
  s: string;
  // pageUrl
  pu: string;
  // time
  t: number;
  // level: 0-log, 1-warn, 2-error
  l: 0 | 1 | 2;
  // payload
  p: string;
  // userId
  u: string;
}

interface RequestItemAddApi {
  // projectId
  pi: number;
  // sdk
  s: string;
  // time
  t: number;
  // pageUrl
  pu: string;
  // apiUrl
  au: string;
  // response
  r: string;
  // userId
  u: string;
  // params
  pa: string;
  // request body data
  da: string;
  // method
  m: string;
  // status
  st: string;
  // timeConsumed: number
  tc: number;
  // allResponseHeaders
  rh: string;
}

interface RequestItemAddBug {
  // projectId
  pi: number;
  // sdk
  s: string;
  // pageUrl
  pu: string;
  // message
  m: string;
  // userId
  u: string;
  // stack
  st: string;
  // source
  so: string;
  // type
  ty: string;
  // time
  t: number;
}

interface RequestItemAddView {
  // projectId
  pi: number;
  // sdk
  s: string;
  // pageUrl
  p: string;
  // userId
  u: string;
}

interface RequestOptions extends RequestInit {
  /**
   * 是否携带凭证（cookies、HTTP 认证等）
   * - true: 同源和跨域都携带（等价于 credentials: 'include'）
   * - false: 不携带（默认，等价于 credentials: 'omit'）
   * - 'same-origin': 仅同源携带
   *
   * 注意：当使用 XMLHttpRequest 降级时，仅支持 boolean（true/false）
   */
  withCredentials?: boolean | "same-origin";
  /**
   * 请求超时时间（毫秒）
   * 默认：0（表示无超时）
   */
  timeout?: number;
}

interface XMLHttpRequestMeta {
  method: string;
  pageUrl: string;
  apiUrl: string;
  params: Record<string, any>;
  timeSend: number;
  body: Record<string, any>;
  timeConsumed: number;
  total: string;
  responseURL: string;
  responseText: string;
  allResponseHeaders: string;
  status: string;
  // 客户端时间戳
  clientTime: number;
}
interface XMLHttpRequestWithMeta extends XMLHttpRequest {
  meta: XMLHttpRequestMeta;
}

interface BMResponseData<T = unknown> {
  code: number;
  data: T;
  encrypted: boolean;
  message: string;
  timestamp: number;
}
interface BMConfigDataFields {
  MAX_LENGTH_USER_ID: number;
  MAX_LENGTH_PAGE_URL: number;
  MAX_LENGTH_API_URL: number;
  MAX_LENGTH_API_PAYLOAD: number;
  MAX_LENGTH_REFERER: number;
  MAX_LENGTH_COOKIE: number;
  MAX_LENGTH_MESSAGE: number;
  MAX_LENGTH_USER_AGENT: number;
  MAX_LENGTH_ORIGIN: number;
  MAX_LENGTH_MULTIPLE_ORIGINS: number;
  MAX_LENGTH_PROJECT_NAME: number;
  MAX_LENGTH_OPERATING_SYSTEM: number;
  MAX_LENGTH_BROWSER: number;
  MAX_LENGTH_DATE: number;
  MAX_LENGTH_JSON: number;
  MAX_LENGTH_ACTION: number;
  MAX_LENGTH_SDK_VERSION: number;
  MIN_LENGTH_SDK_VERSION: number;
  MAX_LENGTH_HTTP_METHOD: number;
  MIN_LENGTH_HTTP_METHOD: number;
  MAX_LENGTH_HTTP_STATUS: number;
  MAX_LENGTH_TIMESTAMP: number;
  MAX_LENGTH_RESPONSE_HEADERS: number;
}
interface ConfigData {
  projectName: string;
  originList: string[];
  fields: BMConfigDataFields;
}

interface Store {
  sdk: string;
  debug: boolean;
  projectId: number;
  projectName: ConfigData["projectName"];
  originList: ConfigData["originList"];
  fields: ConfigData["fields"];
  // 接口日志开关
  api: boolean;
  // 访问日志开关
  view: boolean;
  // 错误日志开关
  error: boolean;
  // 行为日志开关
  action: boolean;
  // 埋点日志开关
  statistics: boolean;
  // 黑名单，被命中的日志将不再上报
  blackList: Array<string | RegExp>;
  // 待上报的接口日志列表
  queuedApis: RequestItemAddApi[];
  // 待上报的行为日志开关
  queuedActions: RequestItemAddAction[];
  // 记录动作的开始时间
  timeLogMap: Map<string, number>;
  getUserId: () => string;
}

interface ParamsAddBug {
  pageUrl: string;
  message: string;
  stack: string;
  source: string;
  type: string;
}

interface ParamsAddView {
  pageUrl: string;
  userId?: string | number;
}

interface ExportObj {
  NODE_ENV: string;
  MODE: string;
  buildDate: string;
  buildVersion: string;
  init: (settings: Partial<Store>) => void;
  addBug: (params: ParamsAddBug) => void;
  addView: (params: ParamsAddView) => void;
  printLog: (...args: unknown[]) => Promise<void>;
  printWarn: (...args: unknown[]) => Promise<void>;
  printError: (...args: unknown[]) => Promise<void>;
  logTime: (label: string) => void;
  logTimeEnd: (label: string) => Promise<void>;
  printLogDirectly: (...args: unknown[]) => Promise<void>;
  printWarnDirectly: (...args: unknown[]) => Promise<void>;
  printErrorDirectly: (...args: unknown[]) => Promise<void>;
  logTimeEndDirectly: (label: string) => Promise<void>;
  updateStore: (config: Partial<Store>) => Store;
  getStore: () => Store;
}
