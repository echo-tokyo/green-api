import { LogOut, X } from 'lucide-react'
import { Outlet, useLocation, useMatch, useNavigate } from 'react-router'
import { IconButton } from '@/components/ui'
import { ROUTES } from '@/config/routes'
import { logout } from '@/services/auth/session'
import { useUnauthorizedRedirect } from './use-unauthorized-redirect'
import styles from './MainLayout.module.scss'

export function MainLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const chatMatch = useMatch(ROUTES.chat)
  const isCloseChatDisabled = chatMatch === null

  useUnauthorizedRedirect()

  function handleCloseChat(): void {
    void navigate(ROUTES.search)
  }

  function handleLogout(): void {
    logout()
    void navigate(ROUTES.login)
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
        <Outlet key={location.pathname} />
      </main>
    </div>
  )
}
