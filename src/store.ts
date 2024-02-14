const store: BetterMonitor.IStore = {
  // 项目id
  projectId: '',
  view: true,
  log: true,
  error: true,
  action: true,
  statistics: true,
  // 黑名单中的接口不会进行上报
  blackList: [],
  queuedLogs: [],
  queuedActions: [],
  timeLogMap: new Map(),
  userId: undefined,
  getUserId: undefined
}

export const updateStore: BetterMonitor.TUpdateStore = (config) => Object.assign(store, config)

export const getStore: BetterMonitor.TGetStore = () => store
