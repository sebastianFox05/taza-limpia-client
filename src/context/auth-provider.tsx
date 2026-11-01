import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import { ENDPOINTS, STORAGE_KEYS } from '@/const/api'
import { AuthContext } from '@/context/auth-context'
import type { AuthState } from '@/context/auth-context'
import { ApiError, apiRequest, setSessionExpiredHandler } from '@/services/api-client'
import { readStorage, removeStorage, writeStorage } from '@/services/storage'
import type { User } from '@/types/coffee'

interface LoginResponse {
  token: string
  user: User
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>(() => ({
    user: null,
    isChecking: Boolean(readStorage<string>(STORAGE_KEYS.TOKEN)),
    isSessionExpired: false,
    hasConnectionError: false,
  }))

  const login = useCallback(async (email: string, password: string) => {
    const { token, user } = await apiRequest<LoginResponse>(ENDPOINTS.LOGIN, {
      method: 'POST',
      body: { email, password },
    })

    writeStorage(STORAGE_KEYS.TOKEN, token)
    setAuth({ user, isChecking: false, isSessionExpired: false, hasConnectionError: false })
  }, [])

  const logout = useCallback(() => {
    removeStorage(STORAGE_KEYS.TOKEN)
    setAuth({ user: null, isChecking: false, isSessionExpired: false, hasConnectionError: false })
  }, [])

  useEffect(() => {
    setSessionExpiredHandler(() => {
      removeStorage(STORAGE_KEYS.TOKEN)
      setAuth({ user: null, isChecking: false, isSessionExpired: true, hasConnectionError: false })
    })

    return () => setSessionExpiredHandler(null)
  }, [])

  // Al recargar solo tengo el token, asi que pregunto a la API de quien es
  useEffect(() => {
    if (!readStorage<string>(STORAGE_KEYS.TOKEN)) return undefined

    const controller = new AbortController()

    apiRequest<{ user: User }>(ENDPOINTS.CURRENT_USER, { signal: controller.signal })
      .then(({ user }) => setAuth((prev) => ({ ...prev, user, isChecking: false })))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        // Si es un 401 ya lo ha resuelto el handler de arriba
        // Si no, es que no hay servidor: el token puede seguir siendo bueno, no lo mando al login
        if (!(error instanceof ApiError && error.status === 401)) {
          setAuth((prev) => ({ ...prev, isChecking: false, hasConnectionError: true }))
        }
      })

    return () => controller.abort()
  }, [])

  const value = useMemo(() => ({ ...auth, login, logout }), [auth, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
