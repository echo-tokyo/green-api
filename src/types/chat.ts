export type MessageDirection = 'incoming' | 'outgoing'

export interface Message {
  id: string
  chatId: string
  text: string
  timestamp: number
  direction: MessageDirection
}

export interface Chat {
  id: string
  name: string
}
