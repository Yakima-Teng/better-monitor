import dayjs from 'dayjs'
import { buildLib } from '#build/build-lib'

// eslint-disable-next-line no-void
void (async () => {
  const startTime = dayjs()
  await buildLib()
  const endTime = dayjs()
  const duration = endTime.diff(startTime, 'seconds')
  // eslint-disable-next-line no-console
  console.log(`编译耗时：${duration}秒`)
})()
