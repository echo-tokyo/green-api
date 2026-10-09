export const ROUTES = {
  login: '/login',
  search: '/',
  chat: '/chat/:phone',
} as const

export function getChatRoute(phone: string): string {
  return `/chat/${phone}`
}
