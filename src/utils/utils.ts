import inspect from 'object-inspect'

export const safeStringify = (value: any): string => {
  try {
    if (typeof value === 'string') {
      return value
    }
    return inspect(value)
  } catch (err) {
    try {
      return JSON.stringify(
        Object.keys(value).reduce(
          (prev, curr) => {
            prev[curr] = String(value[curr])
            return prev
          },
          {} as Record<string, string>
        )
      )
    } catch (e2: any) {
      return JSON.stringify({
        type: 'error',
        msg: e2?.message || ''
      })
    }
  }
}
