import { describe, expect, it } from 'vitest'
import { getDefaultApiUrl, isValidApiUrl, resolveApiUrl } from './api-url'

describe('getDefaultApiUrl', () => {
  it('строит адрес по первым четырём цифрам idInstance', () => {
    expect(getDefaultApiUrl('4100227613')).toBe(
      'https://4100.api.green-api.com',
    )
  })
})

describe('resolveApiUrl', () => {
  it('использует указанный apiUrl без завершающего слеша', () => {
    expect(resolveApiUrl('https://7103.api.green-api.com/', '4100227613')).toBe(
      'https://7103.api.green-api.com',
    )
  })

  it('подставляет адрес по idInstance, если apiUrl не указан', () => {
    expect(resolveApiUrl('', '4100227613')).toBe(
      'https://4100.api.green-api.com',
    )
  })
})

describe('isValidApiUrl', () => {
  it('принимает https-адрес на домене green-api.com', () => {
    expect(isValidApiUrl('https://7103.api.green-api.com')).toBe(true)
  })

  it.each(['не адрес', 'http://4100.api.green-api.com', 'https://example.com'])(
    'отклоняет %s',
    (value) => {
      expect(isValidApiUrl(value)).toBe(false)
    },
  )
})
