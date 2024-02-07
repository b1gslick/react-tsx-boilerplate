import { App } from './components/App'
import React from 'react'
import { createRoot } from 'react-dom/client'

const root = document.getElementById('root') as HTMLElement
createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
