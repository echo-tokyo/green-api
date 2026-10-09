import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { Toaster } from 'sonner'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import './styles/index.scss'
import { router } from './router'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element #root not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster theme='dark' position='bottom-center' />
  </StrictMode>,
)
