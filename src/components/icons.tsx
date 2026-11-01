// Iconos en SVG dentro del codigo, asi heredan el color del texto
import type { SVGProps } from 'react'

import styled from 'styled-components'

const IconBase = styled.svg`
  width: 1.125rem;
  height: 1.125rem;
  flex: none;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
`

type IconProps = SVGProps<SVGSVGElement>

export const IconMenu = (props: IconProps) => (
  <IconBase viewBox="0 0 24 24" aria-hidden {...props}>
    <path d="M3 7h18M3 12h18M3 17h18" />
  </IconBase>
)

export const IconClose = (props: IconProps) => (
  <IconBase viewBox="0 0 24 24" aria-hidden {...props}>
    <path d="M5 5l14 14M19 5L5 19" />
  </IconBase>
)

export const IconBookmark = ({ fill = 'none', ...props }: IconProps) => (
  <IconBase viewBox="0 0 24 24" aria-hidden style={{ fill }} {...props}>
    <path d="M6 3h12v18l-6-4.5L6 21z" />
  </IconBase>
)
