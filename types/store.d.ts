interface Store {
  debugger: boolean;
  projectId: number;
  // 接口日志开关
  log: boolean;
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
  queuedLogs: ParamsAddApi[];
  // 待上报的行为日志开关
  queuedActions: ParamsAddAction[];
  // 记录动作的开始时间
  timeLogMap: Map<string, number>;
  getUserId: () => string;
}
