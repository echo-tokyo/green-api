import { toast } from 'sonner'
import {
  getApiErrorMessage,
  isUnauthorizedError,
} from '@/services/api/api-error'
import { sendMessage } from '@/services/api/green-api'
import { toPhoneChatId } from '@/utils/phone'
import { createOutgoingMessage } from '../lib/message'
import type { Message } from '../lib/types'

interface UseSendMessageOptions {
  phone: string
  addMessage: (message: Message) => void
  updateMessage: (id: string, changes: Partial<Message>) => void
}

export function useSendMessage({
  phone,
  addMessage,
  updateMessage,
}: UseSendMessageOptions) {
  async function send(text: string) {
    const message = createOutgoingMessage(phone, text)

    addMessage(message)

    try {
      await sendMessage(toPhoneChatId(phone), text)
      updateMessage(message.id, { status: 'sent' })
    } catch (error) {
      updateMessage(message.id, { status: 'failed' })

      if (!isUnauthorizedError(error)) toast.error(getApiErrorMessage(error))
    }
  }

  return send
}
