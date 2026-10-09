import type { CSSProperties } from 'react'
import clsx from 'clsx'
import { User } from 'lucide-react'
import styles from './Avatar.module.scss'

type AvatarSize = 's' | 'm'

interface AvatarProps {
  name: string
  size?: AvatarSize
  className?: string
}

const GRADIENTS = [
  'linear-gradient(#ff885e, #ff516a)',
  'linear-gradient(#ffcd6a, #ffa85c)',
  'linear-gradient(#82b1ff, #665fff)',
  'linear-gradient(#a0de7e, #54cb68)',
  'linear-gradient(#53edd6, #28c9b7)',
  'linear-gradient(#72d5fd, #2a9ef1)',
  'linear-gradient(#e0a2f3, #d669ed)',
]

const FIRST_LETTER = /\p{L}/u

export function Avatar({ name, size = 'm', className }: AvatarProps) {
  const letter = name.match(FIRST_LETTER)?.[0]?.toUpperCase()
  const content = letter ?? <User className={styles.icon} />

  const gradientIndex = name.charCodeAt(0) % GRADIENTS.length
  const avatarStyle: CSSProperties = { background: GRADIENTS[gradientIndex] }
  const avatarClassName = clsx(styles.avatar, styles[size], className)

  return (
    <span className={avatarClassName} style={avatarStyle} aria-hidden>
      {content}
    </span>
  )
}
