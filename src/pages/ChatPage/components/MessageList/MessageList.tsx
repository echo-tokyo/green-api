import { useEffect, useRef } from 'react'
import type { Message } from '@/types/chat'
import { groupMessagesByDay } from './group-messages-by-day'
import styles from './MessageList.module.scss'
import { MessageBubble } from '../MessageBubble/MessageBubble'

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  const listRef = useRef<HTMLDivElement>(null)
  const groups = groupMessagesByDay(messages)
  const isEmpty = messages.length === 0

  useEffect(() => {
    const list = listRef.current

    if (list) list.scrollTop = list.scrollHeight
  }, [messages])

  return (
    <div ref={listRef} className={styles.list} role='log' aria-live='polite'>
      {isEmpty && <p className={styles.empty}>Сообщений пока нет</p>}
      {groups.map((group) => (
        <section key={group.day} className={styles.group}>
          <h3 className={styles.day}>{group.label}</h3>
          {group.messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </section>
      ))}
    </div>
  )
}
