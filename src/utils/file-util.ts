/**
 * 数值转带单位的大小
 * @param size
 */
export const getSize = (size: string | number): string => {
  const unit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
  let s = Number(size)
  let index = 0
  while (s >= 1024) {
    s /= 1024
    index++
  }
  return `${Number(s.toFixed(2))}${unit[index]}`
}

/**
 * blob转文件
 * @param blob
 * @param fileName
 * @param type
 */
export const blobToFile = (blob: Blob, fileName: string, type: any): File => {
  return new File([blob], fileName, {type})
}
