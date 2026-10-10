import type { Message } from '@/types/chat'
import { memo } from 'react'
import clsx from 'clsx'
import { formatTime } from '@/utils/date'
import styles from './MessageBubble.module.scss'

interface MessageBubbleProps {
  message: Message
}

export const MessageBubble = memo(function MessageBubble({
  message,
}: MessageBubbleProps) {
  const isOutgoing = message.direction === 'outgoing'
  const bubbleClassName = clsx(
    styles.bubble,
    isOutgoing ? styles.outgoing : styles.incoming,
  )
  const time = formatTime(message.timestamp)
  const dateTime = new Date(message.timestamp).toISOString()

  return (
    <div className={bubbleClassName}>
      <p className={styles.text}>{message.text}</p>
      <time className={styles.time} dateTime={dateTime}>
        {time}
      </time>
    </div>
  )
})
