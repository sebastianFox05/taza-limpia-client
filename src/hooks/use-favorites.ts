// Acceso a los favoritos desde cualquier componente
import { useContext } from 'react'

import { FavoritesContext } from '@/context/favorites-context'
import type { FavoritesContextValue } from '@/context/favorites-context'

export const useFavorites = (): FavoritesContextValue => {
  const context = useContext(FavoritesContext)

  if (!context) throw new Error('useFavorites tiene que usarse dentro de FavoritesProvider')

  return context
}
