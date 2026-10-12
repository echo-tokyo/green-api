import { useState } from 'react'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { Toaster } from 'sonner'
import { routes } from '@/app/router/router'

interface TestAppProps {
  path: string
}

export function TestApp({ path }: TestAppProps) {
  const [router] = useState(() =>
    createMemoryRouter(routes, { initialEntries: [path] }),
  )

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}
