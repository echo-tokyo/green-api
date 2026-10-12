import { isAxiosError } from 'axios'

const UNAUTHORIZED_STATUS = 401
const QUOTA_EXCEEDED_STATUS = 466

export function isUnauthorizedError(error: unknown): boolean {
  return isAxiosError(error) && error.response?.status === UNAUTHORIZED_STATUS
}

export function getApiErrorMessage(error: unknown): string {
  if (!isAxiosError(error) || !error.response) {
    return 'Нет соединения с GREEN-API'
  }

  const { status } = error.response

  if (status === UNAUTHORIZED_STATUS) {
    return 'Неверный idInstance или apiTokenInstance'
  }

  if (status === QUOTA_EXCEEDED_STATUS) {
    return 'Лимит тарифа GREEN-API: можно писать только номерам, с которыми уже была переписка'
  }

  return `Ошибка запроса к GREEN-API (код ${status})`
}
