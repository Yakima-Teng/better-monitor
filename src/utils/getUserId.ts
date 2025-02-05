import { getStore, updateStore } from '@/store'
import getLocalStorage from '@/storage/getLocalStorage'

const getUserId = (): string => {
  const store = getStore()
  if (store.userId) {
    return store.userId
  }
  if (typeof store.getUserId === 'function') {
    const gettingUserId: string | Promise<string> = store.getUserId()
    if (gettingUserId instanceof Promise) {
      // 这里不需要等promise返回结果后再返回，这里对实时性要求没有这么高，先返回0，同时异步更新userId即可
      gettingUserId
        .then((userId) => {
          updateStore({ userId: String(userId) })
        })
        .catch((err: any) => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
      return ''
    }
    updateStore({ userId: gettingUserId })
    return gettingUserId
  }
  // 这段代码后续可以去掉，这里直接return 0
  const user = getLocalStorage('user')
  return String(user?.id || '')
}

export default getUserId
