import { MessageCirclePlus } from 'lucide-react'
import { useNavigate } from 'react-router'
import { getChatRoute } from '@/app/routes'
import { FormCard } from '@/components/FormCard/FormCard'
import { Button, Input } from '@/components/ui'
import { useForm } from '@/hooks/use-form'
import type { PhoneForm } from '@/types/form'
import { normalizePhone } from '@/utils/phone'
import { validatePhone } from '@/utils/validation'
import styles from './SearchPage.module.scss'

const INITIAL_VALUES: PhoneForm = { phone: '' }

export function SearchPage() {
  const navigate = useNavigate()

  function openChat({ phone }: PhoneForm): void {
    navigate(getChatRoute(normalizePhone(phone)))
  }

  const { values, errors, handleChange, handleSubmit } = useForm(
    INITIAL_VALUES,
    validatePhone,
    openChat,
  )

  return (
    <div className={styles.page}>
      <FormCard
        icon={MessageCirclePlus}
        title='Новый чат'
        description='Введите номер телефона собеседника в Telegram'
        onSubmit={handleSubmit}
      >
        <Input
          name='phone'
          label='Номер телефона'
          type='tel'
          placeholder='+7 999 123 45 67'
          autoComplete='tel'
          autoFocus
          value={values.phone}
          error={errors.phone}
          onChange={handleChange}
        />
        <Button type='submit' fullWidth>
          Начать чат
        </Button>
      </FormCard>
    </div>
  )
}
