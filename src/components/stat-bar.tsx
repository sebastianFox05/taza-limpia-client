// Barra de la pagina de origenes, el ancho sale de total / max
import styled from 'styled-components'

interface StatBarProps {
  label: string
  total: number
  averageScore: number
  max: number
}

const Row = styled.div`
  padding-block: 0.625rem;
  border-bottom: var(--rule-thin);
`

const Top = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0 1rem;
`

const Detail = styled.span`
  font-family: var(--font-data);
  font-size: var(--text-small);
`

const Track = styled.div`
  height: 0.5rem;
  margin-top: 0.375rem;
  background: var(--color-paper-deep);
`

const Fill = styled.div`
  height: 100%;
  background: var(--color-ink);
`

const StatBar = ({ label, total, averageScore, max }: StatBarProps) => (
  <Row>
    <Top>
      <span>{label}</span>
      <Detail>
        {total} {total === 1 ? 'café' : 'cafés'} · media {averageScore}
      </Detail>
    </Top>
    <Track>
      <Fill style={{ width: `${max ? (total / max) * 100 : 0}%` }} />
    </Track>
  </Row>
)

export default StatBar
