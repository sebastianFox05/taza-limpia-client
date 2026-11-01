import { createContext } from 'react'

export interface FavoritesContextValue {
  favoriteIds: string[]
  toggleFavorite: (id: string) => void
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(null)
