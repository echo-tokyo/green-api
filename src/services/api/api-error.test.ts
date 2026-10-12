import { AxiosError, AxiosHeaders, type AxiosResponse } from 'axios'
import { describe, expect, it } from 'vitest'
import { getApiErrorMessage } from './api-error'

function createHttpError(status: number): AxiosError {
  const config = { headers: new AxiosHeaders() }
  const response: AxiosResponse = {
    status,
    statusText: '',
    data: null,
    headers: {},
    config,
  }

  return new AxiosError(
    'Request failed',
    'ERR_BAD_RESPONSE',
    config,
    null,
    response,
  )
}

describe('getApiErrorMessage', () => {
  it('сообщает о неверных учётных данных при 401', () => {
    expect(getApiErrorMessage(createHttpError(401))).toBe(
      'Неверный idInstance или apiTokenInstance',
    )
  })

  it('сообщает о лимите тарифа при 466', () => {
    expect(getApiErrorMessage(createHttpError(466))).toMatch(/Лимит тарифа/)
  })

  it('показывает код для остальных ошибок сервера', () => {
    expect(getApiErrorMessage(createHttpError(500))).toBe(
      'Ошибка запроса к GREEN-API (код 500)',
    )
  })

  it('сообщает о проблеме с соединением, если ответа нет', () => {
    const networkError = new AxiosError('Network Error', 'ERR_NETWORK')

    expect(getApiErrorMessage(networkError)).toBe('Нет соединения с GREEN-API')
  })

  it('сообщает о проблеме с соединением для неизвестных ошибок', () => {
    expect(getApiErrorMessage(new Error('boom'))).toBe(
      'Нет соединения с GREEN-API',
    )
  })
})
