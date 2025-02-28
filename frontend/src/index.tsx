import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { AppProvider } from 'context/AppContext'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error(
    "Root element not found! Make sure you have an element with id 'root' in your index.html."
  )
}

const root = ReactDOM.createRoot(rootElement as HTMLElement)
root.render(
  // <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  // </React.StrictMode>
)

reportWebVitals()
