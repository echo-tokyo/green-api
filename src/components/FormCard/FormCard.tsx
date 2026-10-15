import type { ReactNode, SubmitEvent } from 'react'
import type { IconComponent } from '@/types/icon'
import styles from './FormCard.module.scss'

interface FormCardProps {
  icon: IconComponent
  title: string
  description: string
  onSubmit?: (event: SubmitEvent<HTMLFormElement>) => void
  children: ReactNode
}

const ICON_SIZE = 64

export function FormCard({
  icon: Icon,
  title,
  description,
  onSubmit,
  children,
}: FormCardProps) {
  return (
    <form className={styles.card} noValidate onSubmit={onSubmit}>
      <span className={styles.logo}>
        <Icon size={ICON_SIZE} aria-hidden />
      </span>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      <div className={styles.fields}>{children}</div>
    </form>
  )
}
