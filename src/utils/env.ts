export function getBaseUrl(): string {
  return import.meta.env.VITE_APP_BASE_URL
}

export function getFileBaseUrl(): string {
  return import.meta.env.VITE_APP_BASE_URL + '/ufile/'
}