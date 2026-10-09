import type { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'
import { Spinner } from '../Spinner/Spinner'
import styles from './Button.module.scss'

type ButtonVariant = 'primary' | 'text'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  fullWidth?: boolean
  loading?: boolean
}

const SPINNER_SIZE = 24

export function Button({
  variant = 'primary',
  fullWidth = false,
  loading = false,
  disabled = false,
  type = 'button',
  className,
  children,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading
  const buttonClassName = clsx(
    styles.button,
    styles[variant],
    fullWidth && styles.fullWidth,
    className,
  )

  return (
    <button
      type={type}
      className={buttonClassName}
      disabled={isDisabled}
      aria-busy={loading}
      {...rest}
    >
      <span className={styles.content}>{children}</span>
      {loading && <Spinner size={SPINNER_SIZE} className={styles.spinner} />}
    </button>
  )
}
