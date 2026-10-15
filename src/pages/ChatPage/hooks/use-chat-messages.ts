import { useMessagesStore } from '@/store/messages-store'
import type { Message } from '@/types/message'

const NO_MESSAGES: Message[] = []

export function useChatMessages(chatId: string): Message[] {
  return useMessagesStore(
    (state) => state.messagesByChat[chatId] ?? NO_MESSAGES,
  )
}
