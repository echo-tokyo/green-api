import type { HTMLAttributes } from 'react'
import type { MessageStatus } from '@/types/chat'
import { formatTime } from '@/utils/date'
import { MessageStatusIcon } from './MessageStatusIcon'

interface MessageMetaProps extends HTMLAttributes<HTMLSpanElement> {
  timestamp: number
  status: MessageStatus | null
}

export function MessageMeta({ timestamp, status, ...rest }: MessageMetaProps) {
  const time = formatTime(timestamp)
  const dateTime = new Date(timestamp).toISOString()

  return (
    <span {...rest}>
      <time dateTime={dateTime}>{time}</time>
      {status && <MessageStatusIcon status={status} />}
    </span>
  )
}
