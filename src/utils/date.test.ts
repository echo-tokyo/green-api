import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { formatDay, formatTime, getStartOfDay } from './date'

const NOW = new Date(2026, 9, 12, 15, 30)

describe('getStartOfDay', () => {
  it('возвращает полночь того же дня', () => {
    const startOfDay = getStartOfDay(NOW.getTime())

    expect(startOfDay).toBe(new Date(2026, 9, 12).getTime())
  })
})

describe('formatTime', () => {
  it('форматирует время как ЧЧ:ММ', () => {
    expect(formatTime(new Date(2026, 9, 12, 9, 5).getTime())).toBe('09:05')
  })
})

describe('formatDay', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(NOW)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('называет сегодняшний день "Сегодня"', () => {
    expect(formatDay(new Date(2026, 9, 12, 0, 1).getTime())).toBe('Сегодня')
  })

  it('называет вчерашний день "Вчера"', () => {
    expect(formatDay(new Date(2026, 9, 11, 23, 59).getTime())).toBe('Вчера')
  })

  it('показывает дату для более ранних дней', () => {
    expect(formatDay(new Date(2026, 8, 25).getTime())).toBe('25 сентября')
  })
})
