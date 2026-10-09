export type FormValues<T> = { [K in keyof T]: string }

export type FormErrors<T> = Partial<Record<keyof T, string>>

export interface PhoneForm {
  phone: string
}
