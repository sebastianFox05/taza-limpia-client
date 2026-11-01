// Todas las rutas en un sitio, para no repetir cadenas en los enlaces
export const ROUTES = {
  HOME: '/',
  CATALOG: '/catalogo',
  COFFEE_DETAIL: '/catalogo/:id',
  STATS: '/origenes',
  GUIDE: '/guia',
  FAVORITES: '/favoritos',
  LOGIN: '/entrar',
  PANEL: '/panel',
  PANEL_NEW: '/panel/nuevo',
  PANEL_EDIT: '/panel/editar/:id',
} as const

export const NAV_ITEMS = [
  { to: ROUTES.CATALOG, label: 'Catálogo', title: 'Ver todos los cafés' },
  { to: ROUTES.STATS, label: 'Orígenes', title: 'Ver las estadísticas por origen' },
  { to: ROUTES.GUIDE, label: 'Guía', title: 'Aprender a leer una ficha' },
  { to: ROUTES.FAVORITES, label: 'Favoritos', title: 'Ver los cafés guardados' },
]

export const buildCoffeePath = (id: string) => `${ROUTES.CATALOG}/${id}`
export const buildEditPath = (id: string) => `/panel/editar/${id}`
