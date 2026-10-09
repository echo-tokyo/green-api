import { LogOut, X } from 'lucide-react'
import { Outlet, useMatch, useNavigate } from 'react-router'
import { IconButton } from '@/components/ui'
import { ROUTES } from '@/app/routes'
import { logout } from '@/services/auth'
import styles from './MainLayout.module.scss'

export function MainLayout() {
  const navigate = useNavigate()
  const chatMatch = useMatch(ROUTES.chat)
  const isCloseChatDisabled = chatMatch === null

  function handleCloseChat(): void {
    navigate(ROUTES.search)
  }

  function handleLogout(): void {
    logout()
    navigate(ROUTES.login)
  }

  return (
    <div className={styles.layout}>
      <nav className={styles.sidebar} aria-label='Меню'>
        <IconButton
          icon={X}
          label='Закрыть чат'
          disabled={isCloseChatDisabled}
          onClick={handleCloseChat}
        />
        <IconButton
          icon={LogOut}
          label='Выйти из аккаунта'
          className={styles.logout}
          onClick={handleLogout}
        />
      </nav>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  )
}
