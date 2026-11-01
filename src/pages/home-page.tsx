// Portada: que es la guia y por donde empezar
import { Link } from 'react-router-dom'

import Badge from '@/components/badge'
import CoffeeCard from '@/components/coffee-card'
import CoffeeLabel from '@/components/coffee-label'
import FactItem from '@/components/fact-item'
import Notice from '@/components/notice'
import Spinner from '@/components/spinner'
import { PROCESS_LABELS } from '@/const/coffee'
import { READING_POINTS } from '@/const/content'
import { buildCoffeePath, ROUTES } from '@/const/routes'
import { useCoffees, useStats } from '@/hooks/use-coffees'
import { useFavorites } from '@/hooks/use-favorites'

const HomePage = () => {
  const { coffees: featured, isLoading, error } = useCoffees('isFeatured=true')
  // El de la portada tiene que ser el mejor de toda la guia, no solo de los destacados
  const { coffees: ranking } = useCoffees('sort=score')
  const { stats } = useStats()
  const { favoriteIds, toggleFavorite } = useFavorites()
  const [highlight] = ranking
  const summary = stats?.summary
  const facts = summary
    ? [
        { label: 'cafés con ficha', value: summary.total },
        { label: 'países de origen', value: stats.byCountry.length },
        { label: 'puntuación media', value: summary.averageScore },
        { label: 'el cultivo más alto', value: `${summary.highestAltitude} m` },
      ]
    : []

  return (
    <>
      <section className="Hero">
        <div className="Hero-copy">
          <h1 className="Hero-title">Lo que hay dentro de la taza, <em>apuntado.</em></h1>
          <p className="Hero-lead">
            Taza Limpia es una guía de cafés de especialidad para quien empieza a comprar grano y quiere saber qué está pagando: de dónde viene, cómo se procesó y a qué sabe.
          </p>
          <div className="Hero-actions">
            <Link className="Button Button--primary" to={ROUTES.CATALOG} title="Ver todos los cafés">Ver el catálogo</Link>
            <Link className="Button" to={ROUTES.GUIDE} title="Aprender a leer una ficha">Aprender a leer una ficha</Link>
          </div>
        </div>

        {highlight && (
          <article className="Hero-sheet">
            <p className="Hero-sheetHead">
              <span>Mejor puntuado</span>
              <span>{highlight.score} pts</span>
            </p>
            <div className="Hero-sheetLabel">
              <CoffeeLabel name={highlight.name} country={highlight.country} process={highlight.process} roast={highlight.roast} imageUrl={highlight.imageUrl} />
            </div>
            <h2 className="Hero-sheetName">
              <Link to={buildCoffeePath(highlight._id)} title={`Ver la ficha de ${highlight.name}`}>{highlight.name}</Link>
            </h2>
            <p>
              <Badge>{PROCESS_LABELS[highlight.process]}</Badge> <Badge>{highlight.altitude} m</Badge>
            </p>
          </article>
        )}
      </section>

      {facts.length > 0 && (
        <ul className="Facts">
          {facts.map(({ label, ...fact }) => (
            <FactItem key={label} label={label} {...fact} />
          ))}
        </ul>
      )}

      <section className="Section Reading">
        <h2>Cómo leer una ficha</h2>
        <ol className="Reading-list">
          {READING_POINTS.map(({ title, text }) => (
            <li key={title} className="Reading-item">
              <div className="Reading-body">
                <h3>{title}</h3>
                <p className="Reading-text">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="Section">
        <div className="Section-head">
          <h2>Para empezar</h2>
          <Link className="Section-link" to={ROUTES.CATALOG} title="Ver todos los cafés">Ver todos los cafés</Link>
        </div>
        {isLoading && <Spinner label="Cargando los cafés" />}
        {error && <Notice>{error}</Notice>}
        <ul className="CoffeeGrid">
          {featured.map(({ _id, ...coffee }) => (
            <li key={_id}>
              <CoffeeCard id={_id} isFavorite={favoriteIds.includes(_id)} onFavoriteToggle={toggleFavorite} {...coffee} />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default HomePage
