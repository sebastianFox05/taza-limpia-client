import styled from 'styled-components'

// Etiqueta pequena para notas de cata, proceso o tueste
const Badge = styled.span<{ $isStrong?: boolean }>`
  display: inline-block;
  padding: 0.0625rem 0.5rem;
  border: 0.0625rem solid ${({ $isStrong }) => ($isStrong ? 'var(--color-accent)' : 'var(--color-rule)')};
  color: ${({ $isStrong }) => ($isStrong ? 'var(--color-accent)' : 'var(--color-ink)')};
  font-family: var(--font-data);
  font-size: var(--text-small);
`

export default Badge
