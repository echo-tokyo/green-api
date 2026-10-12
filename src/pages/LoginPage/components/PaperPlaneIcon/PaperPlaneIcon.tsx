import type { SVGProps } from 'react'
import styles from './PaperPlaneIcon.module.scss'

interface PaperPlaneIconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

export function PaperPlaneIcon({ size = 24, ...rest }: PaperPlaneIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 -1.7 29 29'
      fill='currentColor'
      {...rest}
    >
      <path d='M26.6.25 1.1 10.1c-1.3.5-1.25 2.35.07 2.78l6.5 2.08 2.35 7.5c.3.95 1.5 1.24 2.2.53l3.5-3.53 6.85 5.05c.85.63 2.07.16 2.28-.88L28.6 2.03c.24-1.2-.9-2.2-2-1.78Z' />
      <path
        className={styles.fold}
        d='m7.7 14.96 15.7-9.9c.4-.25.8.3.46.62L11.37 17.1l-.4 4.9c-.04.5-.74.57-.88.09Z'
      />
    </svg>
  )
}
