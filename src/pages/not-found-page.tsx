// Cualquier ruta que no exista en el front acaba aqui
import { Link } from 'react-router-dom'

import PageIntro from '@/components/page-intro'
import { ROUTES } from '@/const/routes'

const NotFoundPage = () => (
  <>
    <PageIntro title="Esta página no está en la guía">
      La dirección no existe o ha cambiado.
    </PageIntro>
    <p className="Hero-actions">
      <Link className="Button Button--primary" to={ROUTES.CATALOG} title="Ir al catálogo">Ir al catálogo</Link>
      <Link className="Button" to={ROUTES.HOME} title="Ir a la portada">Ir a la portada</Link>
    </p>
  </>
)

export default NotFoundPage
