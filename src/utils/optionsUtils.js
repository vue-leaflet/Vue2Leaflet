export function mergeIgnoreUndefined () {
  const result = {};
  for (let i = 0; i < arguments.length; ++i) {
    const curObj = arguments[i];
    for (let key in curObj) {
      if (curObj[key] !== undefined) {
        result[key] = curObj[key];
      }
    }
  }
  return result;
}
