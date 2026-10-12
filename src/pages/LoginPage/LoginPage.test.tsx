import { render, screen } from '@testing-library/react'
import userEvent, { type UserEvent } from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'
import { getCredentials } from '@/services/auth/credentials'
import { getMethodUrl, TEST_CREDENTIALS } from '@/tests/handlers'
import { server } from '@/tests/server'
import { TestApp } from '@/tests/TestApp'

async function submitLoginForm(user: UserEvent) {
  await user.type(
    await screen.findByLabelText('idInstance'),
    TEST_CREDENTIALS.idInstance,
  )
  await user.type(
    screen.getByLabelText('apiTokenInstance'),
    TEST_CREDENTIALS.apiTokenInstance,
  )
  await user.click(screen.getByRole('button', { name: 'Войти' }))
}

describe('Вход', () => {
  it('при верных данных открывает страницу нового чата', async () => {
    const user = userEvent.setup()
    render(<TestApp path='/login' />)

    await submitLoginForm(user)

    expect(
      await screen.findByRole('heading', { name: 'Новый чат' }),
    ).toBeInTheDocument()
    expect(getCredentials()).toEqual(TEST_CREDENTIALS)
  })

  it('использует apiUrl, если он указан', async () => {
    const customApiUrl = 'https://7103.api.green-api.com'
    server.use(
      http.get(getMethodUrl('getStateInstance', customApiUrl), () =>
        HttpResponse.json({ stateInstance: 'authorized' }),
      ),
    )
    const user = userEvent.setup()
    render(<TestApp path='/login' />)

    await user.type(await screen.findByLabelText('apiUrl'), customApiUrl)
    await submitLoginForm(user)

    expect(
      await screen.findByRole('heading', { name: 'Новый чат' }),
    ).toBeInTheDocument()
    expect(getCredentials()?.apiUrl).toBe(customApiUrl)
  })

  it('не пускает, если инстанс не авторизован в Telegram', async () => {
    server.use(
      http.get(getMethodUrl('getStateInstance'), () =>
        HttpResponse.json({ stateInstance: 'notAuthorized' }),
      ),
    )
    const user = userEvent.setup()
    render(<TestApp path='/login' />)

    await submitLoginForm(user)

    expect(
      await screen.findByText('Инстанс не авторизован в Telegram'),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Вход' })).toBeInTheDocument()
    expect(getCredentials()).toBeNull()
  })

  it('сообщает о неверном токене', async () => {
    server.use(
      http.get(
        getMethodUrl('getStateInstance'),
        () => new HttpResponse(null, { status: 401 }),
      ),
    )
    const user = userEvent.setup()
    render(<TestApp path='/login' />)

    await submitLoginForm(user)

    expect(
      await screen.findByText('Неверный idInstance или apiTokenInstance'),
    ).toBeInTheDocument()
    expect(getCredentials()).toBeNull()
  })

  it('показывает ошибки под полями, если данные некорректны', async () => {
    const user = userEvent.setup()
    render(<TestApp path='/login' />)

    await user.click(await screen.findByRole('button', { name: 'Войти' }))

    expect(
      screen.getByText('idInstance должен состоять из цифр'),
    ).toBeInTheDocument()
    expect(screen.getByText('Введите apiTokenInstance')).toBeInTheDocument()
    expect(getCredentials()).toBeNull()
  })
})
