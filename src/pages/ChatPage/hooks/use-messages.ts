import { useState } from 'react'
import type { Message } from '@/types/chat'

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([])

  function addMessage(message: Message) {
    setMessages((prevMessages) => [...prevMessages, message])
  }

  function updateMessage(id: string, changes: Partial<Message>) {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === id ? { ...message, ...changes } : message,
      ),
    )
  }

  return { messages, addMessage, updateMessage }
}
