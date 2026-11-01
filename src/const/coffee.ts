// Textos de los procesos y tuestes, y los valores iniciales del formulario
import type { CoffeeDraft, CoffeeProcess, CoffeeRoast } from '@/types/coffee'

export const PROCESS_LABELS: Record<CoffeeProcess, string> = {
  lavado: 'Lavado',
  natural: 'Natural',
  honey: 'Honey',
  anaerobico: 'Anaeróbico',
  'descascarado-humedo': 'Descascarado húmedo',
}

export const ROAST_LABELS: Record<CoffeeRoast, string> = {
  claro: 'Claro',
  medio: 'Medio',
  oscuro: 'Oscuro',
}

export const PROCESS_OPTIONS = Object.entries(PROCESS_LABELS)
export const ROAST_OPTIONS = Object.entries(ROAST_LABELS)

// Los granos que se pintan en la etiqueta: cuantos mas rellenos, mas tostado
export const ROAST_LEVELS: Record<CoffeeRoast, number> = { claro: 1, medio: 2, oscuro: 3 }
export const LABEL_BEANS = [1, 2, 3]

export const SORT_OPTIONS = [
  { value: 'score', label: 'Mejor puntuados' },
  { value: 'altitude', label: 'Más altura' },
  { value: 'name', label: 'Nombre' },
  { value: 'recent', label: 'Recién añadidos' },
] as const

export const EMPTY_COFFEE: CoffeeDraft = {
  name: '',
  country: '',
  region: '',
  variety: '',
  process: 'lavado',
  roast: 'claro',
  altitude: 1500,
  score: 85,
  notes: [],
  description: '',
  brewMethod: '',
  imageUrl: '',
  isFeatured: false,
  isDecaf: false,
}
