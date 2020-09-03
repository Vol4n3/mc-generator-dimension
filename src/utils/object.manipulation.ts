export const updateItemInObject = <T>(current: T, key: string, value: any): T => {
  return {...current, [key]: value};
}
export const removeItemInObject = <T>(current: T, key: keyof T): Pick<T, Exclude<keyof T, keyof T>> => {
  const {[key]: omit, ...extract} = current;
  return extract;
}
export const updateItemInArray = <T>(current: T[], index: number, value: T): T[] => {
  return current.map((item, i) => i === index ? value : item)
}
export const removeItemInArray = <T>(current: T[], index: number): T[] => {
  return current.filter((_, i) => i !== index);
}