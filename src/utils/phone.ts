const MIN_PHONE_LENGTH = 10
const MAX_PHONE_LENGTH = 15
const RUSSIAN_PHONE_LENGTH = 11
const RUSSIAN_TRUNK_PREFIX = '8'
const RUSSIAN_COUNTRY_CODE = '7'

export function normalizePhone(value: string): string {
  const digits = value.replace(/\D/g, '')
  const isRussianLocalFormat =
    digits.length === RUSSIAN_PHONE_LENGTH &&
    digits.startsWith(RUSSIAN_TRUNK_PREFIX)

  return isRussianLocalFormat ? RUSSIAN_COUNTRY_CODE + digits.slice(1) : digits
}

export function isValidPhone(value: string): boolean {
  const { length } = normalizePhone(value)

  return length >= MIN_PHONE_LENGTH && length <= MAX_PHONE_LENGTH
}

export function formatPhone(phone: string): string {
  return `+${normalizePhone(phone)}`
}

export function toPhoneChatId(phone: string): string {
  return `${normalizePhone(phone)}@c.us`
}
