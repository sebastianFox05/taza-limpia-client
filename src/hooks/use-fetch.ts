import { useCallback, useEffect, useState } from 'react'

import { CACHE_MAX_AGE, STORAGE_KEYS } from '@/const/api'
import { apiRequest, getErrorMessage } from '@/services/api-client'
import { readStorage, removeStorage, removeStorageByPrefix, writeStorage } from '@/services/storage'

interface CacheEntry<T> {
  savedAt: number
  data: T
}

interface FetchState<T> {
  data: T | null
  isLoading: boolean
  error: string
}

interface FetchResult<T> extends FetchState<T> {
  reload: () => void
}

// Hecho con ayuda de IA: la cache en localStorage de este hook
const readCache = <T>(path: string): T | null => {
  const key = `${STORAGE_KEYS.CACHE_PREFIX}${path}`
  const entry = readStorage<CacheEntry<T>>(key)

  if (!entry) return null

  if (Date.now() - entry.savedAt > CACHE_MAX_AGE) {
    removeStorage(key)
    return null
  }

  return entry.data
}

const writeCache = <T>(path: string, data: T): void => {
  writeStorage(`${STORAGE_KEYS.CACHE_PREFIX}${path}`, { savedAt: Date.now(), data })
}

// Hay que llamarlo despues de crear, editar o borrar
export const clearFetchCache = (): void => removeStorageByPrefix(STORAGE_KEYS.CACHE_PREFIX)

export const useFetch = <T>(path: string | null, isCached = true): FetchResult<T> => {
  const [state, setState] = useState<FetchState<T>>(() => {
    const data = path && isCached ? readCache<T>(path) : null
    return { data, isLoading: Boolean(path) && !data, error: '' }
  })
  const [reloadCount, setReloadCount] = useState(0)

  const reload = useCallback(() => setReloadCount((count) => count + 1), [])

  useEffect(() => {
    if (!path) return undefined

    const cached = isCached ? readCache<T>(path) : null

    if (cached) {
      setState({ data: cached, isLoading: false, error: '' })
      return undefined
    }

    const controller = new AbortController()

    // Dejo los datos anteriores mientras llega la respuesta para que la lista no parpadee
    setState((prev) => ({ ...prev, isLoading: true, error: '' }))

    apiRequest<T>(path, { signal: controller.signal })
      .then((data) => {
        if (isCached) writeCache(path, data)
        setState({ data, isLoading: false, error: '' })
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        setState({ data: null, isLoading: false, error: getErrorMessage(error) })
      })

    return () => controller.abort()
  }, [path, isCached, reloadCount])

  return { ...state, reload }
}
