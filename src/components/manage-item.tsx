import { Link } from 'react-router-dom'
import styled from 'styled-components'

import CoffeeLabel from '@/components/coffee-label'
import { PROCESS_LABELS } from '@/const/coffee'
import { buildCoffeePath, buildEditPath } from '@/const/routes'
import type { Coffee } from '@/types/coffee'

interface ManageItemProps extends Omit<Coffee, '_id'> {
  id: string
  onDelete: (id: string, name: string) => void
}

const Info = styled.div`
  min-width: 0;
`

const Item = styled.li`
  display: grid;
  grid-template-columns: 3.5rem minmax(0, 1fr) auto;
  gap: var(--space-m);
  align-items: center;
  padding-block: var(--space-s);
  border-bottom: var(--rule-thin);

  @media (max-width: 560px) {
    grid-template-columns: 3rem minmax(0, 1fr);
  }
`

const Name = styled(Link)`
  font-family: var(--font-display);
  font-size: var(--text-large);
  line-height: 1.2;
  text-decoration: none;
`

const Meta = styled.p`
  font-family: var(--font-data);
  font-size: var(--text-small);
  color: var(--color-ink-soft);
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
  gap: var(--space-xs);

  @media (max-width: 560px) {
    grid-column: 1 / -1;
    justify-content: start;
  }
`

// Una fila de la lista del panel. Borrar no pasa aqui: primero pregunta el dialogo
const ManageItem = ({ id, name, country, region, process, roast, score, imageUrl, onDelete }: ManageItemProps) => (
  <Item>
    <CoffeeLabel name={name} country={country} process={process} roast={roast} imageUrl={imageUrl} />
    <Info>
      <Name to={buildCoffeePath(id)} title={`Ver la ficha de ${name}`}>{name}</Name>
      <Meta>{score} pts · {PROCESS_LABELS[process]} · {region}</Meta>
    </Info>
    <Actions>
      <Link className="Button Button--small" to={buildEditPath(id)} title={`Editar ${name}`}>Editar</Link>
      <button type="button" className="Button Button--small Button--danger" title={`Eliminar ${name}`} onClick={() => onDelete(id, name)}>
        Eliminar
      </button>
    </Actions>
  </Item>
)

export default ManageItem
