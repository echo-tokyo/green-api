import { useId, type InputHTMLAttributes } from 'react'
import clsx from 'clsx'
import styles from './Input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
}

export function Input({
  label,
  hint,
  error,
  id,
  className,
  ...rest
}: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  const hasError = Boolean(error)
  const description = error ?? hint
  const descriptionId = description ? `${inputId}-description` : undefined

  const fieldClassName = clsx(styles.field, className)
  const inputClassName = clsx(styles.input, hasError && styles.invalid)
  const descriptionClassName = clsx(
    styles.description,
    hasError && styles.error,
  )

  return (
    <div className={fieldClassName}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={inputClassName}
        aria-invalid={hasError}
        aria-describedby={descriptionId}
        {...rest}
      />
      {description && (
        <p id={descriptionId} className={descriptionClassName}>
          {description}
        </p>
      )}
    </div>
  )
}
