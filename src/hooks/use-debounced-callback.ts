import { useCallback, useEffect, useRef } from 'react'

// Espera a que pasen unos milisegundos sin llamadas, y siempre ejecuta la ultima version de la funcion
export const useDebouncedCallback = <Args extends unknown[]>(callback: (...args: Args) => void, delay = 350) => {
  const callbackRef = useRef(callback)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    callbackRef.current = callback
  })

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const cancel = useCallback(() => clearTimeout(timerRef.current), [])

  const schedule = useCallback(
    (...args: Args) => {
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => callbackRef.current(...args), delay)
    },
    [delay],
  )

  return { schedule, cancel }
}
