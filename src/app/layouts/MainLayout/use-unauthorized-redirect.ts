import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { ROUTES } from '@/config/routes'
import { setUnauthorizedHandler } from '@/services/api/client'
import { logout } from '@/services/auth/session'

export function useUnauthorizedRedirect() {
  const navigate = useNavigate()

  useEffect(() => {
    setUnauthorizedHandler(() => {
      logout()
      toast.error('Сессия недействительна. Войдите заново')
      void navigate(ROUTES.login)
    })

    return () => setUnauthorizedHandler(null)
  }, [navigate])
}
