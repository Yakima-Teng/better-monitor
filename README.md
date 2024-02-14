# better-monitor

<div align="center" style="display: flex;align-items: center;justify-content: center;gap:8px;">
  <img style="width:200px;" src="https://github.com/Yakima-Teng/better-monitor/raw/main/attachments/logo.svg">
</div>

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

> JS SDK used to report data to server for better website monitoring.

## Features

- 🔥 Report PV (page view) data. So you can know which pages are visited and among them which pages are the most commonly visited.
- 🔥 Report UV (user view) data. So you can know how many users visited your project.
- 🔥 Report BV (browser view) data. So you can know which OS (operating systems) and browsers are used to visit your project, and you can then define your frontend compatibility plan.
- 🔥 Report api request and response data. Our sdk can monitor your AJAX request triggered by raw XMLHttpRequest, Axios, jQuery and so on. So you can find which apis are slow in response time.
- 🔥 Report JavaScript runtime bugs data.
- 🔥 Report user actions data, in time order.

## Usage

### Get your project ID

First, you need to register and login the [admin panel](https://www.verybugs.com/admin/) to get your project id.

![](./attachments/get-project-id.png)

### Include SDK and config

#### Install via NPM (RECOMMENDED)

Install better-monitor as your package dependency:

```bash
npm install -S better-monitor
```

And then you can initialize BetterMonitor configuration like below:

```javascript
import BetterMonitor from 'better-monitor'

BetterMonitor.init({
  // fill in your project ID here
  projectId: 1,
})
```

#### Install via HTML Script

Include the SDK through HTML Script element and config directly on the script element.

```html
<!-- data-project-id is where you fill in your project ID -->
<script crossorigin="anonymous" data-project-id="1" src="https://cdn.jsdelivr.net/npm/better-monitor@0.0.4/dist/better-monitor.min.js"></script>
```

## APIs

The SDK exports some useful api:

### BetterMonitor.printLog

`BetterMonitor.printLog` is almost the same as `console.log` except for the following differences:

- Outputted logs will be prefixed with date string.
- Logs will be reported to the server with log level set to `log`, so you can view them in the admin panel.

```javascript
BetterMonitor.printLog('test')
BetterMonitor.printLog('test', { a: 1 }, 'hello')
```

And the output is like:

![](./attachments/log-api-example.png)

### BetterMonitor.printWarn

Like `BetterMonitor.printLog` but diff in:

- Text color is between yellow and brown.
- Log level is set to `warn`.

### BetterMonitor.printError

Like `BetterMonitor.printLog` but diff in:

- Text color is red.
- Log level is set to `error`.

### BetterMonitor.logTime, BetterMonitor.logTimeEnd

`BetterMonitor.logTime` and `BetterMonitor.logTimeEnd` should be used together, like `console.time` and `console.timeEnd`. But they differ from `console.time` and `console.timeEnd` in that:

- If time duration is less than 100ms, output text will be attached with `quick` note, and reporting log level will be set to `log`.
- If time duration is equal to or greater than 100ms, output text will be attached with `slow` note, and reporting log level will be set to `error`.

So you can quickly filter and find slow actions.

### BetterMonitor.addView, BetterMonitor.addBug, BetterMonitor.init

These apis are rarely used, please refer to the source code.

## Snapshots

**Dashboard:**

![Dashboard](./attachments/dashboard.png)

**Api log:**

![API log](./attachments/api-log.png)

**Bug log:**

![Bug management](./attachments/bug-log.png)

**User action log list:**

![Action log list](./attachments/action-log.png)

**User action log file:**

![Action log file](./attachments/action-log-file.png)

**Project management:**

![Project management](./attachments/project-management.png)

## License

MIT.
