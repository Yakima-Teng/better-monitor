/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const gulp = require('gulp')
const { buildLib } = require('./build-lib')
/* eslint-enable @typescript-eslint/no-var-requires */

// eslint-disable-next-line no-void
void (async () => {
  await buildLib()
  gulp.watch(
    [
      path.join(__dirname, '../src/**/*')
    ],
    async () => {
      // eslint-disable-next-line no-console
      console.log('检测到文件变动：src/**/*')
      await buildLib()
    }
  )
})()
