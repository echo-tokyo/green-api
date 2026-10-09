import { useState } from 'react'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/app/routes'
import { authorize } from '@/services/auth'
import type { Credentials } from '@/types/green-api'

export function useLogin() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  async function login(credentials: Credentials) {
    setIsLoading(true)

    const isAuthorized = await authorize(credentials)

    setIsLoading(false)

    if (isAuthorized) await navigate(ROUTES.search)
  }

  return { isLoading, login }
}
