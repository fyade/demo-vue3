export function getBaseUrl() {
  return import.meta.env.VITE_APP_BASE_URL
}

export function getFileBaseUrl() {
  return import.meta.env.VITE_APP_BASE_URL + '/ufile/'
}