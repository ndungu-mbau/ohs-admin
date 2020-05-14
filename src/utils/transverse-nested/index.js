export default (obj, prop) => {
  const propList = prop.split('.')

  const final = propList.reduce((val, curr) => {
    return val !== undefined && val !== null ? val[curr] : typeof val !== 'object' ? undefined : ""
  },obj)

  return final
}