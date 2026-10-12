import type { NotificationBody } from '@/types/green-api'
import { delay } from '@/utils/delay'
import { deleteNotification, receiveNotification } from './green-api'

const INITIAL_RETRY_DELAY_MS = 5000
const MAX_RETRY_DELAY_MS = 60_000

export async function pollNotifications(
  signal: AbortSignal,
  onNotification: (body: NotificationBody) => void,
): Promise<void> {
  let retryDelay = INITIAL_RETRY_DELAY_MS

  while (!signal.aborted) {
    try {
      const notification = await receiveNotification(signal)

      retryDelay = INITIAL_RETRY_DELAY_MS

      if (!notification) continue

      onNotification(notification.body)
      await deleteNotification(notification.receiptId)
    } catch {
      await delay(retryDelay, signal)
      retryDelay = Math.min(retryDelay * 2, MAX_RETRY_DELAY_MS)
    }
  }
}
