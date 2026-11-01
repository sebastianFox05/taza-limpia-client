// Mismos campos que los modelos de la API
export type CoffeeProcess = 'lavado' | 'natural' | 'honey' | 'anaerobico' | 'descascarado-humedo'
export type CoffeeRoast = 'claro' | 'medio' | 'oscuro'

export interface Coffee {
  _id: string
  name: string
  country: string
  region: string
  variety: string
  process: CoffeeProcess
  roast: CoffeeRoast
  altitude: number
  score: number
  notes: string[]
  description: string
  brewMethod: string
  imageUrl: string
  isFeatured: boolean
  isDecaf: boolean
}

export type CoffeeDraft = Omit<Coffee, '_id'>

export interface StatGroup {
  label: string
  total: number
  averageScore: number
}

export interface CoffeeStats {
  summary: {
    total: number
    averageScore: number
    averageAltitude: number
    highestAltitude: number
  } | null
  byCountry: StatGroup[]
  byProcess: StatGroup[]
  byRoast: StatGroup[]
}

export interface ActivityEntry {
  _id: string
  action: 'creado' | 'editado' | 'eliminado'
  coffeeName: string
  userName: string
  createdAt: string
}

export interface User {
  id: string
  name: string
  email: string
}
