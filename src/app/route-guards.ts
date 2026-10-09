import { redirect } from 'react-router'
import { hasCredentials } from '@/services/green-api'
import { ROUTES } from './routes'

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
