import type { Message } from '@/types/chat'
import { memo } from 'react'
import clsx from 'clsx'
import { MessageMeta } from './MessageMeta'
import styles from './MessageBubble.module.scss'

interface MessageBubbleProps {
  message: Message
}

export const MessageBubble = memo(function MessageBubble({
  message,
}: MessageBubbleProps) {
  const isOutgoing = message.direction === 'outgoing'
  const status = isOutgoing ? message.status : null
  const bubbleClassName = clsx(
    styles.bubble,
    isOutgoing ? styles.outgoing : styles.incoming,
  )
  const placeholderClassName = clsx(styles.meta, styles.placeholder)

  return (
    <div className={bubbleClassName}>
      <p className={styles.text}>
        {message.text}
        <MessageMeta
          timestamp={message.timestamp}
          status={status}
          className={placeholderClassName}
          aria-hidden
        />
      </p>
      <MessageMeta
        timestamp={message.timestamp}
        status={status}
        className={styles.meta}
      />
    </div>
  )
})
