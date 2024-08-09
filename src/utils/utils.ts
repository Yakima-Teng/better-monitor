// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value#examples
function getCircularReplacer() {
  const ancestors: any[] = []
  return function (key: string, value: any) {
    if (typeof value !== 'object' || value === null) {
      return value
    }
    // `this` is the object that value is contained in,
    // i.e., its direct parent.
    // @ts-ignore
    while (ancestors.length > 0 && ancestors.at(-1) !== this) {
      ancestors.pop()
    }
    if (ancestors.includes(value)) {
      return '[Circular]'
    }
    ancestors.push(value)
    return value
  }
}

export const safeStringify = (value: any): string => {
  try {
    return JSON.stringify(value)
  } catch (err) {
    try {
      return JSON.stringify(value, getCircularReplacer())
    } catch (e) {
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
}
