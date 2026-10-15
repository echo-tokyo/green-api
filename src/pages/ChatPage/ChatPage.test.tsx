import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { delay, http, HttpResponse } from 'msw'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getCredentials, saveCredentials } from '@/services/auth/credentials'
import { getMethodUrl, TEST_CREDENTIALS } from '@/tests/handlers'
import { server } from '@/tests/server'
import { TestApp } from '@/tests/TestApp'

const CHAT_PHONE = '79876543210'

function createIncomingNotification(phone: number, text: string) {
  return {
    receiptId: 1,
    body: {
      typeWebhook: 'incomingMessageReceived',
      timestamp: Math.floor(Date.now() / 1000),
      idMessage: 'incoming-id',
      senderData: { chatId: '10000000', senderPhoneNumber: phone },
      messageData: {
        typeMessage: 'textMessage',
        textMessageData: { textMessage: text },
      },
    },
  }
}

function mockIncomingNotification(phone: number, text: string) {
  server.use(
    http.get(
      getMethodUrl('receiveNotification'),
      () => HttpResponse.json(createIncomingNotification(phone, text)),
      { once: true },
    ),
  )
}

async function sendMessage(text: string) {
  const user = userEvent.setup()
  const input = await screen.findByRole('textbox', { name: 'Сообщение' })

  await user.type(input, `${text}{Enter}`)
}

describe('Чат', () => {
  beforeEach(() => {
    saveCredentials(TEST_CREDENTIALS)
  })

  it('отправляет сообщение и показывает его статус', async () => {
    const onRequest = vi.fn()
    server.use(
      http.post(getMethodUrl('sendMessage'), async ({ request }) => {
        onRequest(await request.json())
        await delay(100)

        return HttpResponse.json({ idMessage: 'sent-message-id' })
      }),
    )
    render(<TestApp path={`/chat/${CHAT_PHONE}`} />)

    await sendMessage('Привет')

    expect(screen.getByRole('img', { name: 'Отправляется' })).toBeVisible()
    expect(
      await screen.findByRole('img', { name: 'Отправлено' }),
    ).toBeInTheDocument()
    expect(onRequest).toHaveBeenCalledWith({
      chatId: `${CHAT_PHONE}@c.us`,
      message: 'Привет',
    })
  })

  it('возвращает на вход, если токен стал недействительным', async () => {
    server.use(
      http.post(
        getMethodUrl('sendMessage'),
        () => new HttpResponse(null, { status: 401 }),
      ),
    )
    render(<TestApp path={`/chat/${CHAT_PHONE}`} />)

    await sendMessage('Привет')

    expect(
      await screen.findByRole('heading', { name: 'Вход' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Сессия недействительна. Войдите заново'),
    ).toBeInTheDocument()
    expect(getCredentials()).toBeNull()
  })

  it('помечает сообщение неотправленным при ошибке', async () => {
    server.use(
      http.post(
        getMethodUrl('sendMessage'),
        () => new HttpResponse(null, { status: 466 }),
      ),
    )
    render(<TestApp path={`/chat/${CHAT_PHONE}`} />)

    await sendMessage('Привет')

    expect(
      await screen.findByRole('img', { name: 'Не отправлено' }),
    ).toBeInTheDocument()
    expect(await screen.findByText(/Лимит тарифа/)).toBeInTheDocument()
  })

  it('показывает ответ собеседника и удаляет уведомление из очереди', async () => {
    const onDelete = vi.fn()
    server.use(
      http.delete(
        `${getMethodUrl('deleteNotification')}/:receiptId`,
        ({ params }) => {
          onDelete(params.receiptId)

          return HttpResponse.json({ result: true })
        },
      ),
    )
    mockIncomingNotification(Number(CHAT_PHONE), 'Ответ из Telegram')
    render(<TestApp path={`/chat/${CHAT_PHONE}`} />)

    const messageList = await screen.findByRole('log')

    expect(
      await within(messageList).findByText('Ответ из Telegram'),
    ).toBeInTheDocument()
    await waitFor(() => expect(onDelete).toHaveBeenCalledWith('1'))
  })

  it('сообщает уведомлением о сообщении из другого чата', async () => {
    mockIncomingNotification(79990001122, 'Сообщение из другого чата')
    render(<TestApp path={`/chat/${CHAT_PHONE}`} />)

    expect(
      await screen.findByText('Новое сообщение от +79990001122'),
    ).toBeInTheDocument()

    const messageList = await screen.findByRole('log')

    expect(
      within(messageList).queryByText('Сообщение из другого чата'),
    ).not.toBeInTheDocument()
  })

  it('сохраняет сообщение из другого чата и открывает его из уведомления', async () => {
    mockIncomingNotification(79990001122, 'Сообщение из другого чата')
    render(<TestApp path={`/chat/${CHAT_PHONE}`} />)

    fireEvent.click(await screen.findByRole('button', { name: 'Открыть' }))

    expect(
      await screen.findByRole('heading', { name: '+79990001122' }),
    ).toBeInTheDocument()
    expect(
      within(screen.getByRole('log')).getByText('Сообщение из другого чата'),
    ).toBeInTheDocument()
  })

  it('возвращает к поиску при некорректном номере в адресе', async () => {
    render(<TestApp path='/chat/abc' />)

    expect(
      await screen.findByRole('heading', { name: 'Новый чат' }),
    ).toBeInTheDocument()
  })
})
