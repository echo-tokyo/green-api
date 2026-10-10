import type { Credentials } from '@/types/green-api'
import { Send } from 'lucide-react'
import { FormCard } from '@/components/FormCard/FormCard'
import { Button, Input } from '@/components/ui'
import { useForm } from '@/hooks/use-form'
import { validateCredentials } from '@/utils/validation'
import { useLogin } from './use-login'

const INITIAL_VALUES: Credentials = { idInstance: '', apiTokenInstance: '' }

export function LoginPage() {
  const { isLoading, login } = useLogin()
  const { values, errors, handleChange, handleSubmit } = useForm(
    INITIAL_VALUES,
    validateCredentials,
    login,
  )

  return (
    <FormCard
      icon={Send}
      title='Вход'
      description='Введите данные инстанса из личного кабинета GREEN-API'
      onSubmit={handleSubmit}
    >
      <Input
        name='idInstance'
        label='idInstance'
        inputMode='numeric'
        autoComplete='off'
        autoFocus
        value={values.idInstance}
        error={errors.idInstance}
        onChange={handleChange}
      />
      <Input
        name='apiTokenInstance'
        label='apiTokenInstance'
        type='password'
        autoComplete='off'
        value={values.apiTokenInstance}
        error={errors.apiTokenInstance}
        onChange={handleChange}
      />
      <Button type='submit' fullWidth loading={isLoading}>
        Войти
      </Button>
    </FormCard>
  )
}
