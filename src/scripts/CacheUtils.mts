const cacheRequests= new Map<
  string,
  { ts: number; result: unknown }
>()

export function cache<T>(
  key: string,
  timeout: number,
  fn: () => Promise<T>
): Promise<T> {
  const cached = cacheRequests.get(key)
  if (cached && cached.ts + timeout > Date.now()) {
    return Promise.resolve(cached.result as T)
  }
  return fn().then((result) => {
    cacheRequests.set(key, { ts: Date.now(), result })
    return result
  })
}
