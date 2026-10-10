import type {
  Notification,
  SendMessageResponse,
  StateInstanceResponse,
} from '@/types/green-api'
import { api } from './api'

const RECEIVE_TIMEOUT_SECONDS = 20

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
    silent: true,
  })

  return response.data
}

export async function deleteNotification(receiptId: number): Promise<void> {
  await api.delete(`deleteNotification/${receiptId}`, { silent: true })
}
