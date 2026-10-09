import type { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'
import type { LucideIcon } from 'lucide-react'
import styles from './IconButton.module.scss'

type IconButtonVariant = 'ghost' | 'accent'
type IconButtonSize = 'm' | 'l'

interface IconButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> {
  icon: LucideIcon
  label: string
  variant?: IconButtonVariant
  size?: IconButtonSize
}

const ICON_SIZE = 24

export function IconButton({
  icon: Icon,
  label,
  variant = 'ghost',
  size = 'm',
  type = 'button',
  className,
  ...rest
}: IconButtonProps) {
  const buttonClassName = clsx(
    styles.iconButton,
    styles[variant],
    styles[size],
    className,
  )

  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={buttonClassName}
      {...rest}
    >
      <Icon size={ICON_SIZE} aria-hidden />
    </button>
  )
}
