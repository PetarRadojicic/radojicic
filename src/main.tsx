/**
 * Main entry point for the application
 * 
 * This file initializes the React application and renders the root component.
 * It also imports global styles and i18n configuration.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n' // Initialize internationalization before rendering the app
import App from './App.tsx'

// Create React root and render the application
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
