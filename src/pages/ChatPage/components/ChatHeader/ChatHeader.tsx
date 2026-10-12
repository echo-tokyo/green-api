import { Avatar } from '@/components/ui'
import styles from './ChatHeader.module.scss'

interface ChatHeaderProps {
  name: string
}

export function ChatHeader({ name }: ChatHeaderProps) {
  return (
    <header className={styles.header}>
      <Avatar name={name} size='s' />
      <h1 className={styles.title}>{name}</h1>
    </header>
  )
}
