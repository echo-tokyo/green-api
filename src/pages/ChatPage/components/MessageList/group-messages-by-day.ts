import type { Message } from '@/types/message'
import { formatDay, getStartOfDay } from '@/utils/date'

interface MessageGroup {
  day: number
  label: string
  messages: Message[]
}

export function groupMessagesByDay(messages: Message[]): MessageGroup[] {
  const groups: MessageGroup[] = []

  for (const message of messages) {
    const day = getStartOfDay(message.timestamp)
    const lastGroup = groups.at(-1)

    if (lastGroup?.day === day) {
      lastGroup.messages.push(message)
    } else {
      groups.push({ day, label: formatDay(day), messages: [message] })
    }
  }

  return groups
}
