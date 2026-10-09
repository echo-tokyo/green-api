import { Outlet } from 'react-router'
import styles from './AuthLayout.module.scss'

export function AuthLayout() {
  return (
    <main className={styles.layout}>
      <Outlet />
    </main>
  )
}
