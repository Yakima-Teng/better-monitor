// 请务必保证声明文件与对应js版本一致，当前声明文件对应的js版本：better-monitor, 0.0.18.min.js

declare namespace BetterMonitor {
  interface Metric {
    /**
     * The name of the metric (in acronym form).
     */
    name: 'CLS' | 'FCP' | 'FID' | 'INP' | 'LCP' | 'TTFB';

    /**
     * The current value of the metric.
     */
    value: number;

    /**
     * The rating as to whether the metric value is within the "good",
     * "needs improvement", or "poor" thresholds of the metric.
     */
    rating: 'good' | 'needs-improvement' | 'poor';

    /**
     * The delta between the current value and the last-reported value.
     * On the first report, `delta` and `value` will always be the same.
     */
    delta: number;

    /**
     * A unique ID representing this particular metric instance. This ID can
     * be used by an analytics tool to dedupe multiple values sent for the same
     * metric instance, or to group multiple deltas together and calculate a
     * total. It can also be used to differentiate multiple different metric
     * instances sent from the same page, which can happen if the page is
     * restored from the back/forward cache (in that case new metrics object
     * get created).
     */
    id: string;

    /**
     * The type of navigation.
     *
     * This will be the value returned by the Navigation Timing API (or
     * `undefined` if the browser doesn't support that API), with the following
     * exceptions:
     * - 'back-forward-cache': for pages that are restored from the bfcache.
     * - 'prerender': for pages that were prerendered.
     * - 'restore': for pages that were discarded by the browser and then
     * restored by the user.
     */
    navigationType:
      | 'navigate'
      | 'reload'
      | 'back-forward'
      | 'back-forward-cache'
      | 'prerender'
      | 'restore';
  }

  interface IParamsAddBug {
    pageUrl: string
    message: string
    stack: string
    source: string
    type: string
  }

  function addBug (params: IParamsAddBug): void
  type TAddBug = typeof addBug

  interface IParamsAddLog {
    pageUrl: string
    apiUrl: string
    payload: string
    response: string
    json: string
  }
  type TAddLog = (params: IParamsAddLog) => void
  type TAddLogs = () => void
  interface IParamsAddAction {
    pageUrl: string
    time: string
    level: 'log' | 'warn' | 'error'
    payload: string
    userId: number | string
    directly?: boolean
  }
  type TAddAction = (params: IParamsAddAction) => void
  type TAddActions = (params: { preferSendBeacon: boolean, delayTime?: number }) => void
  type TDoLog = (level: 'log' | 'warn' | 'error', ...args: any[]) => void

  function printLog(...args: any[]): void
  type TPrintLog = typeof printLog
  function printLogDirectly(...args: any[]): void
  type TPrintLogDirectly = typeof printLogDirectly
  function printWarn (...args: any[]): void
  type TPrintWarn = typeof printWarn
  function printWarnDirectly (...args: any[]): void
  type TPrintWarnDirectly = typeof printWarnDirectly
  function printError(...args: any[]): void
  type TPrintError = typeof printError
  function printErrorDirectly(...args: any[]): void
  type TPrintErrorDirectly = typeof printErrorDirectly
  function logTime(label: string): void
  type TLogTime = typeof logTime
  function logTimeEnd(label: string): void
  type TLogTimeEnd = typeof logTimeEnd
  function logTimeEndDirectly(label: string): void
  type TLogTimeEndDirectly = typeof logTimeEndDirectly

  interface IParamsAddView {
    pageUrl: string
    userId: string | number
  }
  function addView (params: IParamsAddView): void
  type TAddView = typeof addView

  interface IPayloadRequest {
    url: string
    method: 'get' | 'post' | 'delete' | 'put' | 'patch'
    params?: Record<string, string | number>
    data?: Record<string, any>
    headers?: Record<string, string>
    responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'
    timeout?: number
    cacheTime?: number
    // 有些接口每次请求时会带一个随机时间戳等强刷缓存的字段，但是我们又想对一个时间内的重复请求进行缓存，则可以通过cacheKey字段固定缓存key
    cacheKey?: string | (() => string)
  }
  interface IAxiosResponseData<T> {
    code: number
    data: T
    message: string
  }
  interface IAxiosResponse<T> {
    config?: any
    data: IAxiosResponseData<T>
    headers: Record<string, string>
    status: number
    statusText: string
    request?: any
  }

  function request<T = unknown>(payload: IPayloadRequest): Promise<IAxiosResponse<T>>

  type TRequest = typeof request

  type TSendBeacon = (url: string, jsonData: Record<string, unknown>) => boolean

  type TType = 'object' | 'array' | 'function' | 'null' | 'undefined' | 'number' | 'boolean' | 'date' | 'regexp' | 'string'
  type TGetType = (val: any) => TType
  type TIsFunction = (val: unknown) => val is (...args: any[]) => any
  type TIsObject = (val: unknown) => val is object
  type TIsString = (val: unknown) => val is string

  type TGetLocalStorage = (key: string) => Record<string, unknown> | null

  type TParseSearchString = (url: string) => Record<string, string>

  type TPerformanceData = Pick<Metric, 'name' | 'rating' | 'value' | 'navigationType'> & {
    pageUrl: string
  }

  interface IStore {
    projectId: string
    // 接口日志开关
    log: boolean
    // 访问日志开关
    view: boolean
    // 错误日志开关
    error: boolean
    // 行为日志开关
    action: boolean
    // 埋点日志开关
    statistics: boolean
    // 黑名单，被命中的日志将不再上报
    blackList: Array<string | RegExp>
    // 待上报的接口日志列表
    queuedLogs: IParamsAddLog[]
    // 待上报的行为日志开关
    queuedActions: IParamsAddAction[]
    // 待上报的性能日志
    queuedPerformanceLogs: Set<TPerformanceData>
    // 记录动作的开始时间
    timeLogMap: Map<string, number>
    userId: undefined | string | number
    getUserId: undefined | (() => string | number) | (() => Promise<string | number>)
  }

  function updateStore (config: Partial<IStore>): IStore
  type TUpdateStore = typeof updateStore

  function getStore (): IStore
  type TGetStore = typeof getStore

  function init (settings: Partial<IStore>): void
  type TInit = typeof init

  interface IBetterMonitor {
    init: BetterMonitor.TInit
    addBug: BetterMonitor.TAddBug
    addView: BetterMonitor.TAddView
    printLog: BetterMonitor.TPrintLog
    printWarn: BetterMonitor.TPrintWarn
    printError: BetterMonitor.TPrintError
    logTime: BetterMonitor.TLogTime
    logTimeEnd: BetterMonitor.TLogTimeEnd
    printLogDirectly: BetterMonitor.TPrintLogDirectly
    printWarnDirectly: BetterMonitor.TPrintWarnDirectly
    printErrorDirectly: BetterMonitor.TPrintErrorDirectly
    logTimeEndDirectly: BetterMonitor.TLogTimeEndDirectly
    updateStore: BetterMonitor.TUpdateStore
    getStore: BetterMonitor.TGetStore
  }
}

export = BetterMonitor;

export as namespace BetterMonitor;

declare global {
  interface Window {
    BetterMonitor: BetterMonitor.IBetterMonitor
  }
}
