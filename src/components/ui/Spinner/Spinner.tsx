import clsx from 'clsx'
import { LoaderCircle } from 'lucide-react'
import styles from './Spinner.module.scss'

interface SpinnerProps {
  size?: number
  className?: string
}

export function Spinner({ size = 24, className }: SpinnerProps) {
  const spinnerClassName = clsx(styles.spinner, className)

  return (
    <span role='status' aria-label='Загрузка' className={spinnerClassName}>
      <LoaderCircle size={size} aria-hidden />
    </span>
  )
}
