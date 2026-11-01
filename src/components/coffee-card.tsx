// Ficha resumida que se usa en portada, catalogo y favoritos
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Badge from '@/components/badge'
import CoffeeLabel from '@/components/coffee-label'
import FavoriteButton from '@/components/favorite-button'
import { PROCESS_LABELS, ROAST_LABELS } from '@/const/coffee'
import { buildCoffeePath } from '@/const/routes'
import type { Coffee } from '@/types/coffee'

interface CoffeeCardProps extends Omit<Coffee, '_id'> {
  id: string
  isFavorite?: boolean
  onFavoriteToggle?: (id: string) => void
}

const Body = styled.div`
  min-width: 0;
`

const Card = styled.article`
  display: grid;
  grid-template-columns: 6.5rem minmax(0, 1fr);
  gap: 1.125rem;
  height: 100%;
  padding-block: 1.25rem;
  border-bottom: var(--rule-thin);

  @media (max-width: 420px) {
    grid-template-columns: 4.5rem minmax(0, 1fr);
    gap: 0.75rem;
  }
`

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
`

const Heading = styled.div`
  min-width: 0;
`

const Name = styled.h3`
  font-size: 1.25rem;
  hyphens: auto;
  overflow-wrap: break-word;
`

const NameLink = styled(Link)`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const Origin = styled.p`
  margin-top: 0.25rem;
  color: var(--color-ink-soft);
  font-size: var(--text-small);
`

const Specs = styled.p`
  margin-top: 0.5rem;
  font-family: var(--font-data);
  font-size: var(--text-small);
`

const Score = styled.strong`
  color: var(--color-accent);
  font-weight: 500;
`

const Notes = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-top: 0.625rem;
`

const CoffeeCard = ({
  id,
  name,
  country,
  region,
  process,
  roast,
  altitude,
  score,
  notes,
  imageUrl,
  isDecaf,
  isFavorite,
  onFavoriteToggle,
}: CoffeeCardProps) => (
  <Card>
    <Link to={buildCoffeePath(id)} title={`Ver la ficha de ${name}`} tabIndex={-1} aria-hidden>
      <CoffeeLabel name={name} country={country} process={process} roast={roast} imageUrl={imageUrl} />
    </Link>
    <Body>
      <Top>
        <Heading>
          <Name>
            <NameLink to={buildCoffeePath(id)} title={`Ver la ficha de ${name}`}>
              {name}
            </NameLink>
          </Name>
          <Origin>
            {region}, {country}
          </Origin>
        </Heading>
        <FavoriteButton name={name} isFavorite={isFavorite} onToggle={() => onFavoriteToggle?.(id)} />
      </Top>
      <Specs>
        <Score>{score} pts</Score> · {PROCESS_LABELS[process]} · {ROAST_LABELS[roast]} · {altitude} m
      </Specs>
      <Notes>
        {notes.map((note) => (
          <li key={note}>
            <Badge>{note}</Badge>
          </li>
        ))}
        {isDecaf && (
          <li>
            <Badge $isStrong>descafeinado</Badge>
          </li>
        )}
      </Notes>
    </Body>
  </Card>
)

export default CoffeeCard
