import styled from 'styled-components'

// Mensajes dentro de la pagina, nada de alert
const Notice = styled.p.attrs<{ $isSuccess?: boolean }>(({ $isSuccess }) => ({ role: $isSuccess ? 'status' : 'alert' }))<{ $isSuccess?: boolean }>`
  padding: 0.625rem 0.875rem;
  border-left: 0.25rem solid ${({ $isSuccess }) => ($isSuccess ? 'var(--color-ink)' : 'var(--color-accent)')};
  background: var(--color-paper-deep);
  color: ${({ $isSuccess }) => ($isSuccess ? 'var(--color-ink)' : 'var(--color-accent-dark)')};
`

export default Notice
