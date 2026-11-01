// El orden de los CSS importa: primero las variables y la base
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from '@/app'
import { AuthProvider } from '@/context/auth-provider'
import { FavoritesProvider } from '@/context/favorites-provider'
import '@/css/tokens.css'
import '@/css/base.css'
import '@/css/layout.css'
import '@/css/button.css'
import '@/css/nav.css'
import '@/css/form.css'
import '@/css/dialog.css'
import '@/css/home.css'
import '@/css/catalog.css'
import '@/css/detail.css'
import '@/css/stats.css'
import '@/css/guide.css'
import '@/css/login.css'
import '@/css/panel.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
