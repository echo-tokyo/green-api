import { redirect, type LoaderFunctionArgs } from 'react-router'
import { ROUTES } from '@/config/routes'
import { hasCredentials } from '@/services/auth/credentials'
import { isValidPhone } from '@/utils/phone'

export function requireAuth() {
  if (!hasCredentials()) return redirect(ROUTES.login)

  return null
}

export function requireGuest() {
  if (hasCredentials()) return redirect(ROUTES.search)

  return null
}

export function requireValidPhone({ params }: LoaderFunctionArgs) {
  if (!isValidPhone(params.phone ?? '')) return redirect(ROUTES.search)

  return null
}

export function redirectToSearch() {
  return redirect(ROUTES.search)
}
