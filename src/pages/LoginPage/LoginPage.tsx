import { FormCard } from '@/components/FormCard/FormCard'
import { Button, Input } from '@/components/ui'
import { useForm } from '@/hooks/use-form'
import type { Credentials } from '@/types/green-api'
import { validateCredentials } from '@/utils/validation'
import { PaperPlaneIcon } from './components/PaperPlaneIcon/PaperPlaneIcon'
import { useLogin } from './hooks/use-login'

const INITIAL_VALUES: Credentials = {
  idInstance: '',
  apiTokenInstance: '',
  apiUrl: '',
}

export function LoginPage() {
  const { isLoading, login } = useLogin()
  const { values, errors, handleChange, handleSubmit } = useForm(
    INITIAL_VALUES,
    validateCredentials,
    login,
  )

  return (
    <FormCard
      icon={PaperPlaneIcon}
      title='Вход'
      description='Введите данные инстанса из личного кабинета GREEN-API'
      onSubmit={handleSubmit}
    >
      <Input
        name='idInstance'
        label='idInstance'
        required
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
        required
        type='password'
        autoComplete='off'
        value={values.apiTokenInstance}
        error={errors.apiTokenInstance}
        onChange={handleChange}
      />
      <Input
        name='apiUrl'
        label='apiUrl'
        type='url'
        placeholder='https://1234.api.green-api.com'
        hint='Необязательно: по умолчанию определяется по idInstance'
        autoComplete='off'
        value={values.apiUrl}
        error={errors.apiUrl}
        onChange={handleChange}
      />
      <Button type='submit' fullWidth loading={isLoading}>
        Войти
      </Button>
    </FormCard>
  )
}
