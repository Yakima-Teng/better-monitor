import { getStore, updateStore } from '@/store'
import getLocalStorage from '@/storage/getLocalStorage'

const getUserId = () => {
  const store = getStore()
  if (typeof store.userId !== 'undefined') {
    return store.userId
  }
  if (typeof store.getUserId === 'function') {
    const gettingUserId: string | number | Promise<string | number> = store.getUserId()
    if (gettingUserId instanceof Promise) {
      // 这里不需要等promise返回结果后再返回，这里对实时性要求没有这么高，先返回0，同时异步更新userId即可
      gettingUserId
        .then((userId) => {
          updateStore({ userId })
        })
        .catch((err: any) => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
      return 0
    }
    updateStore({ userId: gettingUserId })
    return gettingUserId
  }
  // 这段代码后续可以去掉，这里直接return 0
  const user = getLocalStorage('user')
  return Number(user?.id || 0)
}

export default getUserId
