import { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { ROUTES } from '@/config/routes'
import { getApiErrorMessage } from '@/services/api/api-error'
import { authorize } from '@/services/auth/session'
import type { Credentials } from '@/types/green-api'

export function useLogin() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  async function login(credentials: Credentials) {
    setIsLoading(true)

    try {
      const isAuthorized = await authorize(credentials)

      if (isAuthorized) {
        await navigate(ROUTES.search)
        return
      }

      toast.error('Инстанс не авторизован в Telegram')
    } catch (error) {
      toast.error(getApiErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, login }
}
