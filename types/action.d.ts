interface ParamsAddAction {
  pageUrl: string;
  time: string;
  level: LogLevel;
  payload: string;
  userId: number | string;
  directly?: boolean;
}
interface ParamsDoAddActions {
  preferSendBeacon: boolean;
}

interface ParamsAddActions extends ParamsDoAddActions {
  delayTime: number;
}
