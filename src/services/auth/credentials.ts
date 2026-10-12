import type { Credentials } from '@/types/green-api'

const CREDENTIALS_KEY = 'green-api-credentials'

function isCredentials(value: unknown): value is Credentials {
  if (typeof value !== 'object' || value === null) return false

  const hasIdInstance =
    'idInstance' in value && typeof value.idInstance === 'string'
  const hasApiToken =
    'apiTokenInstance' in value && typeof value.apiTokenInstance === 'string'
  const hasApiUrl = 'apiUrl' in value && typeof value.apiUrl === 'string'

  return hasIdInstance && hasApiToken && hasApiUrl
}

function parseCredentials(value: string): Credentials | null {
  try {
    const parsed: unknown = JSON.parse(value)

    return isCredentials(parsed) ? parsed : null
  } catch {
    return null
  }
}

export function getCredentials(): Credentials | null {
  const value = sessionStorage.getItem(CREDENTIALS_KEY)

  return value ? parseCredentials(value) : null
}

export function saveCredentials(credentials: Credentials): void {
  sessionStorage.setItem(CREDENTIALS_KEY, JSON.stringify(credentials))
}

export function clearCredentials(): void {
  sessionStorage.removeItem(CREDENTIALS_KEY)
}

export function hasCredentials(): boolean {
  return getCredentials() !== null
}
