export const replace = (array) => ({at: (index) => ({with: (item) => {
  const nextArray = array.concat()
  nextArray[index] = item
  return nextArray
}})})
