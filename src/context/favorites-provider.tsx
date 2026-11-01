import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import { STORAGE_KEYS } from '@/const/api'
import { FavoritesContext } from '@/context/favorites-context'
import { readStorage, writeStorage } from '@/services/storage'

// Los favoritos no piden cuenta, se quedan en este navegador
export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => readStorage<string[]>(STORAGE_KEYS.FAVORITES) ?? [])

  const toggleFavorite = useCallback((id: string) => {
    setFavoriteIds((prev) => (prev.includes(id) ? prev.filter((favoriteId) => favoriteId !== id) : [...prev, id]))
  }, [])

  useEffect(() => {
    writeStorage(STORAGE_KEYS.FAVORITES, favoriteIds)
  }, [favoriteIds])

  const value = useMemo(() => ({ favoriteIds, toggleFavorite }), [favoriteIds, toggleFavorite])

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}
