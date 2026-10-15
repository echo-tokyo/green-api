import { describe, expect, it } from 'vitest'
import type { NotificationBody } from '@/types/green-api'
import { createOutgoingMessage, parseIncomingMessage } from './message'

function createNotification(
  overrides: Partial<NotificationBody> = {},
): NotificationBody {
  return {
    typeWebhook: 'incomingMessageReceived',
    timestamp: 1_763_115_112,
    idMessage: 'message-id',
    senderData: {
      chatId: '10000000',
      senderName: 'Василиса',
      senderPhoneNumber: 79876543210,
    },
    messageData: {
      typeMessage: 'textMessage',
      textMessageData: { textMessage: 'Привет от Green-API!' },
    },
    ...overrides,
  }
}

describe('createOutgoingMessage', () => {
  it('создаёт исходящее сообщение в статусе отправки', () => {
    const message = createOutgoingMessage('79876543210', 'Привет')

    expect(message).toMatchObject({
      chatId: '79876543210',
      text: 'Привет',
      direction: 'outgoing',
      status: 'sending',
    })
  })

  it('выдаёт каждому сообщению уникальный id', () => {
    const first = createOutgoingMessage('79876543210', 'Привет')
    const second = createOutgoingMessage('79876543210', 'Привет')

    expect(first.id).not.toBe(second.id)
  })
})

describe('parseIncomingMessage', () => {
  it('превращает входящее текстовое уведомление в сообщение', () => {
    expect(parseIncomingMessage(createNotification())).toEqual({
      id: 'message-id',
      chatId: '79876543210',
      text: 'Привет от Green-API!',
      timestamp: 1_763_115_112_000,
      direction: 'incoming',
      status: 'sent',
    })
  })

  it('пропускает уведомления других типов', () => {
    const notification = createNotification({
      typeWebhook: 'outgoingMessageStatus',
    })

    expect(parseIncomingMessage(notification)).toBeNull()
  })

  it('пропускает нетекстовые сообщения', () => {
    const notification = createNotification({
      messageData: { typeMessage: 'imageMessage' },
    })

    expect(parseIncomingMessage(notification)).toBeNull()
  })

  it('пропускает сообщения без номера отправителя', () => {
    const notification = createNotification({
      senderData: { chatId: '10000000' },
    })

    expect(parseIncomingMessage(notification)).toBeNull()
  })

  it('пропускает сообщения без idMessage', () => {
    const notification = createNotification({ idMessage: undefined })

    expect(parseIncomingMessage(notification)).toBeNull()
  })
})
