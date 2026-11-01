import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import PageIntro from '@/components/page-intro'
import SpecSheet from '@/components/spec-sheet'
import { CUPPING_STEPS, GUIDE_SECTIONS, PROCESS_GUIDE, RECIPES, ROAST_GUIDE, SCORE_RANGES } from '@/const/guide'

const GuidePage = () => {
  const { hash } = useLocation()

  // Llegando desde una ficha con #procesos la pagina aun no existia cuando el navegador busco el ancla
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
  }, [hash])

  return (
  <>
    <PageIntro title="Guía de cata">
      Lo justo para entender una ficha y sacarle partido a una bolsa de café en casa.
    </PageIntro>

    <div className="Guide">
      <nav className="Guide-index" aria-label="Secciones de la guía">
        {GUIDE_SECTIONS.map(({ id, label }) => (
          <a key={id} className="Guide-indexLink" href={`#${id}`} title={`Ir a ${label}`}>{label}</a>
        ))}
      </nav>

      <div className="Guide-content">
        <section id="puntuacion" className="Guide-section">
          <h2>Qué significa la puntuación</h2>
          <p className="Guide-intro">
            La Specialty Coffee Association usa una escala de 100 puntos en la que catadores valoran acidez, dulzor, cuerpo, balance y otros atributos. A partir de 80 un café se considera de especialidad.
          </p>
          <p className="Guide-intro">Las puntuaciones de esta guía son orientativas: sirven para comparar, no son un certificado.</p>
          <SpecSheet items={SCORE_RANGES} />
        </section>

        <section id="procesos" className="Guide-section">
          <h2>Procesos</h2>
          <p className="Guide-intro">El café es la semilla de una fruta. El proceso es cómo se separa una de la otra y se seca.</p>
          <ul>
            {PROCESS_GUIDE.map(({ name, text, taste }) => (
              <li key={name} className="Entry">
                <h3>{name}</h3>
                <div className="Entry-text">
                  <p>{text}</p>
                  <p className="Entry-taste">{taste}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="tuestes" className="Guide-section">
          <h2>Tuestes</h2>
          <p className="Guide-intro">Un tueste más oscuro no significa más cafeína: la diferencia es muy pequeña. Lo que cambia es el sabor.</p>
          <ul>
            {ROAST_GUIDE.map(({ name, text, taste }) => (
              <li key={name} className="Entry">
                <h3>{name}</h3>
                <div className="Entry-text">
                  <p>{text}</p>
                  <p className="Entry-taste">{taste}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="cata" className="Guide-section">
          <h2>Cómo catar en casa</h2>
          <p className="Guide-intro">Basta con dos tazas, una cuchara y una báscula. Probar dos cafés a la vez ayuda más que probar uno solo.</p>
          <ol className="Steps">
            {CUPPING_STEPS.map((step) => (
              <li key={step} className="Steps-item">{step}</li>
            ))}
          </ol>
        </section>

        <section id="recetas" className="Guide-section">
          <h2>Recetas base</h2>
          <p className="Guide-intro">Son un punto de partida. Cambia una sola cosa cada vez y anota qué pasa.</p>
          <div className="Recipes">
            {RECIPES.map(({ name, meta, steps }) => (
              <article key={name}>
                <h3>{name}</h3>
                <p className="Recipes-meta">{meta}</p>
                <ol className="Steps">
                  {steps.map((step) => (
                    <li key={step} className="Steps-item">{step}</li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  </>
  )
}

export default GuidePage
