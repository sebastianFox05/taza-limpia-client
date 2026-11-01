import { createContext } from 'react'

import type { User } from '@/types/coffee'

export interface AuthState {
  user: User | null
  isChecking: boolean
  isSessionExpired: boolean
  hasConnectionError: boolean
}

export interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
