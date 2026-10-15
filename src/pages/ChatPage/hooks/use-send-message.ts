import { toast } from 'sonner'
import {
  getApiErrorMessage,
  isUnauthorizedError,
} from '@/services/api/api-error'
import { sendMessage } from '@/services/api/green-api'
import { useMessagesStore } from '@/store/messages-store'
import { createOutgoingMessage } from '@/utils/message'
import { toPhoneChatId } from '@/utils/phone'

export function useSendMessage(phone: string) {
  const addMessage = useMessagesStore((state) => state.addMessage)
  const updateMessage = useMessagesStore((state) => state.updateMessage)

  async function send(text: string) {
    const message = createOutgoingMessage(phone, text)

    addMessage(message)

    try {
      await sendMessage(toPhoneChatId(phone), text)
      updateMessage(message, { status: 'sent' })
    } catch (error) {
      updateMessage(message, { status: 'failed' })

      if (!isUnauthorizedError(error)) toast.error(getApiErrorMessage(error))
    }
  }

  return send
}
