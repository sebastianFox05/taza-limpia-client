import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import SiteFooter from '@/components/site-footer'
import SiteHeader from '@/components/site-header'
import Spinner from '@/components/spinner'

const SiteLayout = () => {
  const { pathname, hash } = useLocation()

  // React Router no sube el scroll al cambiar de pagina. Con #seccion se encarga la guia.
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <div className="Site">
      <a className="Site-skip" href="#contenido" title="Saltar al contenido">
        Saltar al contenido
      </a>
      <SiteHeader />
      <main id="contenido" className="Site-main">
        {/* El Suspense va aqui para que cabecera y pie no parpadeen al cambiar de ruta */}
        <Suspense fallback={<Spinner label="Cargando la página" />}>
          <Outlet />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  )
}

export default SiteLayout
