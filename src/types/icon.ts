import type { ComponentType } from 'react'

interface IconProps {
  size?: number
  className?: string
  'aria-hidden'?: boolean
}

export type IconComponent = ComponentType<IconProps>
