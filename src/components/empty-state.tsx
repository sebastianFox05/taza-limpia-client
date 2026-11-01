// Lo que se ve cuando una lista no tiene nada que ensenar
import type { ReactNode } from 'react'

import styled from 'styled-components'

interface EmptyStateProps {
  title: string
  children?: ReactNode
}

const Box = styled.div`
  padding: 2.5rem 0;
  border-bottom: var(--rule-thin);
`

const Text = styled.div`
  max-width: 34rem;
  margin-top: 0.5rem;
  color: var(--color-ink-soft);
`

const EmptyState = ({ title, children }: EmptyStateProps) => (
  <Box>
    <h2>{title}</h2>
    {children && <Text>{children}</Text>}
  </Box>
)

export default EmptyState
