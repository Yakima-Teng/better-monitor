import path from 'path'
import gulp from 'gulp'
import { buildLib } from '#build/build-lib'

const doTask = async () => {
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
}

doTask().catch((err) => {
  throw err
})
