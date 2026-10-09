import { toast } from 'sonner'
import type { Credentials } from '@/types/green-api'
import { clearCredentials, saveCredentials } from './credentials'
import { getStateInstance } from './green-api'

const AUTHORIZED_STATE = 'authorized'

async function isInstanceAuthorized(): Promise<boolean> {
  try {
    const state = await getStateInstance()
    const isAuthorized = state === AUTHORIZED_STATE

    if (!isAuthorized) toast.error('Инстанс не авторизован в Telegram')

    return isAuthorized
  } catch {
    return false
  }
}

export async function authorize(credentials: Credentials): Promise<boolean> {
  saveCredentials(credentials)

  const isAuthorized = await isInstanceAuthorized()

  if (!isAuthorized) clearCredentials()

  return isAuthorized
}

export function logout(): void {
  clearCredentials()
}
