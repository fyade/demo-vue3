// export function blobToUnit8Array(blob: Blob): Promise<any> {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = () => {
//       const arrayBuffer = reader.result;
//       const unit8Array = new Uint8Array(arrayBuffer);
//       resolve(unit8Array)
//     }
//     reader.onerror = (error) => {
//       reject(error)
//     }
//     reader.readAsArrayBuffer(blob)
//   })
// }

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
