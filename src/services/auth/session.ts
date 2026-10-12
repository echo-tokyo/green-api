import { resolveApiUrl } from '@/services/api/api-url'
import { getStateInstance } from '@/services/api/green-api'
import type { Credentials } from '@/types/green-api'
import { clearCredentials, saveCredentials } from './credentials'

const AUTHORIZED_STATE = 'authorized'

export async function authorize(credentials: Credentials): Promise<boolean> {
  const apiUrl = resolveApiUrl(credentials.apiUrl, credentials.idInstance)

  saveCredentials({ ...credentials, apiUrl })

  try {
    const state = await getStateInstance()
    const isAuthorized = state === AUTHORIZED_STATE

    if (!isAuthorized) clearCredentials()

    return isAuthorized
  } catch (error) {
    clearCredentials()
    throw error
  }
}

export function logout(): void {
  clearCredentials()
}
