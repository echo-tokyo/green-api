import type { Message } from '@/types/chat'

const MINUTE = 60_000
const DAY = 86_400_000
const now = Date.now()

export const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    chatId: 'mock',
    text: 'Привет! Это сообщение со вчерашнего дня',
    timestamp: now - DAY,
    direction: 'incoming',
  },
  {
    id: '2',
    chatId: 'mock',
    text: 'Привет 👋',
    timestamp: now - DAY + MINUTE,
    direction: 'outgoing',
  },
  {
    id: '3',
    chatId: 'mock',
    text: 'Длинное сообщение, чтобы проверить перенос строк и то, как время прижимается к правому нижнему углу пузыря, когда текст занимает несколько строк.',
    timestamp: now - 10 * MINUTE,
    direction: 'incoming',
  },
  {
    id: '4',
    chatId: 'mock',
    text: 'Многострочное\nсообщение\nс переносами',
    timestamp: now - 5 * MINUTE,
    direction: 'outgoing',
  },
]
