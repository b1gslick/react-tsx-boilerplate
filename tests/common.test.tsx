import * as React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import App from '../src/App'

describe('common render', () => {
  it('renders without crushing', () => {
    render(<App />)
  })
})
