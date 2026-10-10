import type { NotificationBody } from '@/types/green-api'
import { delay } from '@/utils/delay'
import { deleteNotification, receiveNotification } from './green-api'

const RETRY_DELAY_MS = 5000

export async function pollNotifications(
  signal: AbortSignal,
  onNotification: (body: NotificationBody) => void,
): Promise<void> {
  while (!signal.aborted) {
    try {
      const notification = await receiveNotification(signal)

      if (!notification) continue

      onNotification(notification.body)
      await deleteNotification(notification.receiptId)
    } catch {
      await delay(RETRY_DELAY_MS, signal)
    }
  }
}
