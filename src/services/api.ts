import axios, { isAxiosError, isCancel, type AxiosError } from 'axios'
import { toast } from 'sonner'
import { getCredentials } from './credentials'

export const api = axios.create()

api.interceptors.request.use((config) => {
  const credentials = getCredentials()

  if (!credentials) {
    throw new Error('GREEN-API credentials are not set')
  }

  const { idInstance, apiTokenInstance } = credentials
  const serverId = idInstance.slice(0, 4)
  const [method, ...params] = (config.url ?? '').split('/')

  config.baseURL = `https://${serverId}.api.green-api.com/waInstance${idInstance}`
  config.url = [method, apiTokenInstance, ...params].join('/')

  return config
})

function getErrorMessage(error: AxiosError): string {
  if (!error.response) return 'Нет соединения с GREEN-API'

  if (error.response.status === 401) {
    return 'Неверный idInstance или apiTokenInstance'
  }

  if (error.response.status === 466) {
    return 'Лимит тарифа GREEN-API: можно писать только номерам, с которыми уже была переписка'
  }

  return `Ошибка запроса к GREEN-API (код ${error.response.status})`
}

api.interceptors.response.use(undefined, (error: unknown) => {
  const shouldNotify =
    isAxiosError(error) && !isCancel(error) && !error.config?.silent

  if (shouldNotify) toast.error(getErrorMessage(error))

  return Promise.reject(error)
})
