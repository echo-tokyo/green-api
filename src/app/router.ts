import { createBrowserRouter } from 'react-router'
import { ChatPage } from '@/pages/ChatPage/ChatPage'
import { LoginPage } from '@/pages/LoginPage/LoginPage'
import { SearchPage } from '@/pages/SearchPage/SearchPage'
import { AuthLayout } from './layouts/AuthLayout/AuthLayout'
import { MainLayout } from './layouts/MainLayout/MainLayout'
import { redirectToSearch, requireAuth, requireGuest } from './route-guards'
import { ROUTES } from './routes'

export const router = createBrowserRouter([
  {
    Component: AuthLayout,
    loader: requireGuest,
    children: [{ path: ROUTES.login, Component: LoginPage }],
  },
  {
    Component: MainLayout,
    loader: requireAuth,
    children: [
      { path: ROUTES.search, Component: SearchPage },
      { path: ROUTES.chat, Component: ChatPage },
    ],
  },
  { path: '*', loader: redirectToSearch },
])
