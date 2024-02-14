# better-monitor

<div align="center" style="text-align:center;">
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

## Install

### Install via NPM (RECOMMENDED)

```bash
npm install -S better-monitor
```

### Install via HTML Script

```html
<script src="https://cdn.jsdelivr.net/npm/better-monitor@0.0.3/dist/better-monitor.min.js"></script>
```

## Usage

First, you need to register and login the [admin panel](https://www.verybugs.com/admin/) to get your project id.

![](./attachments/get-project-id.png)

Then you can initialize BetterMonitor configuration like below:

```javascript
import BetterMonitor from 'better-monitor' // This line is unnecessary if you use HTML Script tag to include the SDK

BetterMonitor.init({
  projectId: 1,
})
```

That's all.

However, if you want to config more details, please refer to our [document on github](https://yakima-teng.github.io/better-monitor/) or [document on verybugs.com](https://www.verybugs.com/better-monitor/).

## Features

- 🔥 Report PV (page view) data. So you can know which pages are visited and among them which pages are the most commonly visited.
- 🔥 Report UV (user view) data. So you can know how many users visited your project.
- 🔥 Report BV (browser view) data. So you can know which OS (operating systems) and browsers are used to visit your project, and you can then define your frontend compatibility plan.
- 🔥 Report api request and response data. Our sdk can monitor your AJAX request triggered by raw XMLHttpRequest, Axios and so on. So you can find which apis are slow in response time.
- 🔥 Report JavaScript runtime bugs data.
- 🔥 Report user actions data, in time order.

## License

[MIT](./LICENSE).
