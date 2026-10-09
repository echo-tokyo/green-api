import { useState, type ChangeEvent, type SubmitEvent } from 'react'
import type { FormErrors, FormValues } from '@/types/form'

function trimValues<T extends FormValues<T>>(values: T): T {
  const entries = Object.entries<string>(values).map(([name, value]) => [
    name,
    value.trim(),
  ])

  return Object.fromEntries(entries)
}

function hasErrors<T>(errors: FormErrors<T>): boolean {
  return Object.values(errors).some(Boolean)
}

export function useForm<T extends FormValues<T>>(
  initialValues: T,
  validate: (values: T) => FormErrors<T>,
  onSubmit: (values: T) => void,
) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<FormErrors<T>>({})

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setValues((prevValues) => ({ ...prevValues, [name]: value }))
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }))
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedValues = trimValues(values)
    const validationErrors = validate(trimmedValues)

    setErrors(validationErrors)

    if (!hasErrors(validationErrors)) {
      onSubmit(trimmedValues)
    }
  }

  return { values, errors, handleChange, handleSubmit }
}
