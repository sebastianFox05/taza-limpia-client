// Filtra el catalogo con los ids que hay en localStorage
import { Link } from 'react-router-dom'

import CoffeeCard from '@/components/coffee-card'
import EmptyState from '@/components/empty-state'
import Notice from '@/components/notice'
import PageIntro from '@/components/page-intro'
import Spinner from '@/components/spinner'
import { ROUTES } from '@/const/routes'
import { useCoffees } from '@/hooks/use-coffees'
import { useFavorites } from '@/hooks/use-favorites'

const FavoritesPage = () => {
  const { coffees, isLoading, error } = useCoffees()
  const { favoriteIds, toggleFavorite } = useFavorites()
  const favorites = coffees.filter(({ _id }) => favoriteIds.includes(_id))

  return (
    <>
      <PageIntro title="Favoritos">
        Los cafés que quieres probar o volver a comprar. Se guardan en este navegador, sin necesidad de cuenta.
      </PageIntro>

      <section className="Section">
        <h2 className="Catalog-count">Cafés guardados</h2>
        {isLoading && <Spinner label="Cargando tus favoritos" />}
        {error && <Notice>{error}</Notice>}
        {!isLoading && !error && favorites.length === 0 && (
          <EmptyState title="Todavía no has guardado ninguno">
            Pulsa el marcador de cualquier ficha del <Link to={ROUTES.CATALOG} title="Ir al catálogo">catálogo</Link> y aparecerá aquí.
          </EmptyState>
        )}
        <ul className="CoffeeGrid">
          {favorites.map(({ _id, ...coffee }) => (
            <li key={_id}>
              <CoffeeCard id={_id} isFavorite onFavoriteToggle={toggleFavorite} {...coffee} />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default FavoritesPage
