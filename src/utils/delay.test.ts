import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { delay } from './delay'

describe('delay', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('завершается через указанное время', async () => {
    const onResolve = vi.fn()

    void delay(1000, new AbortController().signal).then(onResolve)

    await vi.advanceTimersByTimeAsync(999)
    expect(onResolve).not.toHaveBeenCalled()

    await vi.advanceTimersByTimeAsync(1)
    expect(onResolve).toHaveBeenCalled()
  })

  it('завершается сразу при отмене', async () => {
    const controller = new AbortController()
    const onResolve = vi.fn()

    void delay(1000, controller.signal).then(onResolve)
    controller.abort()

    await vi.advanceTimersByTimeAsync(0)
    expect(onResolve).toHaveBeenCalled()
  })
})
