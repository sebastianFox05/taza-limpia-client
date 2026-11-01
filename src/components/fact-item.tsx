import styled from 'styled-components'

interface FactItemProps {
  label: string
  value: string | number
}

const Item = styled.li`
  padding: var(--space-m) var(--space-m) var(--space-m) 0;
`

const Value = styled.span`
  display: block;
  font-family: var(--font-display);
  font-size: var(--text-title);
  line-height: 1.1;
`

const Label = styled.span`
  font-family: var(--font-data);
  font-size: var(--text-small);
`

// La cifra grande con su rotulo, se repite en portada, origenes y panel
const FactItem = ({ label, value }: FactItemProps) => (
  <Item>
    <Value>{value}</Value>
    <Label>{label}</Label>
  </Item>
)

export default FactItem
