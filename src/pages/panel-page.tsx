import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import ActivityItem from '@/components/activity-item'
import ConfirmDialog from '@/components/confirm-dialog'
import EmptyState from '@/components/empty-state'
import FactItem from '@/components/fact-item'
import ManageItem from '@/components/manage-item'
import Notice from '@/components/notice'
import PageIntro from '@/components/page-intro'
import Spinner from '@/components/spinner'
import { ENDPOINTS } from '@/const/api'
import { ROUTES } from '@/const/routes'
import { useActivity, useCoffees, useStats } from '@/hooks/use-coffees'
import { clearFetchCache } from '@/hooks/use-fetch'
import { apiRequest, getErrorMessage } from '@/services/api-client'

interface DeleteState {
  target: { id: string; name: string } | null
  isDeleting: boolean
  error: string
  success: string
}

const PanelPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { coffees, hasData, isLoading, error, reload: reloadCoffees } = useCoffees('sort=name')
  const { stats, reload: reloadStats } = useStats()
  const { activity, error: activityError, reload: reloadActivity } = useActivity()
  const [deletion, setDeletion] = useState<DeleteState>(() => ({
    target: null,
    isDeleting: false,
    error: '',
    success: (location.state as { message?: string } | null)?.message ?? '',
  }))

  const summary = stats?.summary
  const facts = summary
    ? [
        { label: 'fichas publicadas', value: summary.total },
        { label: 'puntuación media', value: summary.averageScore },
        { label: 'destacados en portada', value: coffees.filter(({ isFeatured }) => isFeatured).length },
      ]
    : []

  // El mensaje del formulario se ve una vez: si recargas no vuelve a salir
  useEffect(() => {
    if (location.state) navigate(location.pathname, { replace: true, state: null })
  }, [location.state, location.pathname, navigate])

  const deleteRequestHandler = (id: string, name: string) => {
    setDeletion((prev) => ({ ...prev, target: { id, name }, error: '', success: '' }))
  }

  const deleteCancelHandler = useCallback(() => {
    setDeletion((prev) => ({ ...prev, target: null }))
  }, [])

  const deleteConfirmHandler = async () => {
    if (!deletion.target) return

    setDeletion((prev) => ({ ...prev, isDeleting: true }))

    try {
      const { message } = await apiRequest<{ message: string }>(`${ENDPOINTS.COFFEES}/${deletion.target.id}`, { method: 'DELETE' })

      clearFetchCache()
      reloadCoffees()
      reloadStats()
      reloadActivity()
      setDeletion({ target: null, isDeleting: false, error: '', success: message })
    } catch (deleteError) {
      setDeletion({ target: null, isDeleting: false, error: getErrorMessage(deleteError), success: '' })
    }
  }

  return (
    <>
      <div className="Panel-head">
        <PageIntro title="Panel">Las fichas que mantienes y lo último que ha cambiado.</PageIntro>
        <Link className="Button Button--primary" to={ROUTES.PANEL_NEW} title="Añadir un café nuevo">Añadir café</Link>
      </div>

      {deletion.success && <Notice $isSuccess>{deletion.success}</Notice>}
      {deletion.error && <Notice>{deletion.error}</Notice>}

      {facts.length > 0 && (
        <ul className="Facts">
          {facts.map(({ label, ...fact }) => (
            <FactItem key={label} label={label} {...fact} />
          ))}
        </ul>
      )}

      <div className="Panel-grid">
        <section>
          <h2 className="Panel-subtitle">Fichas</h2>
          {isLoading && !hasData && <Spinner label="Cargando las fichas" />}
          {error && <Notice>{error}</Notice>}
          {hasData && !error && coffees.length === 0 && (
            <EmptyState title="La guía está vacía">Añade el primer café para que aparezca en el catálogo.</EmptyState>
          )}
          <ul>
            {coffees.map(({ _id, ...coffee }) => (
              <ManageItem key={_id} id={_id} onDelete={deleteRequestHandler} {...coffee} />
            ))}
          </ul>
        </section>

        <aside>
          <h2 className="Panel-subtitle">Últimos cambios</h2>
          {activityError && <Notice>{activityError}</Notice>}
          {!activityError && activity.length === 0 && <p>Todavía no hay cambios registrados.</p>}
          <ul>
            {activity.map(({ _id, ...entry }) => (
              <ActivityItem key={_id} {...entry} />
            ))}
          </ul>
        </aside>
      </div>

      {deletion.target && (
        <ConfirmDialog coffeeName={deletion.target.name} isDeleting={deletion.isDeleting} onCancel={deleteCancelHandler} onConfirm={deleteConfirmHandler} />
      )}
    </>
  )
}

export default PanelPage
