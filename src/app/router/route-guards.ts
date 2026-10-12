import { redirect } from 'react-router'
import { ROUTES } from '@/config/routes'
import { hasCredentials } from '@/services/auth/credentials'

export function requireAuth() {
  if (!hasCredentials()) return redirect(ROUTES.login)

  return null
}

export function requireGuest() {
  if (hasCredentials()) return redirect(ROUTES.search)

  return null
}

export function redirectToSearch() {
  return redirect(ROUTES.search)
}
