import type { Credentials } from '@/types/green-api'

const CREDENTIALS_KEY = 'green-api-credentials'

export function getCredentials(): Credentials | null {
  const value = sessionStorage.getItem(CREDENTIALS_KEY)

  return value ? JSON.parse(value) : null
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
