// Aviso de carga, tambien es el fallback del Suspense
import styled, { keyframes } from 'styled-components'

const fill = keyframes`
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
`

const Wrapper = styled.div`
  padding: 3rem 0;
  font-family: var(--font-data);
  font-size: var(--text-small);
`

const Line = styled.div`
  width: min(100%, 14rem);
  height: 0.1875rem;
  margin-top: 0.5rem;
  background: var(--color-accent);
  transform-origin: left;
  animation: ${fill} 1.1s ease-in-out infinite alternate;
`

const Spinner = ({ label = 'Cargando' }: { label?: string }) => (
  <Wrapper role="status">
    {label}
    <Line />
  </Wrapper>
)

export default Spinner
