import { Check, CircleAlert, Clock3, type LucideIcon } from 'lucide-react'
import clsx from 'clsx'
import type { MessageStatus } from '@/types/chat'
import styles from './MessageBubble.module.scss'

interface MessageStatusIconProps {
  status: MessageStatus
}

const STATUS_ICONS: Record<MessageStatus, LucideIcon> = {
  sending: Clock3,
  sent: Check,
  failed: CircleAlert,
}

const STATUS_LABELS: Record<MessageStatus, string> = {
  sending: 'Отправляется',
  sent: 'Отправлено',
  failed: 'Не отправлено',
}

const ICON_SIZE = 16

export function MessageStatusIcon({ status }: MessageStatusIconProps) {
  const Icon = STATUS_ICONS[status]
  const label = STATUS_LABELS[status]
  const isFailed = status === 'failed'
  const iconClassName = clsx(styles.status, isFailed && styles.failed)

  return (
    <Icon
      size={ICON_SIZE}
      className={iconClassName}
      role='img'
      aria-label={label}
    />
  )
}
