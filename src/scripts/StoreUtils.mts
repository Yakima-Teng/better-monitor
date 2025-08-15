const store: Store = {
  debugger: false,
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
  queuedPerformanceLogs: new Set(),
  timeLogMap: new Map(),
  getUserId: () => {
    return ''
  },
}

export const updateStore = (config: Partial<Store>): Store => {
  return Object.assign(store, config)
}

export const getStore = (): Store => {
  return store
}

export const getUserId = (): string | Promise<string> => {
  return store.getUserId()
}
