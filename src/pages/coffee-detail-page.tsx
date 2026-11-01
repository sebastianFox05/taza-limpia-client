// Ficha completa de un cafe, es publica
import { Link, useParams } from 'react-router-dom'

import Badge from '@/components/badge'
import CoffeeLabel from '@/components/coffee-label'
import EmptyState from '@/components/empty-state'
import FavoriteButton from '@/components/favorite-button'
import SpecSheet from '@/components/spec-sheet'
import Spinner from '@/components/spinner'
import { PROCESS_LABELS, ROAST_LABELS } from '@/const/coffee'
import { ROUTES } from '@/const/routes'
import { useCoffee } from '@/hooks/use-coffees'
import { useFavorites } from '@/hooks/use-favorites'

const CoffeeDetailPage = () => {
  const { id } = useParams()
  const { coffee, isLoading, error } = useCoffee(id)
  const { favoriteIds, toggleFavorite } = useFavorites()

  if (isLoading) return <Spinner label="Cargando la ficha" />

  if (!coffee) {
    return (
      <EmptyState title={error || 'No encontramos ese café'}>
        <Link to={ROUTES.CATALOG} title="Volver al catálogo">Volver al catálogo</Link>
      </EmptyState>
    )
  }

  const { _id, name, country, region, variety, process, roast, altitude, score, notes, description, brewMethod, imageUrl, isDecaf } = coffee

  const specs = [
    { term: 'Puntuación', value: `${score} sobre 100` },
    { term: 'Variedad', value: variety },
    { term: 'Proceso', value: PROCESS_LABELS[process] },
    { term: 'Tueste', value: ROAST_LABELS[roast] },
    { term: 'Altitud', value: `${altitude} m` },
    { term: 'Preparación', value: brewMethod || 'Sin recomendación' },
    { term: 'Cafeína', value: isDecaf ? 'Descafeinado' : 'Con cafeína' },
  ]

  return (
    <>
      <Link className="Detail-back" to={ROUTES.CATALOG} title="Volver al catálogo">Volver al catálogo</Link>
      <article className="Detail">
        <div className="Detail-media">
          <CoffeeLabel name={name} country={country} process={process} roast={roast} imageUrl={imageUrl} />
        </div>
        <div className="Detail-info">
          <h1 className="Detail-title">{name}</h1>
          <p className="Detail-origin">{region}, {country}</p>
          <p className="Detail-description">{description}</p>
          <SpecSheet items={specs} />

          <h2 className="Detail-subtitle">Notas de cata</h2>
          <ul className="Detail-notes">
            {notes.map((note) => (
              <li key={note}>
                <Badge>{note}</Badge>
              </li>
            ))}
          </ul>

          <div className="Detail-actions">
            <FavoriteButton name={name} isFavorite={favoriteIds.includes(_id)} onToggle={() => toggleFavorite(_id)} />
            <Link className="Button" to={`${ROUTES.GUIDE}#procesos`} title="Leer qué significa este proceso">Qué significa este proceso</Link>
          </div>
        </div>
      </article>
    </>
  )
}

export default CoffeeDetailPage
