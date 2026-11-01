// Titulo y entradilla de las paginas interiores
import type { ReactNode } from 'react'

import styled from 'styled-components'

interface PageIntroProps {
  title: string
  children?: ReactNode
}

const Wrapper = styled.header`
  max-width: 50rem;
`

const Title = styled.h1`
  font-size: var(--text-display);
  line-height: 1;
`

const Lead = styled.p`
  margin-top: 1rem;
  font-size: var(--text-large);
  line-height: 1.4;
`

const PageIntro = ({ title, children }: PageIntroProps) => (
  <Wrapper>
    <Title>{title}</Title>
    {children && <Lead>{children}</Lead>}
  </Wrapper>
)

export default PageIntro
