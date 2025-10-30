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
  // level
  l: LogLevel;
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

interface Store {
  sdk: string;
  debug: boolean;
  projectId: number;
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
