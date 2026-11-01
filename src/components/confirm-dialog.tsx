import { useEffect, useRef } from 'react'
import type { KeyboardEvent } from 'react'

import { useEscapeKey } from '@/hooks/use-escape-key'

interface ConfirmDialogProps {
  coffeeName: string
  isDeleting?: boolean
  onCancel: () => void
  onConfirm: () => void
}

const ConfirmDialog = ({ coffeeName, isDeleting = false, onCancel, onConfirm }: ConfirmDialogProps) => {
  const boxRef = useRef<HTMLDivElement>(null)
  const cancelRef = useRef<HTMLButtonElement>(null)

  // Empieza en Cancelar, que es la opcion que no borra nada, y al cerrar vuelve al boton de origen
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    cancelRef.current?.focus()
    return () => previousFocus?.focus()
  }, [])

  useEscapeKey(onCancel, !isDeleting)

  // Mientras este abierto, Tab no se sale del dialogo
  const boxKeyDownHandler = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab' || !boxRef.current) return

    const buttons = boxRef.current.querySelectorAll<HTMLButtonElement>('button:not(:disabled)')
    const first = buttons[0]
    const last = buttons[buttons.length - 1]

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <div className="Dialog">
      <div ref={boxRef} className="Dialog-box" role="alertdialog" aria-modal aria-labelledby="borrar-titulo" aria-describedby="borrar-texto" onKeyDown={boxKeyDownHandler}>
        <h2 id="borrar-titulo" className="Dialog-title">Eliminar {coffeeName}</h2>
        <p id="borrar-texto">La ficha desaparecerá de la guía y no se puede recuperar. El borrado queda anotado en el historial.</p>
        <div className="Dialog-actions">
          <button type="button" className="Button Button--primary" title={`Eliminar ${coffeeName}`} disabled={isDeleting} onClick={onConfirm}>
            {isDeleting ? 'Eliminando…' : 'Sí, eliminar'}
          </button>
          <button ref={cancelRef} type="button" className="Button" title="Volver sin eliminar" disabled={isDeleting} onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
