import type { Message } from '@/types/chat'

export function createOutgoingMessage(chatId: string, text: string): Message {
  return {
    id: crypto.randomUUID(),
    chatId,
    text,
    timestamp: Date.now(),
    direction: 'outgoing',
    status: 'sending',
  }
}
