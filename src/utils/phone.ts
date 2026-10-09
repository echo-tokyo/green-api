export function normalizePhone(value: string): string {
  return value.replace(/\D/g, '')
}

export function toPhoneChatId(phone: string): string {
  return `${normalizePhone(phone)}@c.us`
}
