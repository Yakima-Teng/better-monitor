# AGENTS.md

## 项目简介

- 前端监控 SDK（better-monitor），用于采集网站错误、接口、行为、访问等日志数据并上报到服务端
- 这是一个 npm 包项目，根目录有 package.json，使用 TypeScript + ESM（.mts 文件）开发，Webpack 构建，输出 CJS/ESM/UMD 三种格式

## 范围

- 本仓库默认语言: TypeScript（.mts / .ts / .d.ts）
- 允许修改目录: `src/`、`test/`、`build/`、`types/`
- 禁止修改目录: `dist/`、`node_modules/`、`public/`、`attachments/`

## 改动检查

**改动后必须执行:**

- `npm run lint` — 依次执行 prettier 格式化、eslint 检查、jest 测试、tsc 类型检查

**检查项:**

- 所有 .mts/.ts 文件无 TypeScript 编译错误
- jest 测试全部通过
- eslint 无报错
- prettier 格式化无差异

## 交付格式

- 先给风险摘要，再给修改点，再给测试结果
- 所有文件引用都要带路径和行号
- 对于技能变更，说明变更后对用户的影响

## 项目结构

```
monitor/
├── src/                        # 源代码
│   ├── index.mts               # 入口文件，导出 init/addBug/addView/addEvent 等方法
│   ├── api/                    # 上报接口层
│   │   ├── addAction.mts       # 行为日志上报
│   │   ├── addApi.mts          # 接口日志上报
│   │   ├── addBug.mts          # 错误日志上报
│   │   ├── addEvent.mts        # 自定义事件上报
│   │   └── addView.mts         # 访问日志上报
│   ├── plugin/                 # 插件层，各监控功能的初始化与拦截
│   │   ├── action/             # 行为监控插件
│   │   ├── api/                # 接口监控插件（拦截 XMLHttpRequest/fetch）
│   │   ├── error/              # 错误监控插件（JS 错误 + unhandledrejection）
│   │   │   └── modules/        # 错误处理子模块
│   │   └── view/               # 访问监控插件
│   └── scripts/                # 工具层，公共方法
│       ├── ConfigUtils.mts     # 配置数据查询
│       ├── ConstantUtils.mts   # 常量定义（NODE_ENV、域名等）
│       ├── LogUtils.mts        # 日志打印工具
│       ├── ProjectIdUtils.mts  # projectId 获取与去重
│       ├── RequestUtils.mts    # 请求发送工具
│       ├── StoreUtils.mts      # 全局状态存储
│       ├── StringUtils.mts     # 字符串工具
│       ├── TypeUtils.mts       # 类型判断工具
│       ├── UrlUtils.mts        # URL 解析工具
│       └── UserUtils.mts       # 用户 ID 生成
├── test/                       # 测试代码
│   └── common/                 # 通用工具函数测试
│   └── url/                    # URL 工具测试
├── build/                      # 构建配置
│   ├── webpack.common.mts      # Webpack 公共配置
│   ├── webpack.dev.mts         # 开发环境配置
│   ├── webpack.prod.mts        # 生产环境配置
│   ├── webpack.debug.mts       # 调试环境配置
│   ├── deploy.mts              # 部署脚本
│   ├── constants.mts           # 构建常量
│   └── utils.mts               # 构建工具方法
├── types/                      # TypeScript 类型定义
│   └── index.d.ts              # 全局类型声明（Store、RequestItem、ExportObj 等）
├── public/                     # 开发服务器静态资源
├── .husky/                     # Git hooks（commitlint）
├── package.json                # 项目配置与脚本
├── tsconfig.json               # TypeScript 编译配置
├── jest.config.ts              # Jest 测试配置
├── eslint.config.mts           # ESLint 配置
├── prettier.config.mts         # Prettier 配置
├── commitlint.config.ts        # Commitlint 配置（conventional commits）
└── .editorconfig               # 编辑器配置
```

**路径别名映射（package.json imports + tsconfig paths）:**

| 别名 | 实际路径 |
|------|---------|
| `#build/*` | `./build/*.mts` |
| `#test/*` | `./test/*.mts` |
| `#api/*` | `./src/api/*.mts` |
| `#plugin/*` | `./src/plugin/*.mts` |
| `#scripts/*` | `./src/scripts/*.mts` |
| `#src/*` | `./src/*.mts` |
| `#root/*` | `./*.mts` |
| `#types/*` | `./types/*.d.ts` |

## AI 思考方式

本节描述 AI 在执行任务时应遵循的思考方式，确保输出质量。

### 行动前思考

#### 假设显式化

实现前明确说出假设，不默默选择理解方式：

- 存在多种理解时，列出选项而非默默选其一
- 不确定时停下来问，而非自行假设
- 有更简单方案时主动提出，必要时提出反对意见

#### 决策点显式化

将隐含的分支选择转化为明确的规则：

- 不使用"根据情况处理"等模糊表述
- 明确每个条件分支对应的具体行为
- 使用表格或列表格式呈现决策逻辑

### 克制与精简

#### 简单优先

用最少的代码解决问题，不做预测性开发：

- 不实现用户未要求的功能，不添加未被要求的灵活性
- 不为只用一次的代码抽象，不为不可能的场景添加错误处理
- 200 行能用 50 行解决就重写

#### 精确修改

只改必须改的，只清理自己造成的问题：

- 不顺手改进相邻代码、注释或格式，不重构没有坏掉的东西
- 匹配现有风格，每一行修改都应能追溯到用户请求
- 删除因修改而产生的孤立代码，不删除原本存在的死代码

#### 显式分级筛选

行动前先将发现分为"值得改"和"不值得改"两类，避免过度干预：

- 以"是否影响执行质量"作为筛选标准，而非"是否能改"
- 对不值得改的项，评估其在上下文中是否已足够清晰
- 未发现实质性问题时，主动得出"无需优化"的结论

### 验证与比对

#### 目标驱动执行

把任务转化为可验证目标，循环推进直到验证通过：

- "添加校验" → "为非法输入写测试，然后让测试通过"
- "修复 bug" → "写一个复现 bug 的测试，然后让测试通过"
- 多步骤任务先给出简短计划：步骤 → 验证项

#### 交叉比对式矛盾定位

对同一信息的多个来源进行比对，将零散差异归类为结构性矛盾：

- 比较多个文件对同一事项的规定，以差异作为问题发现手段
- 用"类别-数量"方式组织发现，标注矛盾点的具体位置（文件、行号）
- 识别不一致后同步修改关联文件，修改后验证各来源是否一致

#### 逆向逻辑验证

从预期结果反推规则是否合理，而非顺着规则正向核对格式：

- 从期望行为倒推条件分支是否覆盖完整
- 用示例中的实际场景反推正文中的规则是否自洽
- 从"AI 执行时能否做出正确判断"反推描述是否需要显式化

#### 输出保真校验

输出前对照原始定义自查，确保未引入无意的偏移：

- 检查是否对既定术语、格式或规则进行了同义替换、过度解释或冗余补充
- 枚举具体的失真类型作为核查清单，而非笼统要求"保持一致"
- 检测到偏移时回退到原始定义，而非尝试修正偏移后的版本

## 路径格式规范

- 在文档中提及文件路径时，优先使用相对路径，以保持跨设备下的通用性
- 在终端中提及文件路径时，优先使用绝对路径，以方便终端/IDE 将其识别为可点击的链接
- 使用正斜杠作为路径分隔符，路径包含空格时使用引号包裹，以确保跨平台兼容性和正确解析

## 需要遵守的规则

- 提交信息遵循 Conventional Commits 规范（commitlint.config.ts 中定义了 type-enum: build, ci, chore, docs, feat, fix, perf, refactor, revert, style, test）
- 源码文件统一使用 .mts 扩展名（ESM 模块）
- 使用路径别名导入模块（如 `#scripts/StoreUtils`），不使用相对路径
- 代码风格遵循 .editorconfig：缩进 2 空格、换行符 LF、UTF-8 编码、尾部插入空行

## 关键参考

- `package.json` — 项目配置、脚本命令、依赖列表
- `tsconfig.json` — TypeScript 编译配置与路径别名
- `types/index.d.ts` — 全局类型定义（Store、ExportObj、RequestItem 等）
- `src/index.mts` — SDK 入口文件，理解导出结构
- `commitlint.config.ts` — 提交信息规范
- `.editorconfig` — 编辑器配置，编写内容时需遵循
- `README.md` — 项目说明文档