import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import { App } from '../src/components/App'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

describe('common render', () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
    },
  ])

  it('renders without crushing', () => {
    render(<RouterProvider router={router} />)
  })
})
