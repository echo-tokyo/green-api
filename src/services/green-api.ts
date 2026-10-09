import axios from 'axios'
import type {
  Credentials,
  Notification,
  SendMessageResponse,
  StateInstanceResponse,
} from '@/types/green-api'

const CREDENTIALS_KEY = 'green-api-credentials'
const RECEIVE_TIMEOUT_SECONDS = 20

function getCredentials(): Credentials | null {
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

const api = axios.create()

api.interceptors.request.use((config) => {
  const credentials = getCredentials()

  if (!credentials) {
    throw new Error('GREEN-API credentials are not set')
  }

  const { idInstance, apiTokenInstance } = credentials
  const serverId = idInstance.slice(0, 4)
  const [method, ...params] = (config.url ?? '').split('/')

  config.baseURL = `https://${serverId}.api.green-api.com/waInstance${idInstance}`
  config.url = [method, apiTokenInstance, ...params].join('/')

  return config
})

export async function getStateInstance(): Promise<string> {
  const response = await api.get<StateInstanceResponse>('getStateInstance')

  return response.data.stateInstance
}

export async function sendMessage(
  chatId: string,
  message: string,
): Promise<string> {
  const response = await api.post<SendMessageResponse>('sendMessage', {
    chatId,
    message,
  })

  return response.data.idMessage
}

export async function receiveNotification(
  signal?: AbortSignal,
): Promise<Notification | null> {
  const response = await api.get<Notification | null>('receiveNotification', {
    params: { receiveTimeout: RECEIVE_TIMEOUT_SECONDS },
    signal,
  })

  return response.data
}

export async function deleteNotification(receiptId: number): Promise<void> {
  await api.delete(`deleteNotification/${receiptId}`)
}
