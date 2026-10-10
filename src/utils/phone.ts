const MIN_PHONE_LENGTH = 10
const MAX_PHONE_LENGTH = 15

export function normalizePhone(value: string): string {
  return value.replace(/\D/g, '')
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
