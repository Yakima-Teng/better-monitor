// 请务必保证声明文件与对应js版本一致，当前声明文件对应的js版本：{{ version }}.min.js

import {Metric} from "web-vitals";

declare namespace BetterMonitor {
  interface IParamsAddBug {
    pageUrl: string
    message: string
    stack: string
    source: string
    type: string
  }

  type TAddBug = (params: IParamsAddBug) => void

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
  }
  type TAddAction = (params: IParamsAddAction) => void
  type TAddActions = (params: { preferSendBeacon: boolean, delayTime?: number }) => void
  type TDoLog = (level: 'log' | 'warn' | 'error', ...args: any[]) => void
  type TPrintLog = (...args: any[]) => void
  type TPrintWarn = (...args: any[]) => void
  type TPrintError = (...args: any[]) => void
  type TLogTime = (label: string) => void
  type TLogTimeEnd = (label: string) => void

  interface IParamsAddView {
    pageUrl: string
    userId: string | number
  }
  type TAddView = (params: IParamsAddView) => void

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

  type TUpdateStore = (config: Partial<IStore>) => IStore

  type TGetStore = () => IStore

  type TInit = (settings: Partial<IStore>) => void

  interface IBetterMonitor {
    init: BetterMonitor.TInit
    addBug: BetterMonitor.TAddBug
    addView: BetterMonitor.TAddView
    printLog: BetterMonitor.TPrintLog
    printWarn: BetterMonitor.TPrintWarn
    printError: BetterMonitor.TPrintError
    logTime: BetterMonitor.TLogTime
    logTimeEnd: BetterMonitor.TLogTimeEnd
  }
}

export = BetterMonitor;

export as namespace BetterMonitor;

declare global {
  interface Window {
    BetterMonitor: BetterMonitor.IBetterMonitor
  }
}
