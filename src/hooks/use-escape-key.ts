// Lo usan el menu movil y el dialogo de borrar
import { useEffect } from 'react'

export const useEscapeKey = (onEscape: () => void, isActive = true): void => {
  useEffect(() => {
    if (!isActive) return undefined

    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onEscape()
    }

    document.addEventListener('keydown', keyDownHandler)
    return () => document.removeEventListener('keydown', keyDownHandler)
  }, [onEscape, isActive])
}
