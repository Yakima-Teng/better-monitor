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
