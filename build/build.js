/* eslint-disable @typescript-eslint/no-var-requires */
const dayjs = require('dayjs')
const { buildLib } = require('./build-lib')
const { updateVersion } = require('./update-version.cjs')
/* eslint-enable @typescript-eslint/no-var-requires */

// eslint-disable-next-line no-void
void (async () => {
  const startTime = dayjs()
  await updateVersion()
  await buildLib()
  const endTime = dayjs()
  const duration = endTime.diff(startTime, 'seconds')
  // eslint-disable-next-line no-console
  console.log(`编译耗时：${duration}秒`)
})()
