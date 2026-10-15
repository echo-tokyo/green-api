import { TriangleAlert } from 'lucide-react'
import { FormCard } from '@/components/FormCard/FormCard'
import { Button } from '@/components/ui'
import styles from './ErrorPage.module.scss'

export function ErrorPage() {
  function handleReload() {
    window.location.reload()
  }

  return (
    <main className={styles.page}>
      <FormCard
        icon={TriangleAlert}
        title='Что-то пошло не так'
        description='Произошла непредвиденная ошибка. Попробуйте обновить страницу'
      >
        <Button fullWidth onClick={handleReload}>
          Обновить страницу
        </Button>
      </FormCard>
    </main>
  )
}
