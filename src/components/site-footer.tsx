// Pie comun a todas las paginas
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ROUTES } from '@/const/routes'

const Brand = styled.div`
  max-width: 32rem;
`

const Footer = styled.footer`
  border-top: var(--rule-heavy);
  background: var(--color-ink);
  color: var(--color-paper-light);
`

const Inner = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
  gap: 1.5rem clamp(2rem, 6vw, 6rem);
  max-width: 88rem;
  margin-inline: auto;
  padding: 2.5rem clamp(1rem, 4vw, 3rem);
`

const Name = styled.p`
  font-family: var(--font-display);
  font-size: 1.5rem;
`

const Text = styled.p`
  margin-top: 0.5rem;
  font-size: var(--text-small);
`

const FooterLink = styled(Link)`
  display: block;
  padding-block: 0.25rem;
  color: var(--color-paper-light);
  font-family: var(--font-data);
  font-size: var(--text-small);

  &:hover {
    color: var(--color-paper-deep);
  }
`

const SiteFooter = () => (
  <Footer>
    <Inner>
      <Brand>
        <Name>Taza Limpia</Name>
        <Text>En cata, una taza limpia es la que no tiene defectos: solo se nota el café.</Text>
      </Brand>
      <nav aria-label="Enlaces del pie">
        <FooterLink to={ROUTES.CATALOG} title="Ir al catálogo">Catálogo</FooterLink>
        <FooterLink to={ROUTES.GUIDE} title="Ir a la guía">Guía de cata</FooterLink>
        <FooterLink to={ROUTES.STATS} title="Ir a orígenes">Orígenes</FooterLink>
      </nav>
      <Text>Proyecto final de Desarrollo Fullstack en CEI. React, Express y MongoDB.</Text>
    </Inner>
  </Footer>
)

export default SiteFooter
