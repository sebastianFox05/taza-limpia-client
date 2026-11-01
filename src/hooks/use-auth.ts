// Acceso a la sesion desde cualquier componente
import { useContext } from 'react'

import { AuthContext } from '@/context/auth-context'
import type { AuthContextValue } from '@/context/auth-context'

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext)

  if (!context) throw new Error('useAuth tiene que usarse dentro de AuthProvider')

  return context
}
