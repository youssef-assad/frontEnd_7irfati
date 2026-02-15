import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import AuthPage from './pages/AuthPage.jsx'
import "./i18n/i18n"
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthPage />
  </StrictMode>,
)
