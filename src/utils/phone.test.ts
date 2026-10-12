import { describe, expect, it } from 'vitest'
import {
  formatPhone,
  isValidPhone,
  normalizePhone,
  toPhoneChatId,
} from './phone'

describe('normalizePhone', () => {
  it.each([
    ['+7 921 584-86-75', '79215848675'],
    ['7 (921) 584 86 75', '79215848675'],
    ['79215848675.', '79215848675'],
    ['380501234567', '380501234567'],
  ])('оставляет только цифры: %s → %s', (input, expected) => {
    expect(normalizePhone(input)).toBe(expected)
  })

  it.each([
    ['89215848675', '79215848675'],
    ['8 (921) 584-86-75', '79215848675'],
  ])(
    'переводит российский номер с 8 в формат с 7: %s → %s',
    (input, expected) => {
      expect(normalizePhone(input)).toBe(expected)
    },
  )

  it('не трогает ведущую 8, если номер не из 11 цифр', () => {
    expect(normalizePhone('8921584867')).toBe('8921584867')
  })
})

describe('isValidPhone', () => {
  it.each(['+7 921 584-86-75', '89215848675', '380501234567'])(
    'принимает номер от 10 до 15 цифр: %s',
    (phone) => {
      expect(isValidPhone(phone)).toBe(true)
    },
  )

  it.each(['', '+7 921', '1234567890123456'])(
    'отклоняет слишком короткий или длинный номер: "%s"',
    (phone) => {
      expect(isValidPhone(phone)).toBe(false)
    },
  )
})

describe('formatPhone', () => {
  it('возвращает нормализованный номер с плюсом', () => {
    expect(formatPhone('8 921 584-86-75')).toBe('+79215848675')
  })
})

describe('toPhoneChatId', () => {
  it('добавляет суффикс @c.us к нормализованному номеру', () => {
    expect(toPhoneChatId('+7 921 584-86-75')).toBe('79215848675@c.us')
  })
})
