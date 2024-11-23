export const safeStringify = (value: any): string => {
  try {
    return JSON.stringify(value)
  } catch (err) {
    try {
      return JSON.stringify(Object.keys(value).reduce((prev, curr) => {
        prev[curr] = String(value[curr])
        return prev
      }, {} as Record<string, string>))
    } catch (e2: any) {
      return JSON.stringify({
        type: 'error',
        msg: e2?.message || ''
      })
    }
  }
}
