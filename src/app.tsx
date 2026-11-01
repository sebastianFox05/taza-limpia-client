import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import ProtectedRoute from '@/components/protected-route'
import SiteLayout from '@/components/site-layout'
import { ROUTES } from '@/const/routes'

// Cada pagina va en su propio chunk, el catalogo no tiene por que cargar el panel
const HomePage = lazy(() => import('@/pages/home-page'))
const CatalogPage = lazy(() => import('@/pages/catalog-page'))
const CoffeeDetailPage = lazy(() => import('@/pages/coffee-detail-page'))
const StatsPage = lazy(() => import('@/pages/stats-page'))
const GuidePage = lazy(() => import('@/pages/guide-page'))
const FavoritesPage = lazy(() => import('@/pages/favorites-page'))
const LoginPage = lazy(() => import('@/pages/login-page'))
const PanelPage = lazy(() => import('@/pages/panel-page'))
const CoffeeFormPage = lazy(() => import('@/pages/coffee-form-page'))
const NotFoundPage = lazy(() => import('@/pages/not-found-page'))

const App = () => (
  <Routes>
    <Route element={<SiteLayout />}>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.CATALOG} element={<CatalogPage />} />
      <Route path={ROUTES.COFFEE_DETAIL} element={<CoffeeDetailPage />} />
      <Route path={ROUTES.STATS} element={<StatsPage />} />
      <Route path={ROUTES.GUIDE} element={<GuidePage />} />
      <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path={ROUTES.PANEL} element={<PanelPage />} />
        <Route path={ROUTES.PANEL_NEW} element={<CoffeeFormPage />} />
        <Route path={ROUTES.PANEL_EDIT} element={<CoffeeFormPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
)

export default App
