import { afterEach, describe, expect, it } from 'vitest'
import {
  clearCredentials,
  getCredentials,
  hasCredentials,
  saveCredentials,
} from './credentials'

const CREDENTIALS_KEY = 'green-api-credentials'
const CREDENTIALS = {
  idInstance: '4100000000',
  apiTokenInstance: 'token',
  apiUrl: 'https://4100.api.green-api.com',
}

describe('credentials', () => {
  afterEach(() => {
    sessionStorage.clear()
  })

  it('сохраняет и читает учётные данные', () => {
    saveCredentials(CREDENTIALS)

    expect(getCredentials()).toEqual(CREDENTIALS)
    expect(hasCredentials()).toBe(true)
  })

  it('возвращает null, если данных нет', () => {
    expect(getCredentials()).toBeNull()
    expect(hasCredentials()).toBe(false)
  })

  it('возвращает null для повреждённого JSON', () => {
    sessionStorage.setItem(CREDENTIALS_KEY, '{broken json')

    expect(getCredentials()).toBeNull()
  })

  it('возвращает null для данных неверной формы', () => {
    sessionStorage.setItem(CREDENTIALS_KEY, JSON.stringify({ idInstance: 1 }))

    expect(getCredentials()).toBeNull()
  })

  it('удаляет учётные данные', () => {
    saveCredentials(CREDENTIALS)
    clearCredentials()

    expect(hasCredentials()).toBe(false)
  })
})
