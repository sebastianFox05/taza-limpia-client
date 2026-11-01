import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'

import CatalogFilters from '@/components/catalog-filters'
import CoffeeCard from '@/components/coffee-card'
import EmptyState from '@/components/empty-state'
import { SelectField } from '@/components/field'
import Notice from '@/components/notice'
import PageIntro from '@/components/page-intro'
import Spinner from '@/components/spinner'
import { SORT_OPTIONS } from '@/const/coffee'
import { useCoffees } from '@/hooks/use-coffees'
import { useDebouncedCallback } from '@/hooks/use-debounced-callback'
import { useFavorites } from '@/hooks/use-favorites'

const readList = (value: string | null) => (value ? value.split(',') : [])

const CatalogPage = () => {
  // La URL manda: asi un filtro se puede compartir o recuperar con el boton de atras
  const [searchParams, setSearchParams] = useSearchParams()
  const urlSearch = searchParams.get('q') ?? ''
  const urlMinScore = searchParams.get('minScore') ?? ''

  const [typedFilters, setTypedFilters] = useState({ q: urlSearch, minScore: urlMinScore })
  const [syncedUrl, setSyncedUrl] = useState(`${urlSearch}|${urlMinScore}`)

  const { coffees, hasData, isLoading, error } = useCoffees(searchParams.toString())
  const { favoriteIds, toggleFavorite } = useFavorites()

  // Solo escribo en la URL cuando termina de escribir, no con cada letra
  const { schedule: scheduleUrlUpdate, cancel: cancelUrlUpdate } = useDebouncedCallback((filters: typeof typedFilters) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        Object.entries(filters).forEach(([name, value]) => {
          if (value) next.set(name, value)
          else next.delete(name)
        })
        return next
      },
      { replace: true },
    )
  })

  // Si la URL cambia desde fuera (el enlace del menu, atras) los campos la siguen
  const currentUrl = `${urlSearch}|${urlMinScore}`
  if (currentUrl !== syncedUrl) {
    setSyncedUrl(currentUrl)
    setTypedFilters({ q: urlSearch, minScore: urlMinScore })
  }

  const fieldChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = target

    if (type !== 'checkbox') {
      setTypedFilters((prev) => ({ ...prev, [name]: value }))
      scheduleUrlUpdate({ ...typedFilters, [name]: value })
      return
    }

    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      const current = readList(prev.get(name))
      const updated = checked ? [...current, value] : current.filter((item) => item !== value)

      if (updated.length > 0) next.set(name, updated.join(','))
      else next.delete(name)

      return next
    })
  }

  const sortChangeHandler = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('sort', target.value)
      return next
    })
  }

  const filtersSubmitHandler = (event: FormEvent<HTMLFormElement>) => event.preventDefault()

  const filtersResetHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    cancelUrlUpdate()
    setTypedFilters({ q: '', minScore: '' })
    setSearchParams({})
  }

  const hasNoResults = hasData && !error && coffees.length === 0

  return (
    <>
      <PageIntro title="Catálogo">
        Cada café con su ficha. Filtra por lo que ya sabes que te gusta, o por lo que todavía no has probado.
      </PageIntro>

      <div className="Catalog">
        <CatalogFilters
          q={typedFilters.q}
          minScore={typedFilters.minScore}
          processes={readList(searchParams.get('process'))}
          roasts={readList(searchParams.get('roast'))}
          onFieldChange={fieldChangeHandler}
          onSubmit={filtersSubmitHandler}
          onReset={filtersResetHandler}
        />

        <section aria-label="Resultados" aria-busy={isLoading}>
          <div className="Catalog-toolbar">
            <h2 className="Catalog-count" aria-live="polite">
              {hasData ? `${coffees.length} ${coffees.length === 1 ? 'café' : 'cafés'}` : 'Resultados'}
            </h2>
            <div className="Catalog-sort">
              <SelectField label="Ordenar por" id="catalogo-orden" name="sort" value={searchParams.get('sort') ?? 'score'} onChange={sortChangeHandler}>
                {SORT_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </SelectField>
            </div>
          </div>

          {isLoading && !hasData && <Spinner label="Buscando cafés" />}
          {error && <Notice>{error}</Notice>}
          {hasNoResults && (
            <EmptyState title="Ningún café coincide">Prueba a quitar algún filtro o a bajar la puntuación mínima.</EmptyState>
          )}

          <ul className="CoffeeGrid">
            {coffees.map(({ _id, ...coffee }) => (
              <li key={_id}>
                <CoffeeCard id={_id} isFavorite={favoriteIds.includes(_id)} onFavoriteToggle={toggleFavorite} {...coffee} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}

export default CatalogPage
