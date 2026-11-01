import { Navigate, Outlet, useLocation } from 'react-router-dom'

import Notice from '@/components/notice'
import Spinner from '@/components/spinner'
import { CONNECTION_ERROR } from '@/const/messages'
import { ROUTES } from '@/const/routes'
import { useAuth } from '@/hooks/use-auth'

const ProtectedRoute = () => {
  const { user, isChecking, hasConnectionError } = useAuth()
  const location = useLocation()

  if (isChecking) return <Spinner label="Comprobando tu sesión" />

  if (!user && hasConnectionError) return <Notice>{CONNECTION_ERROR}</Notice>

  // Guardo a donde iba para devolverlo ahi despues del login
  if (!user) return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />

  return <Outlet />
}

export default ProtectedRoute
