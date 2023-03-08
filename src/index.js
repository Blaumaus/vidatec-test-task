import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'

import { store } from 'redux/store'
import App from './App'
import './index.css'

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'sw-test-task:*'
}

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </Provider>,
  // </React.StrictMode>
)
