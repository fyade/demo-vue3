import axios from "axios";

export function downloadFullFile(url: string, name: string, downloadProgress: Function): void {
  axios({
    url,
    method: 'GET',
    responseType: 'blob',
    onDownloadProgress: evt => {
      downloadProgress && downloadProgress(evt)
    }
  }).then(res => {
    const a = document.createElement('a')
    a.setAttribute('href', window.URL.createObjectURL(res.data))
    a.setAttribute('download', name)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  })
}
