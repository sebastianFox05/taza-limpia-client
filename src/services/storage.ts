// localStorage puede fallar en modo privado o sin espacio, y eso no debe tirar la app
export const readStorage = <T>(key: string): T | null => {
  try {
    const value = localStorage.getItem(key)
    return value ? (JSON.parse(value) as T) : null
  } catch {
    return null
  }
}

export const writeStorage = (key: string, value: unknown): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Sin almacenamiento la app sigue funcionando, solo que sin recordar nada
  }
}

export const removeStorage = (key: string): void => {
  try {
    localStorage.removeItem(key)
  } catch {
    // Nada que limpiar
  }
}

export const removeStorageByPrefix = (prefix: string): void => {
  try {
    Object.keys(localStorage)
      .filter((key) => key.startsWith(prefix))
      .forEach((key) => localStorage.removeItem(key))
  } catch {
    // Nada que limpiar
  }
}
