import axios, { isAxiosError, isCancel, type AxiosError } from 'axios'
import { toast } from 'sonner'
import type {
  Notification,
  SendMessageResponse,
  StateInstanceResponse,
} from '@/types/green-api'
import { getCredentials } from './credentials'

const RECEIVE_TIMEOUT_SECONDS = 20

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

function getErrorMessage(error: AxiosError): string {
  if (!error.response) return 'Нет соединения с GREEN-API'

  if (error.response.status === 401) {
    return 'Неверный idInstance или apiTokenInstance'
  }

  return `Ошибка запроса к GREEN-API (код ${error.response.status})`
}

api.interceptors.response.use(undefined, (error: unknown) => {
  if (isAxiosError(error) && !isCancel(error)) {
    toast.error(getErrorMessage(error))
  }

  return Promise.reject(error)
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
