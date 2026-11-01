import { useId } from 'react'
import styled from 'styled-components'

import { LABEL_BEANS, PROCESS_LABELS, ROAST_LABELS, ROAST_LEVELS } from '@/const/coffee'
import type { CoffeeProcess, CoffeeRoast } from '@/types/coffee'

interface CoffeeLabelProps {
  name: string
  country: string
  process: CoffeeProcess
  roast: CoffeeRoast
  imageUrl?: string
}

const Figure = styled.div`
  aspect-ratio: 3 / 4;
  width: 100%;
  overflow: hidden;
`

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Title = styled.text`
  fill: var(--color-ink);
  font-family: var(--font-display);
  font-size: 15px;
`

const Caption = styled.text`
  fill: var(--color-ink);
  font-family: var(--font-data);
  font-size: 7.5px;
`

// Cada proceso tiene su trama, asi las bolsas se distinguen sin leer el texto
const ProcessPattern = ({ id, process }: Pick<CoffeeLabelProps, 'process'> & { id: string }) => {
  const patterns: Record<CoffeeProcess, React.JSX.Element> = {
    lavado: <path d="M0 5q5-5 10 0t10 0M0 15q5-5 10 0t10 0" fill="none" stroke="var(--color-ink)" />,
    natural: (
      <>
        <circle cx="5" cy="5" r="2.2" fill="var(--color-ink)" />
        <circle cx="15" cy="15" r="2.2" fill="var(--color-ink)" />
      </>
    ),
    honey: <path d="M5 0l5 3v6l-5 3-5-3V3zM15 10l5 3v6l-5 3-5-3v-6z" fill="none" stroke="var(--color-ink)" />,
    anaerobico: (
      <>
        <circle cx="10" cy="10" r="8" fill="none" stroke="var(--color-ink)" />
        <circle cx="10" cy="10" r="3.500" fill="none" stroke="var(--color-ink)" />
      </>
    ),
    'descascarado-humedo': <path d="M0 20L20 0M-5 5L5-5M15 25l10-10" stroke="var(--color-ink)" />,
  }

  return (
    <pattern id={id} width="20" height="20" patternUnits="userSpaceOnUse">
      {patterns[process]}
    </pattern>
  )
}

const CoffeeLabel = ({ name, country, process, roast, imageUrl }: CoffeeLabelProps) => {
  // Hay varias etiquetas en la misma pagina y cada trama necesita su propio id
  const patternId = `trama${useId()}`

  if (imageUrl) {
    return (
      <Figure>
        <Photo src={imageUrl} alt={`Café ${name}, de ${country}`} loading="lazy" />
      </Figure>
    )
  }

  return (
    <Figure>
      <svg
        viewBox="0 0 150 200"
        role="img"
        aria-label={`Bolsa de ${name}, de ${country}, proceso ${PROCESS_LABELS[process].toLowerCase()} y tueste ${ROAST_LABELS[roast].toLowerCase()}`}
      >
        <defs>
          <ProcessPattern id={patternId} process={process} />
        </defs>
        <rect x="10" y="4" width="130" height="192" fill={`var(--color-bag-${roast})`} />
        <rect x="10" y="4" width="130" height="16" fill="var(--color-ink)" opacity="0.25" />
        <rect x="24" y="44" width="102" height="130" fill="var(--color-paper-light)" stroke="var(--color-ink)" />
        <rect x="25" y="45" width="100" height="56" fill={`url(#${patternId})`} opacity="0.55" />
        <line x1="24" y1="101" x2="126" y2="101" stroke="var(--color-ink)" />
        <Title x="75" y="124" textAnchor="middle" textLength={country.length > 9 ? 92 : undefined} lengthAdjust="spacingAndGlyphs">
          {country}
        </Title>
        <Caption x="75" y="140" textAnchor="middle">
          {PROCESS_LABELS[process].toUpperCase().slice(0, 19)}
        </Caption>
        {LABEL_BEANS.map((bean) => (
          <ellipse
            key={bean}
            cx={55 + bean * 10}
            cy="156"
            rx="3.5"
            ry="5"
            fill={bean <= ROAST_LEVELS[roast] ? 'var(--color-accent)' : 'none'}
            stroke="var(--color-accent)"
          />
        ))}
      </svg>
    </Figure>
  )
}

export default CoffeeLabel
