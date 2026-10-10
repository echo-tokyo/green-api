import { sendMessage } from '@/services/green-api'
import type { Message } from '@/types/chat'
import { createOutgoingMessage } from '@/utils/message'
import { toPhoneChatId } from '@/utils/phone'

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
    } catch {
      updateMessage(message.id, { status: 'failed' })
    }
  }

  return send
}
