export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000'

export const ENDPOINTS = {
  LOGIN: '/auth/login',
  CURRENT_USER: '/auth/me',
  COFFEES: '/coffees',
  STATS: '/stats',
  ACTIVITY: '/stats/activity',
} as const

export const STORAGE_KEYS = {
  TOKEN: 'taza-limpia:token',
  FAVORITES: 'taza-limpia:favoritos',
  CACHE_PREFIX: 'taza-limpia:cache:',
} as const

// Cinco minutos: la guia cambia poco y asi el catalogo aparece al instante
export const CACHE_MAX_AGE = 5 * 60 * 1000
