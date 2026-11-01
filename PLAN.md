# PLAN

Sistema de seguimiento portable para proyectos front end con agentes.

## Estados

- `por hacer`: tarea identificada, aun no iniciada.
- `en curso`: tarea activa.
- `completada`: tarea terminada y revisada.
- `bloqueada`: tarea detenida por falta de informacion, herramienta o decision.

## Curso del proyecto

| Estado | Agente | Cambio o tarea | Hora | Notas |
| --- | --- | --- | --- | --- |
| completada | Timmy | Maquetar Taza Limpia en React: layout, paginas, componentes y CSS | 2026-11-01 | Datos de muestra en `src/const/sample-coffees.ts` hasta conectar la API |
| completada | Agente JavaScript | Conectar API, sesion, favoritos y formularios | 2026-11-01 12:41 | Probado en navegador contra la API local |
| en curso | Agente Review | Revisar client y api contra `SKILLS`, rubrica /60 y PDF | 2026-11-01 12:47 | Primera auditoria hecha: requiere cambios. No se marca completada, quedan bloqueantes de entrega |

## Registro de cambios

| Fecha y hora | Agente | Cambio hecho | Estado |
| --- | --- | --- | --- |
| 2026-11-01 | Sistema | Inicializar proyecto desde plantilla | completada |
| 2026-11-01 | Timmy (IA) | index.html con metas, rutas con lazy y Suspense, 10 paginas, componentes styled, CSS en src/css con SUIT y tokens, guia en src/const/guide.ts. Revisado en 1280, 375 y 320 px sin scroll horizontal | completada |
| 2026-11-01 12:41 | Agente JavaScript (IA) | api-client, contextos de sesion y favoritos, hooks (use-fetch con cache, use-coffees, debounce, Escape), ruta protegida, filtros en la URL, formulario y borrado reales. sample-coffees.ts ya no se usa | completada |

| 2026-11-01 12:47 | Agente Review (IA) | Auditoria de codigo y pruebas. Estimacion estricta 47/60. Altas: JSON invalido no pasa por el middleware de errores, constantes fuera de `const`, stateless sin Styled (`catalog-filters`, `manage-item`), bloques repetidos sin componente. Medias: 500 con query repetida o sort=constructor, ids SVG duplicados, salto h1 a h3 en catalogo, "Mejor puntuado" solo mira destacados, comentarios en 61-65% de archivos, sin fotos, postinstall de mongodb-memory-server en Vercel. Lighthouse en dev: accesibilidad 100/98, SEO 91, buenas practicas 100; rendimiento no valido en dev. Sin scroll horizontal en 320, 375, 768 y 1440 | requiere cambios |
| 2026-11-01 12:55 | Timmy (IA) | Filtros, fila del panel, cifras e historial pasados a styled-components (`fact-item`, `activity-item`), h2 en resultados de catalogo y favoritos, ids de trama con useId, robots.txt, og-image.png, comentarios en los archivos que faltaban, README | completada |
| 2026-11-01 12:55 | Agente JavaScript (IA) | Constantes movidas a `src/const`, mejor puntuado con sort=score, contextos separados de sus providers, debounce con useDebouncedCallback, formulario inicializado sin efecto, contador oculto hasta tener datos, aviso de conexion en la ruta protegida. Sin probar con sesion iniciada: panel, formulario y aviso de conexion | requiere revision |

| 2026-11-01 13:00 | Claude (IA) | Correcciones de API tras la auditoria (errores en el router, query repetida, PUT vacio) y pasada de crear, editar y borrar en navegador con sesion iniciada | completada |

| 2026-11-01 14:10 | Claude (IA) | Segunda revision contra la rubrica del PDF: divs sin estilo, `app.tsx` en kebab-case, `vercel.json` con `framework: null`. Lighthouse en produccion local: rendimiento 85-88; accesibilidad, buenas practicas y SEO 100 | completada |

## Proximos pasos

- Definir tema, contenido, referencia visual y alcance.
- Confirmar URL online y memoria PDF si la practica lo exige.
- Implementar estructura HTML, CSS y JS.
- Revisar responsive, validaciones, accesibilidad y rendimiento.
