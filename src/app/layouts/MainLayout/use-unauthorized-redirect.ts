import { useEffect, useEffectEvent } from 'react'
import { toast } from 'sonner'
import { setUnauthorizedHandler } from '@/services/api/client'
import { useLogout } from './use-logout'

export function useUnauthorizedRedirect() {
  const logout = useLogout()

  const handleUnauthorized = useEffectEvent(() => {
    logout()
    toast.error('Сессия недействительна. Войдите заново')
  })

  useEffect(() => {
    setUnauthorizedHandler(() => handleUnauthorized())

    return () => setUnauthorizedHandler(null)
  }, [])
}
