// Logotipo, siempre enlaza a la portada
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ROUTES } from '@/const/routes'

const LogoLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  font-family: var(--font-display);
  font-size: 1.5rem;
  line-height: 1;
  text-decoration: none;

  &:hover {
    color: var(--color-accent);
  }
`

const LogoMark = styled.svg`
  width: 2rem;
  height: 2rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.2;
`

const Logo = () => (
  <LogoLink to={ROUTES.HOME} title="Ir a la portada de Taza Limpia">
    <LogoMark viewBox="0 0 32 32" aria-hidden>
      <path d="M6 10h17v8a7 7 0 0 1-7 7h-3a7 7 0 0 1-7-7zM23 12h2a3.500 3.500 0 0 1 0 7h-2" />
    </LogoMark>
    Taza Limpia
  </LogoLink>
)

export default Logo
