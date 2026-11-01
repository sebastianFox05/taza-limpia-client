import styled from 'styled-components'

interface SpecSheetProps {
  items: { term: string; value: string }[]
}

const List = styled.dl`
  margin: 0;
  border-top: var(--rule-ink);
`

const Row = styled.div`
  display: grid;
  grid-template-columns: minmax(6rem, 2fr) minmax(0, 5fr);
  gap: 1rem;
  padding-block: 0.5rem;
  border-bottom: var(--rule-thin);
`

const Term = styled.dt`
  color: var(--color-ink-soft);
  font-family: var(--font-data);
  font-size: var(--text-small);
`

const Value = styled.dd`
  margin: 0;
`

// La tabla de datos de cada ficha
const SpecSheet = ({ items }: SpecSheetProps) => (
  <List>
    {items.map(({ term, value }) => (
      <Row key={term}>
        <Term>{term}</Term>
        <Value>{value}</Value>
      </Row>
    ))}
  </List>
)

export default SpecSheet
