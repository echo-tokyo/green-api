import { generatePath } from 'react-router'

export const ROUTES = {
  login: '/login',
  search: '/',
  chat: '/chat/:phone',
} as const

export function getChatRoute(phone: string): string {
  return generatePath(ROUTES.chat, { phone })
}
