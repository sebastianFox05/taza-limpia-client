import { ENDPOINTS } from '@/const/api'
import { useFetch } from '@/hooks/use-fetch'
import type { ActivityEntry, Coffee, CoffeeStats } from '@/types/coffee'

interface CoffeeListResponse {
  total: number
  coffees: Coffee[]
}

interface CoffeeResponse {
  coffee: Coffee
}

interface ActivityResponse {
  activity: ActivityEntry[]
}

export const useCoffees = (query = '') => {
  const { data, ...rest } = useFetch<CoffeeListResponse>(`${ENDPOINTS.COFFEES}${query ? `?${query}` : ''}`)
  return { coffees: data?.coffees ?? [], hasData: Boolean(data), ...rest }
}

// Al editar paso isCached en false: quiero lo ultimo que hay en la base, no una copia
export const useCoffee = (id: string | undefined, isCached = true) => {
  const { data, ...rest } = useFetch<CoffeeResponse>(id ? `${ENDPOINTS.COFFEES}/${id}` : null, isCached)
  return { coffee: data?.coffee ?? null, ...rest }
}

export const useStats = () => {
  const { data, ...rest } = useFetch<CoffeeStats>(ENDPOINTS.STATS)
  return { stats: data, ...rest }
}

export const useActivity = () => {
  const { data, ...rest } = useFetch<ActivityResponse>(ENDPOINTS.ACTIVITY, false)
  return { activity: data?.activity ?? [], ...rest }
}
