const SERVER_ID_LENGTH = 4
const GREEN_API_DOMAIN = '.green-api.com'
const TRAILING_SLASHES = /\/+$/

export function getDefaultApiUrl(idInstance: string): string {
  const serverId = idInstance.slice(0, SERVER_ID_LENGTH)

  return `https://${serverId}.api.green-api.com`
}

export function resolveApiUrl(apiUrl: string, idInstance: string): string {
  const normalizedApiUrl = apiUrl.replace(TRAILING_SLASHES, '')

  return normalizedApiUrl || getDefaultApiUrl(idInstance)
}

export function isValidApiUrl(value: string): boolean {
  if (!URL.canParse(value)) return false

  const { protocol, hostname } = new URL(value)

  return protocol === 'https:' && hostname.endsWith(GREEN_API_DOMAIN)
}
