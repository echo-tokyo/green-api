import { describe, expect, it } from 'vitest'
import type { Credentials } from '@/types/green-api'
import { validateCredentials, validatePhone } from './validation'

const VALID_CREDENTIALS: Credentials = {
  idInstance: '4100000000',
  apiTokenInstance: 'token',
  apiUrl: '',
}

describe('validateCredentials', () => {
  it('не возвращает ошибок для корректных данных без apiUrl', () => {
    expect(validateCredentials(VALID_CREDENTIALS)).toEqual({})
  })

  it('не возвращает ошибок для корректного apiUrl', () => {
    const errors = validateCredentials({
      ...VALID_CREDENTIALS,
      apiUrl: 'https://7103.api.green-api.com',
    })

    expect(errors).toEqual({})
  })

  it('требует, чтобы idInstance состоял из цифр', () => {
    const errors = validateCredentials({
      ...VALID_CREDENTIALS,
      idInstance: '41000abc',
    })

    expect(errors.idInstance).toBeDefined()
    expect(errors.apiTokenInstance).toBeUndefined()
  })

  it('требует заполнить idInstance и apiTokenInstance', () => {
    const errors = validateCredentials({
      idInstance: '',
      apiTokenInstance: '',
      apiUrl: '',
    })

    expect(Object.keys(errors)).toEqual(['idInstance', 'apiTokenInstance'])
  })

  it.each(['не адрес', 'http://4100.api.green-api.com', 'https://example.com'])(
    'отклоняет некорректный apiUrl: %s',
    (apiUrl) => {
      const errors = validateCredentials({ ...VALID_CREDENTIALS, apiUrl })

      expect(errors.apiUrl).toBeDefined()
    },
  )
})

describe('validatePhone', () => {
  it('не возвращает ошибок для корректного номера', () => {
    expect(validatePhone({ phone: '+7 921 584-86-75' })).toEqual({})
  })

  it('возвращает ошибку для некорректного номера', () => {
    expect(validatePhone({ phone: '123' }).phone).toBeDefined()
  })
})
