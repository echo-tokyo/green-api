import type { Message } from '../../lib/types'
import { MessageBubble } from '../MessageBubble/MessageBubble'
import { groupMessagesByDay } from './group-messages-by-day'
import { useAutoScroll } from './use-auto-scroll'
import styles from './MessageList.module.scss'

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  const { listRef, handleScroll } = useAutoScroll(messages)
  const groups = groupMessagesByDay(messages)
  const isEmpty = messages.length === 0

  return (
    <div
      ref={listRef}
      className={styles.list}
      role='log'
      aria-live='polite'
      onScroll={handleScroll}
    >
      {isEmpty && <p className={styles.empty}>Сообщений пока нет</p>}
      {groups.map((group) => (
        <section key={group.day} className={styles.group}>
          <h2 className={styles.day}>{group.label}</h2>
          {group.messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </section>
      ))}
    </div>
  )
}
