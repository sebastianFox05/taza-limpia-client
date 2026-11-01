# Taza Limpia (cliente)

Guía de cafés de especialidad hecha con React, TypeScript y Vite. El catálogo, las estadísticas por origen y la guía de cata son públicos. Crear, editar y eliminar fichas requiere iniciar sesión en el panel.

Necesita la API del repositorio `taza-limpia-api`.

## Instalación

```bash
npm install
cp .env.example .env
npm run dev
```

La aplicación queda en `http://localhost:5173`.

## Variables de entorno

| Variable | Descripción |
| --- | --- |
| `VITE_API_URL` | URL de la API, sin barra final |

## Scripts

| Script | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Comprueba los tipos y genera `dist` |
| `npm run preview` | Sirve `dist` en local |
| `npm run lint` | Pasa oxlint |

## Estructura

- `src/pages`: una vista por ruta, cargada con `lazy` y `Suspense`.
- `src/components`: componentes; los que no tienen estado usan styled-components.
- `src/context`: sesión y favoritos.
- `src/hooks`: hooks propios, como `useFetch`.
- `src/const`: rutas, endpoints y textos fijos.
- `src/css`: variables y estilos propios con SUIT CSS.
- `src/services`: cliente de la API y acceso a `localStorage`.

## Despliegue en Vercel

1. Importa este repositorio en Vercel. Detecta Vite y usa `npm run build`.
2. Añade `VITE_API_URL` con la URL pública de la API.
3. Despliega. `vercel.json` manda todas las rutas a `index.html` para que funcione recargar cualquier página.
4. Añade la URL resultante a `CLIENT_URLS` en la API para que CORS la acepte.
5. Cambia `/og-image.png` por la URL completa en las metaetiquetas de `index.html`.
