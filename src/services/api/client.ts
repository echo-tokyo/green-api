import axios from 'axios'
import { getCredentials } from '@/services/auth/credentials'
import { isUnauthorizedError } from './api-error'

const REQUEST_TIMEOUT_MS = 15_000

let unauthorizedHandler: (() => void) | null = null

export function setUnauthorizedHandler(handler: (() => void) | null): void {
  unauthorizedHandler = handler
}

export const api = axios.create({ timeout: REQUEST_TIMEOUT_MS })

api.interceptors.request.use((config) => {
  const credentials = getCredentials()

  if (!credentials) {
    throw new Error('GREEN-API credentials are not set')
  }

  const { idInstance, apiTokenInstance, apiUrl } = credentials
  const [method, ...params] = (config.url ?? '').split('/')

  config.baseURL = `${apiUrl}/waInstance${idInstance}`
  config.url = [method, apiTokenInstance, ...params].join('/')

  return config
})

api.interceptors.response.use(undefined, (error: unknown) => {
  if (isUnauthorizedError(error)) unauthorizedHandler?.()

  return Promise.reject(error)
})
