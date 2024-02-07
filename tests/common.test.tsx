import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import { App } from '../src/components/App'

describe('common render', () => {
  it('renders without crushing', () => {
    render(<App />)
  })
})
