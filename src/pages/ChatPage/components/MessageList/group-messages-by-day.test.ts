import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { Message } from '@/types/message'
import { groupMessagesByDay } from './group-messages-by-day'

function createMessage(id: string, date: Date): Message {
  return {
    id,
    chatId: '79876543210',
    text: id,
    timestamp: date.getTime(),
    direction: 'incoming',
    status: 'sent',
  }
}

describe('groupMessagesByDay', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 9, 12, 18, 0))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('возвращает пустой список для пустой ленты', () => {
    expect(groupMessagesByDay([])).toEqual([])
  })

  it('группирует сообщения одного дня вместе', () => {
    const messages = [
      createMessage('1', new Date(2026, 9, 11, 10, 0)),
      createMessage('2', new Date(2026, 9, 11, 23, 59)),
      createMessage('3', new Date(2026, 9, 12, 0, 1)),
      createMessage('4', new Date(2026, 9, 12, 17, 0)),
    ]

    const groups = groupMessagesByDay(messages)

    expect(groups.map(({ label }) => label)).toEqual(['Вчера', 'Сегодня'])
    expect(groups.map((group) => group.messages.map(({ id }) => id))).toEqual([
      ['1', '2'],
      ['3', '4'],
    ])
  })
})
