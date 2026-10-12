import { createBrowserRouter, type RouteObject } from 'react-router'
import { AuthLayout } from '@/app/layouts/AuthLayout/AuthLayout'
import { MainLayout } from '@/app/layouts/MainLayout/MainLayout'
import { ROUTES } from '@/config/routes'
import { ChatPage } from '@/pages/ChatPage/ChatPage'
import { ErrorPage } from '@/pages/ErrorPage/ErrorPage'
import { LoginPage } from '@/pages/LoginPage/LoginPage'
import { SearchPage } from '@/pages/SearchPage/SearchPage'
import { redirectToSearch, requireAuth, requireGuest } from './route-guards'

export const routes: RouteObject[] = [
  {
    Component: AuthLayout,
    ErrorBoundary: ErrorPage,
    loader: requireGuest,
    children: [{ path: ROUTES.login, Component: LoginPage }],
  },
  {
    Component: MainLayout,
    ErrorBoundary: ErrorPage,
    loader: requireAuth,
    children: [
      { path: ROUTES.search, Component: SearchPage },
      { path: ROUTES.chat, Component: ChatPage },
    ],
  },
  { path: '*', loader: redirectToSearch },
]

export const router = createBrowserRouter(routes)
