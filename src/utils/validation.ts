import { isValidApiUrl } from '@/services/api/api-url'
import type { FormErrors, PhoneForm } from '@/types/form'
import type { Credentials } from '@/types/green-api'
import { isValidPhone } from './phone'

const DIGITS_ONLY = /^\d+$/

export function validateCredentials({
  idInstance,
  apiTokenInstance,
  apiUrl,
}: Credentials): FormErrors<Credentials> {
  const errors: FormErrors<Credentials> = {}

  if (!DIGITS_ONLY.test(idInstance)) {
    errors.idInstance = 'idInstance должен состоять из цифр'
  }

  if (!apiTokenInstance) {
    errors.apiTokenInstance = 'Введите apiTokenInstance'
  }

  if (apiUrl && !isValidApiUrl(apiUrl)) {
    errors.apiUrl = 'Укажите адрес вида https://1234.api.green-api.com'
  }

  return errors
}

export function validatePhone({ phone }: PhoneForm): FormErrors<PhoneForm> {
  const errors: FormErrors<PhoneForm> = {}

  if (!isValidPhone(phone)) {
    errors.phone = 'Номер должен содержать от 10 до 15 цифр'
  }

  return errors
}
