import type { ChangeEventHandler, FormEventHandler } from 'react'
import styled from 'styled-components'

import { Field } from '@/components/field'
import { PROCESS_OPTIONS, ROAST_OPTIONS } from '@/const/coffee'
import { ROUTES } from '@/const/routes'

interface CatalogFiltersProps {
  q: string
  minScore: string
  processes: string[]
  roasts: string[]
  onFieldChange: ChangeEventHandler<HTMLInputElement>
  onSubmit: FormEventHandler<HTMLFormElement>
  onReset: FormEventHandler<HTMLFormElement>
}

const Form = styled.form`
  display: grid;
  gap: var(--space-m);
  align-content: start;

  @media (min-width: 621px) and (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const FullRow = styled.div`
  @media (min-width: 621px) and (max-width: 980px) {
    grid-column: 1 / -1;
  }
`

const Group = styled.fieldset`
  margin: 0;
  padding: var(--space-s) 0 0;
  border: 0;
  border-top: var(--rule-ink);
`

const ScoreGroup = styled(Group).attrs({ as: 'div' })``

const Legend = styled.legend`
  padding: 0;
  font-family: var(--font-data);
  font-size: var(--text-small);
`

const Options = styled.div`
  display: grid;
  gap: 0.125rem;
  margin-top: var(--space-xs);

  @media (min-width: 621px) and (max-width: 980px) {
    grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  }
`

const Option = styled.label`
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  min-height: 2.25rem;
  cursor: pointer;
  transition: color var(--speed) ease;

  &:hover {
    color: var(--color-accent);
  }

  input {
    width: 1.0625rem;
    height: 1.0625rem;
    accent-color: var(--color-accent);
  }
`

// Solo pinta: el estado de los filtros vive en la pagina del catalogo
const CatalogFilters = ({ q, minScore, processes, roasts, onFieldChange, onSubmit, onReset }: CatalogFiltersProps) => (
  <Form action={ROUTES.CATALOG} method="get" onSubmit={onSubmit} onReset={onReset}>
    <FullRow>
      <Field label="Buscar" id="filtro-busqueda" name="q" type="search" placeholder="País, región o nota" value={q} onChange={onFieldChange} />
    </FullRow>

    <Group>
      <Legend>Proceso</Legend>
      <Options>
        {PROCESS_OPTIONS.map(([value, label]) => (
          <Option key={value}>
            <input type="checkbox" name="process" value={value} checked={processes.includes(value)} onChange={onFieldChange} />
            {label}
          </Option>
        ))}
      </Options>
    </Group>

    <Group>
      <Legend>Tueste</Legend>
      <Options>
        {ROAST_OPTIONS.map(([value, label]) => (
          <Option key={value}>
            <input type="checkbox" name="roast" value={value} checked={roasts.includes(value)} onChange={onFieldChange} />
            {label}
          </Option>
        ))}
      </Options>
    </Group>

    <ScoreGroup>
      <Field label="Puntuación mínima" id="filtro-puntuacion" name="minScore" type="number" min="80" max="100" step="1" placeholder="80" value={minScore} onChange={onFieldChange} />
    </ScoreGroup>

    <FullRow>
      <button type="reset" className="Button Button--small" title="Quitar todos los filtros">
        Quitar filtros
      </button>
    </FullRow>
  </Form>
)

export default CatalogFilters
