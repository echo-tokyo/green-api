import { create } from 'zustand'
import type { Message } from '@/types/message'

interface MessagesState {
  messagesByChat: Record<string, Message[]>
  addMessage: (message: Message) => void
  updateMessage: (message: Message, changes: Partial<Message>) => void
  clearMessages: () => void
}

export const useMessagesStore = create<MessagesState>()((set) => ({
  messagesByChat: {},

  addMessage: (message) =>
    set(({ messagesByChat }) => {
      const chatMessages = messagesByChat[message.chatId] ?? []
      const isDuplicate = chatMessages.some(({ id }) => id === message.id)

      if (isDuplicate) return {}

      return {
        messagesByChat: {
          ...messagesByChat,
          [message.chatId]: [...chatMessages, message],
        },
      }
    }),

  updateMessage: ({ id, chatId }, changes) =>
    set(({ messagesByChat }) => {
      const chatMessages = messagesByChat[chatId] ?? []

      return {
        messagesByChat: {
          ...messagesByChat,
          [chatId]: chatMessages.map((message) =>
            message.id === id ? { ...message, ...changes } : message,
          ),
        },
      }
    }),

  clearMessages: () => set({ messagesByChat: {} }),
}))
