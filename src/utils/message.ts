import type { Message } from '@/types/chat'
import type { NotificationBody } from '@/types/green-api'

const INCOMING_MESSAGE_TYPE = 'incomingMessageReceived'
const MS_IN_SECOND = 1000

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

export function parseIncomingMessage(body: NotificationBody): Message | null {
  if (body.typeWebhook !== INCOMING_MESSAGE_TYPE) return null

  const text = body.messageData?.textMessageData?.textMessage
  const senderPhone = body.senderData?.senderPhoneNumber

  if (!body.idMessage || !text || !senderPhone) return null

  return {
    id: body.idMessage,
    chatId: String(senderPhone),
    text,
    timestamp: body.timestamp * MS_IN_SECOND,
    direction: 'incoming',
    status: 'sent',
  }
}
