# better-monitor

<p align="center" style="display: flex;align-items: center;justify-content: center;gap:8px;">
  <a href="https://npmcharts.com/compare/better-monitor?minimal=true">
    <img src="https://img.shields.io/npm/dm/better-monitor.svg" alt="Downloads">
  </a>
  <a href="https://www.npmjs.com/package/better-monitor">
    <img src="https://img.shields.io/npm/v/better-monitor.svg" alt="Version">
  </a>
  <a href="https://www.npmjs.com/package/better-monitor">
    <img src="https://img.shields.io/npm/l/better-monitor.svg" alt="License">
  </a>
</p>

> 自动检测浏览器中的 JavaScript 错误并上报。支持已处理和未处理错误的监控，数据会上报到服务器进行分析。

## 功能特性

better-monitor 是一个功能强大的前端监控 SDK，提供以下核心功能：

- 🔥 **错误监控**：自动捕获并上报 JavaScript 运行时错误和未处理的 Promise 拒绝
- 🔥 **API 监控**：自动拦截并记录所有 XMLHttpRequest 请求，包括请求/响应头、请求体、参数等信息
- 🔥 **行为日志**：记录用户操作日志，支持按时间顺序追踪用户行为
- 🔥 **访问统计**：自动记录 PV（页面访问量）、UV（独立访客数）和 BV（浏览器访问量）数据
- 🔥 **环境信息**：自动收集用户操作系统和浏览器信息
- 🔥 **性能监控**：提供日志打印和时间测量功能，方便追踪性能问题
- 🔥 **SPA 支持**：支持单页应用（SPA）路由变化监听，自动追踪页面访问

## 快速开始

### 方式一：CDN 引入（推荐）

只需一行代码即可完成集成：

```html
<script crossorigin="anonymous" data-project-id="999" src="https://cdn.verysites.com/verybugs/better-monitor/better-monitor.min.js"></script>
```

> **注意**：请将 `data-project-id` 替换为你自己的项目 ID，项目 ID 可在 [VeryBugs 平台](https://www.verysites.com/bugs/) 创建项目后获取。

### 方式二：NPM 安装

```bash
npm install better-monitor
```

```javascript
import BetterMonitor from 'better-monitor';

BetterMonitor.init({
  projectId: 999,
  view: true,    // 开启访问统计
  api: true,     // 开启 API 监控
  error: true,   // 开启错误监控
  action: true   // 开启行为日志
});
```

### 配置选项

通过 `data-*` 属性可以控制各功能的开启/关闭：

```html
<script 
  crossorigin="anonymous" 
  data-project-id="999"
  data-view="1"     <!-- 开启访问统计（默认开启） -->
  data-api="1"      <!-- 开启 API 监控（默认关闭） -->
  data-error="1"    <!-- 开启错误监控（默认开启） -->
  data-action="1"   <!-- 开启行为日志（默认开启） -->
  src="https://cdn.verysites.com/verybugs/better-monitor/better-monitor.min.js">
</script>
```

## API 文档

### BetterMonitor.init(settings)

手动初始化 SDK，通常在需要动态配置时使用。

**参数：**
- `settings.projectId` (number, 必填)：项目 ID
- `settings.view` (boolean, 可选)：是否开启访问统计，默认 `true`
- `settings.api` (boolean, 可选)：是否开启 API 监控，默认 `false`
- `settings.error` (boolean, 可选)：是否开启错误监控，默认 `true`
- `settings.action` (boolean, 可选)：是否开启行为日志，默认 `true`
- `settings.blackList` (Array<string | RegExp>, 可选)：黑名单列表，匹配到的请求/日志不会上报
- `settings.debug` (boolean, 可选)：是否开启调试模式，默认 `false`
- `settings.getUserId` (Function, 可选)：自定义用户 ID 生成函数

**示例：**
```javascript
BetterMonitor.init({
  projectId: 999,
  view: true,
  api: true,
  error: true,
  action: true,
  blackList: ['/api/heartbeat', /\.jpg$/],
  debug: true
});
```

### BetterMonitor.addBug(params)

手动上报错误信息。

**参数：**
- `params.pageUrl` (string)：页面 URL
- `params.message` (string)：错误信息
- `params.stack` (string)：错误堆栈
- `params.source` (string)：错误来源
- `params.type` (string)：错误类型

**示例：**
```javascript
try {
  // 你的代码
} catch (error) {
  BetterMonitor.addBug({
    pageUrl: window.location.href,
    message: error.message,
    stack: error.stack || '',
    source: 'custom',
    type: 'custom'
  });
}
```

### BetterMonitor.addView(params)

手动上报页面访问。

**参数：**
- `params.pageUrl` (string)：页面 URL
- `params.userId` (string | number, 可选)：用户 ID，不传则使用自动生成的 ID

**示例：**
```javascript
BetterMonitor.addView({
  pageUrl: window.location.href,
  userId: 'user123'
});
```

### BetterMonitor.printLog(...args)

打印普通日志（会延迟上报）。

**示例：**
```javascript
BetterMonitor.printLog('用户点击了按钮', { buttonId: 'submit' });
```

### BetterMonitor.printWarn(...args)

打印警告日志（会延迟上报）。

**示例：**
```javascript
BetterMonitor.printWarn('API 响应时间过长', { duration: 5000 });
```

### BetterMonitor.printError(...args)

打印错误日志（会延迟上报）。

**示例：**
```javascript
BetterMonitor.printError('数据处理失败', { error: error.message });
```

### BetterMonitor.printLogDirectly(...args)

立即上报普通日志。

**示例：**
```javascript
BetterMonitor.printLogDirectly('重要操作', { action: 'payment' });
```

### BetterMonitor.printWarnDirectly(...args)

立即上报警告日志。

### BetterMonitor.printErrorDirectly(...args)

立即上报错误日志。

### BetterMonitor.logTime(label)

开始计时。

**示例：**
```javascript
BetterMonitor.logTime('数据加载');
// ... 你的代码 ...
await BetterMonitor.logTimeEnd('数据加载'); // 自动上报耗时
```

### BetterMonitor.logTimeEnd(label)

结束计时并上报（延迟上报）。如果耗时超过 100ms，会以 error 级别上报；否则以 log 级别上报。

### BetterMonitor.logTimeEndDirectly(label)

结束计时并立即上报。

### BetterMonitor.updateStore(config)

更新 SDK 配置。

**示例：**
```javascript
BetterMonitor.updateStore({
  debug: true,
  blackList: ['/api/test']
});
```

### BetterMonitor.getStore()

获取当前 SDK 配置。

### BetterMonitor.buildVersion

SDK 版本号。

### BetterMonitor.buildDate

SDK 构建日期。

## 高级特性

### 黑名单机制

可以通过黑名单过滤不需要上报的请求或日志：

```javascript
BetterMonitor.init({
  projectId: 999,
  blackList: [
    '/api/heartbeat',  // 字符串匹配
    /\.jpg$/,          // 正则匹配
    'better-monitor'   // 包含此关键字的都会被过滤
  ]
});
```

### 批量上报

SDK 采用批量上报机制，自动将多条日志合并上报，提高性能并减少网络请求：

- **API 日志**：当队列达到 5 条时自动上报，或在页面卸载时上报
- **行为日志**：当队列达到 10 条时自动上报，或内容超过 10KB 时立即上报，否则延迟 300ms 上报

### SPA 路由支持

SDK 会自动监听 SPA 应用的路由变化（`pushState` 和 `hashchange`），自动记录页面访问。

### 自动用户 ID 生成

SDK 会自动生成并持久化用户 ID，用于统计 UV 数据。支持自定义用户 ID 生成函数：

```javascript
BetterMonitor.init({
  projectId: 999,
  getUserId: () => {
    return localStorage.getItem('myUserId') || 'anonymous';
  }
});
```

### 字段长度限制

SDK 会对上报字段进行长度限制，确保数据不会过大。默认限制如下：

- 用户 ID：32 字符
- 页面 URL：512 字符
- API URL：512 字符
- API 负载：1024 字符
- 错误信息：255 字符
- 行为日志：1024 字符

## 截图展示

![](./attachments/screenshot_pv.png)

![](./attachments/screenshot_bug.png)

## 技术细节

- **上报方式**：优先使用 `sendBeacon` API，不支持时降级为 `XMLHttpRequest`
- **错误捕获**：通过 `window.addEventListener('error')` 和 `window.addEventListener('unhandledrejection')` 捕获错误
- **API 拦截**：通过重写 `XMLHttpRequest.prototype.open` 和 `XMLHttpRequest.prototype.send` 实现拦截
- **数据格式**：所有数据使用缩写字段名以减少传输大小（如 `projectId` → `pi`）

## 兼容性

- 支持所有现代浏览器（Chrome、Firefox、Safari、Edge 等）
- 支持 IE11+（部分功能可能受限，详见下方说明）

### IE11 兼容性说明

在 IE11 环境中，以下功能会受到影响：

1. **Promise 拒绝监控（unhandledrejection）**
   - **受限原因**：IE11 原生不支持 Promise，也不支持 `unhandledrejection` 事件
   - **影响**：无法自动捕获未处理的 Promise 拒绝错误（如 `Promise.reject()` 未被 catch）
   - **解决方案**：建议在业务代码中主动捕获 Promise 错误，或使用 `BetterMonitor.addBug()` 手动上报

2. **sendBeacon API**
   - **受限原因**：IE11 不支持 `navigator.sendBeacon()` API
   - **影响**：在页面卸载时上报数据时，会降级使用 `XMLHttpRequest`，在极端情况下（如网络中断、页面强制关闭）可能丢失少量数据
   - **解决方案**：功能仍可正常使用，但可靠性略低于现代浏览器

3. **fetch API**
   - **受限原因**：IE11 不支持 `fetch` API
   - **影响**：SDK 会自动降级使用 `XMLHttpRequest`，功能完全可用，无实际影响

**其他功能在 IE11 中均正常工作：**
- ✅ JavaScript 运行时错误监控（`window.addEventListener('error')`）
- ✅ XMLHttpRequest 拦截和 API 监控
- ✅ 用户行为日志记录
- ✅ 页面访问统计（PV/UV）
- ✅ 手动上报功能（`addBug`、`addView`）
- ✅ 日志打印功能（`printLog`、`printWarn`、`printError`）

## 相关链接

- [官方网站](https://www.verybugs.com)
- [项目文档](https://www.verybugs.com/doc.html)
- [GitHub 仓库](https://github.com/Yakima-Teng/better-monitor)
- [NPM 包](https://www.npmjs.com/package/better-monitor)

## 联系我们

如果你使用微信或企业微信，可以扫描下方二维码加入我们的支持群：

![](https://cdn.verysites.com/verysites/static/img/service-support-chat-group.png)

## 许可证

[MIT](LICENSE)
