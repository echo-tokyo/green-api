import { useNavigate } from 'react-router'
import { ROUTES } from '@/config/routes'
import { logout } from '@/services/auth/session'
import { useMessagesStore } from '@/store/messages-store'

export function useLogout() {
  const navigate = useNavigate()
  const clearMessages = useMessagesStore((state) => state.clearMessages)

  function logoutAndRedirect() {
    logout()
    clearMessages()
    void navigate(ROUTES.login)
  }

  return logoutAndRedirect
}
