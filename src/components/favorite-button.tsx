// El marcador de guardar: quien decide que pasa al pulsarlo es el contexto de favoritos
import styled from 'styled-components'

import { IconBookmark } from '@/components/icons'

interface FavoriteButtonProps {
  name: string
  isFavorite?: boolean
  onToggle?: () => void
}

const Toggle = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  flex: none;
  border: 0.0625rem solid var(--color-rule);
  background: transparent;
  color: var(--color-accent);
  cursor: pointer;
  transition: border-color var(--speed) ease, background-color var(--speed) ease;

  &:hover {
    border-color: var(--color-accent);
  }

  &:active {
    background: var(--color-paper-deep);
  }
`

const FavoriteButton = ({ name, isFavorite = false, onToggle }: FavoriteButtonProps) => {
  const text = isFavorite ? `Quitar ${name} de favoritos` : `Guardar ${name} en favoritos`

  return (
    <Toggle type="button" title={text} aria-label={text} aria-pressed={isFavorite} onClick={onToggle}>
      <IconBookmark fill={isFavorite ? 'currentColor' : 'none'} />
    </Toggle>
  )
}

export default FavoriteButton
