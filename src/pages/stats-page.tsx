import EmptyState from '@/components/empty-state'
import FactItem from '@/components/fact-item'
import Notice from '@/components/notice'
import PageIntro from '@/components/page-intro'
import Spinner from '@/components/spinner'
import StatBar from '@/components/stat-bar'
import { PROCESS_LABELS, ROAST_LABELS } from '@/const/coffee'
import { useStats } from '@/hooks/use-coffees'
import type { CoffeeProcess, CoffeeRoast } from '@/types/coffee'

// Todo sale del $facet de la API, aqui solo se calcula el maximo de cada grafica
const StatsPage = () => {
  const { stats, isLoading, error } = useStats()

  if (isLoading) return <Spinner label="Calculando las estadísticas" />
  if (error) return <Notice>{error}</Notice>
  if (!stats?.summary) return <EmptyState title="Todavía no hay cafés">Las cifras aparecerán cuando la guía tenga fichas.</EmptyState>

  const { summary, byCountry, byProcess, byRoast } = stats
  const facts = [
    { label: 'cafés', value: summary.total },
    { label: 'puntuación media', value: summary.averageScore },
    { label: 'altitud media', value: `${summary.averageAltitude} m` },
    { label: 'altitud máxima', value: `${summary.highestAltitude} m` },
  ]
  const maxCountry = Math.max(...byCountry.map(({ total }) => total), 0)
  const maxProcess = Math.max(...byProcess.map(({ total }) => total), 0)
  const maxRoast = Math.max(...byRoast.map(({ total }) => total), 0)

  return (
    <>
      <PageIntro title="Orígenes">
        Qué hay en la guía ahora mismo. Las cifras salen de las fichas, así que cambian cada vez que se añade o se edita un café.
      </PageIntro>

      {facts.length > 0 && (
        <ul className="Facts">
          {facts.map(({ label, ...fact }) => (
            <FactItem key={label} label={label} {...fact} />
          ))}
        </ul>
      )}

      <div className="Stats">
        <section>
          <h2 className="Stats-title">Por país</h2>
          <p className="Stats-text">
            El café crece en el llamado cinturón del café, entre los trópicos. La misma variedad cambia mucho de un país a otro por el suelo, la altura y el clima.
          </p>
          <ul>
            {byCountry.map(({ label, ...group }) => (
              <li key={label}>
                <StatBar label={label} max={maxCountry} {...group} />
              </li>
            ))}
          </ul>
        </section>

        <div className="Stats-aside">
          <section>
            <h2 className="Stats-title">Por proceso</h2>
            <ul>
              {byProcess.map(({ label, ...group }) => (
                <li key={label}>
                  <StatBar label={PROCESS_LABELS[label as CoffeeProcess] ?? label} max={maxProcess} {...group} />
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="Stats-title">Por tueste</h2>
            <ul>
              {byRoast.map(({ label, ...group }) => (
                <li key={label}>
                  <StatBar label={ROAST_LABELS[label as CoffeeRoast] ?? label} max={maxRoast} {...group} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  )
}

export default StatsPage
