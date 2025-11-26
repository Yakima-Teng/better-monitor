# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.1.13](https://github.com/Yakima-Teng/better-monitor/compare/v0.1.12...v0.1.13) (2025-11-26)


### Features

* **api:** implement token request deduplication in getProjectId function ([a7fa77f](https://github.com/Yakima-Teng/better-monitor/commit/a7fa77f5f6560ddfa324109b20ddaf1616ba4db0))
* **api:** refactor bug, view, and action reporting to support asynchronous projectId retrieval ([e7806c6](https://github.com/Yakima-Teng/better-monitor/commit/e7806c6a2d2f87d99683ea885c2a4da01e212aa3))

### [0.1.12](https://github.com/Yakima-Teng/better-monitor/compare/v0.1.11...v0.1.12) (2025-11-06)

### [0.1.11](https://github.com/Yakima-Teng/better-monitor/compare/v0.1.10...v0.1.11) (2025-11-05)


### Features

* **bugs:** 增加事件上报接口并优化消费者配置 ([420ca3f](https://github.com/Yakima-Teng/better-monitor/commit/420ca3f8943cbab2d467b67ca7558978cedef068))
* **monitor:** add event tracking functionality ([98b58f6](https://github.com/Yakima-Teng/better-monitor/commit/98b58f6fc0f3177d4ba0c7580ca58cb1178e9cd3))

### [0.1.10](https://github.com/Yakima-Teng/better-monitor/compare/v0.1.9...v0.1.10) (2025-11-04)


### Bug Fixes

* **view:** update addViewBeforeUnload function to remove async and handle document ready state ([c8fd481](https://github.com/Yakima-Teng/better-monitor/commit/c8fd4819f739ede3a84ba9e7de10d34912489b58))

### [0.1.9](https://github.com/Yakima-Teng/better-monitor/compare/v0.1.8...v0.1.9) (2025-11-04)


### Bug Fixes

* **types:** correct default export declaration in type definitions ([e372d3d](https://github.com/Yakima-Teng/better-monitor/commit/e372d3d5f6497f83dff6010f45bbe3f0621bb7de))

### [0.1.8](https://github.com/Yakima-Teng/better-monitor/compare/v0.1.7...v0.1.8) (2025-11-04)

### [0.1.7](https://github.com/Yakima-Teng/better-monitor/compare/v0.1.6...v0.1.7) (2025-11-04)


### Features

* **types:** add type definitions and update log level ([0774dd1](https://github.com/Yakima-Teng/better-monitor/commit/0774dd1dafdb95c323be61c6a51d6cc01ee281c2))

### [0.1.6](https://github.com/Yakima-Teng/better-monitor/compare/v0.1.5...v0.1.6) (2025-11-04)


### Features

* **deploy:** add npm publish step to deploy script ([d166782](https://github.com/Yakima-Teng/better-monitor/commit/d1667824118ca9722844232f6e27b3d13b34dd93))

### [0.1.5](https://github.com/Yakima-Teng/better-monitor/compare/v0.1.4...v0.1.5) (2025-11-03)


### Features

* **monitor:** enhance userId generation with custom strategy ([26139ad](https://github.com/Yakima-Teng/better-monitor/commit/26139adb7a6123fd1cc249ec73f8ece4ea15832e))

### [0.1.4](https://github.com/Yakima-Teng/better-monitor/compare/v0.1.1...v0.1.4) (2025-11-03)


### Features

* **monitor:** implement field length limits ([e2f61b2](https://github.com/Yakima-Teng/better-monitor/commit/e2f61b2ea054f80a6565e8e3369dadb7d25c44c8))
* **user:** implement robust user ID generation mechanism ([f5246a9](https://github.com/Yakima-Teng/better-monitor/commit/f5246a9630c62979303af86e456a6100cff4ae42))
* **view:** add sdk parameter to view tracking ([d37e0f9](https://github.com/Yakima-Teng/better-monitor/commit/d37e0f9996d79fe34690626886fda081087205c3))

### [0.1.3](https://github.com/Yakima-Teng/better-monitor/compare/v0.1.2...v0.1.3) (2025-11-02)


### Features

* **user:** implement robust user ID generation mechanism ([f5246a9](https://github.com/Yakima-Teng/better-monitor/commit/f5246a9630c62979303af86e456a6100cff4ae42))

### 0.1.2 (2025-11-02)


### Features

* add timestamp to error and API logs ([b841e9c](https://github.com/Yakima-Teng/better-monitor/commit/b841e9c938b5e6f85f2a1e303195883a8fdb3f83))
* **better-monitor:** 添加多种日志打印和时间测量功能 ([dbfb42a](https://github.com/Yakima-Teng/better-monitor/commit/dbfb42a01c62a77cc4bd2896749f9e5cc610887a))
* **log:** transfer logLevel to numbers 0, 1, 2 ([c96c72b](https://github.com/Yakima-Teng/better-monitor/commit/c96c72b59a1312385cff88e56405d598f210e9a0))
* **monitor:** add ajax request functionality ([5197665](https://github.com/Yakima-Teng/better-monitor/commit/5197665201e22dcc141fd94228494b0a0f44e577))
* **monitor:** enhance test page UI and organization ([7854764](https://github.com/Yakima-Teng/better-monitor/commit/7854764f4dd4a472fecede44fd2905a9089c18b8))
* **monitor:** implement field length limits ([e2f61b2](https://github.com/Yakima-Teng/better-monitor/commit/e2f61b2ea054f80a6565e8e3369dadb7d25c44c8))
* **monitor:** make signature of functions addBug/addView compatible with legacy ones ([a2335a9](https://github.com/Yakima-Teng/better-monitor/commit/a2335a94595e0fc399984fd01fa951b43f30cd11))
* **types:** combine multiple type definition files into one file ([e9528fb](https://github.com/Yakima-Teng/better-monitor/commit/e9528fbaabc6bcf84689b3462409cad51c912bcb))
* **view:** add sdk parameter to view tracking ([d37e0f9](https://github.com/Yakima-Teng/better-monitor/commit/d37e0f9996d79fe34690626886fda081087205c3))
* **webpack:** 禁用开发服务器错误遮罩层 ([c2da3ea](https://github.com/Yakima-Teng/better-monitor/commit/c2da3ea2602a9e50dde5bddba7097c0cdde98949))
* **webpack:** 添加HTML脚本标签自定义属性注入功能 ([3f85acd](https://github.com/Yakima-Teng/better-monitor/commit/3f85acd4d012b11386834e75ccc2a5d6fb7674a3))


### Bug Fixes

* **api:** remove extra slash in addApis endpoint URL ([191e8cf](https://github.com/Yakima-Teng/better-monitor/commit/191e8cfdfce087ef2805cb737acb4589533f9748))
* **bugs:** 统一userId类型为字符串 ([99ad015](https://github.com/Yakima-Teng/better-monitor/commit/99ad015af4ce978e7913de05e1f2aef377792c48))
* **build:** 修复CDN路径前缀在不同环境下的配置问题 ([6b02384](https://github.com/Yakima-Teng/better-monitor/commit/6b0238489fe32dd0f24c2a90ab6ae206847f28e0))
* Cannot read properties of undefined (reading 'Stream') ([a126868](https://github.com/Yakima-Teng/better-monitor/commit/a126868a87cfd4ba645f6d4de449426355f567f3))
