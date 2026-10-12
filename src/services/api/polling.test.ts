import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { deleteNotification, receiveNotification } from './green-api'
import { pollNotifications } from './polling'

vi.mock('./green-api', () => ({
  receiveNotification: vi.fn(),
  deleteNotification: vi.fn(),
}))

const NOTIFICATION = {
  receiptId: 7,
  body: { typeWebhook: 'incomingMessageReceived', timestamp: 1 },
}

describe('pollNotifications', () => {
  let controller: AbortController

  beforeEach(() => {
    controller = new AbortController()
    vi.useFakeTimers()
  })

  afterEach(() => {
    controller.abort()
    vi.useRealTimers()
    vi.resetAllMocks()
  })

  it('передаёт уведомление обработчику и удаляет его из очереди', async () => {
    const onNotification = vi.fn()
    vi.mocked(receiveNotification)
      .mockResolvedValueOnce(NOTIFICATION)
      .mockImplementation(() => new Promise(() => {}))

    void pollNotifications(controller.signal, onNotification)
    await vi.advanceTimersByTimeAsync(0)

    expect(onNotification).toHaveBeenCalledWith(NOTIFICATION.body)
    expect(deleteNotification).toHaveBeenCalledWith(NOTIFICATION.receiptId)
  })

  it('увеличивает паузу между повторами после ошибок', async () => {
    vi.mocked(receiveNotification).mockRejectedValue(new Error('offline'))

    void pollNotifications(controller.signal, vi.fn())
    await vi.advanceTimersByTimeAsync(0)
    expect(receiveNotification).toHaveBeenCalledTimes(1)

    await vi.advanceTimersByTimeAsync(5000)
    expect(receiveNotification).toHaveBeenCalledTimes(2)

    await vi.advanceTimersByTimeAsync(5000)
    expect(receiveNotification).toHaveBeenCalledTimes(2)

    await vi.advanceTimersByTimeAsync(5000)
    expect(receiveNotification).toHaveBeenCalledTimes(3)
  })
})
