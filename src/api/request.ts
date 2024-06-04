import axios, { AxiosRequestConfig, ResponseType } from 'axios'
import isString from '@/common/isString'
import isFunction from '@/common/isFunction'
import { safeStringify } from '@/utils/utils'

/**
 * @apiAnalyze
 * @since 0.02
 * @param payload {Record<string, any>} 入参
 * @return {Promise<BetterMonitor.IAxiosResponse<T>>}
 *
 * @example
 * ```typescript
 * const addLog = (params: IParamsAddLog) => {
 *   return request<null>({
 *     url: 'https://api.verysites.com/api/verybugs/logs/addLog',
 *     method: 'post',
 *     data: params,
 *   })
 * }
 * const res = addLog(params)
 * // 返回的res.data.data就是调用request时后面<>中传入的类型
 * console.log(res.data.data) // null
 * ```
 */
const cacheRequests = new Map<string, { ts: number, result: Promise<BetterMonitor.IAxiosResponse<any>> }>()
const request = async <T = unknown>(payload: BetterMonitor.IPayloadRequest): Promise<BetterMonitor.IAxiosResponse<T>> => {
  const startTime = Date.now()
  const url = payload.url || ''
  const method = payload.method || 'get'
  const params = payload.params || {}
  const data = payload.data || {}
  const headers = payload.headers || {}
  const { responseType } = payload
  const timeout = payload.timeout || 60000

  const cacheTime = payload.cacheTime || 0
  let cacheKey = ''
  if (cacheTime > 0) {
    if (payload.cacheKey) {
      if (isString(payload.cacheKey)) {
        cacheKey = payload.cacheKey
      } else if (isFunction(payload.cacheKey)) {
        cacheKey = payload.cacheKey()
      }
    }
    if (!cacheKey) {
      cacheKey = safeStringify({
        url, method, params, data
      })
    }
    if (cacheRequests.has(cacheKey)) {
      const { ts, result } = cacheRequests.get(cacheKey) as { ts: number, result: Promise<BetterMonitor.IAxiosResponse<any>> }
      // 缓存过期失效
      if (startTime - ts > cacheTime) {
        cacheRequests.delete(cacheKey)
      } else {
        return result
      }
    }
  }

  // @ts-ignore
  const axiosConfig: AxiosRequestConfig = {
    url,
    method,
    headers,
    params,
    data,
    timeout
  }
  if (responseType) {
    axiosConfig.responseType = <ResponseType>responseType
  }

  if (data instanceof FormData) {
    headers['Content-Type'] = 'multipart/form-data'
  }

  try {
    const returnResult = axios(axiosConfig) as Promise<BetterMonitor.IAxiosResponse<any>>
    if (cacheTime > 0) {
      cacheRequests.set(cacheKey, {
        ts: startTime,
        result: returnResult
      })
    }
    return returnResult
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.message)
    }
    throw new Error('An unexpected error occurred')
  }
}

export default request
