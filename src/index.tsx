import { App } from './components/App'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'
import { LazyAbout } from '@/pages/about/About.lazy'
import { LazyShop } from '@/pages/shop/Shop.lazy'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/about',
        element: (
          <Suspense fallback={'Loading...'}>
            <LazyAbout />
          </Suspense>
        ),
      },
      {
        path: '/shop',
        element: (
          <Suspense fallback={'Loading...'}>
            <LazyShop />
          </Suspense>
        ),
      },
    ],
  },
])

const root = document.getElementById('root') as HTMLElement
createRoot(root).render(<RouterProvider router={router} />)
