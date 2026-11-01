// Textos de la guia. Estan aqui para que la pagina solo se ocupe de pintarlos.
export const GUIDE_SECTIONS = [
  { id: 'puntuacion', label: 'Puntuación' },
  { id: 'procesos', label: 'Procesos' },
  { id: 'tuestes', label: 'Tuestes' },
  { id: 'cata', label: 'Cómo catar' },
  { id: 'recetas', label: 'Recetas base' },
]

export const SCORE_RANGES = [
  { term: '80 a 84', value: 'Muy bueno. Ya es café de especialidad: sin defectos y con carácter.' },
  { term: '85 a 89', value: 'Excelente. Perfil claro de su origen, dulzor y acidez bien definidos.' },
  { term: '90 o más', value: 'Excepcional. Pocos lotes llegan aquí y suelen venderse en cantidades pequeñas.' },
]

export const PROCESS_GUIDE = [
  {
    name: 'Lavado',
    text: 'Se quita la pulpa, se fermenta el grano en agua para soltar el mucílago, se enjuaga y se seca. Es el proceso que menos se interpone entre el origen y la taza.',
    taste: 'Taza limpia, acidez marcada, cuerpo ligero',
  },
  {
    name: 'Natural',
    text: 'La cereza se seca entera al sol, durante varias semanas, y el grano se saca al final. Necesita mucho cuidado para que la fruta no se pase.',
    taste: 'Fruta madura, dulzor alto, más cuerpo',
  },
  {
    name: 'Honey',
    text: 'Se quita la piel pero se deja parte del mucílago pegado durante el secado. Cuanto más mucílago y sombra, más oscuro el nombre: amarillo, rojo o negro.',
    taste: 'Dulce, redondo, acidez intermedia',
  },
  {
    name: 'Anaeróbico',
    text: 'El café fermenta en tanques sellados, sin oxígeno, con un control muy fino del tiempo y la temperatura. Es relativamente reciente y da perfiles que dividen opiniones.',
    taste: 'Intenso, licoroso, a veces especiado',
  },
  {
    name: 'Descascarado húmedo',
    text: 'Se conoce como giling basah y es típico de Indonesia. El pergamino se retira cuando el grano aún tiene mucha humedad, algo que el clima de la zona hace casi obligatorio.',
    taste: 'Terroso, cuerpo pesado, acidez baja',
  },
]

export const ROAST_GUIDE = [
  {
    name: 'Claro',
    text: 'Se detiene poco después del primer crack. Conserva la acidez y los aromas del origen, por eso es el más habitual en filtro.',
    taste: 'Floral, cítrico, frutal',
  },
  {
    name: 'Medio',
    text: 'Equilibra lo que viene del grano y lo que aporta el tostado. Es el más fácil de preparar bien, tanto en filtro como en espresso.',
    taste: 'Caramelo, chocolate, fruta madura',
  },
  {
    name: 'Oscuro',
    text: 'Llega al segundo crack o cerca, y el grano puede soltar aceite. Manda el sabor del tueste y se pierde parte del carácter del origen.',
    taste: 'Cacao amargo, madera, poca acidez',
  },
]

export const CUPPING_STEPS = [
  'Pesa 8,25 g de café por cada 150 ml de agua y muélelo un poco más grueso que para filtro.',
  'Huele el café seco recién molido. Eso es la fragancia.',
  'Vierte el agua a unos 93 °C y deja reposar 4 minutos sin tocar.',
  'Rompe la costra con una cuchara, acerca la nariz y anota el aroma.',
  'Retira la espuma y espera a que baje a unos 70 °C. Sorbe fuerte con la cuchara para que el café cubra toda la boca.',
  'Vuelve a probar mientras se enfría. Es cuando mejor se nota el dulzor y cuando aparecen los defectos.',
]

export const RECIPES = [
  {
    name: 'V60',
    meta: '15 g de café · 250 g de agua · 94 °C · molienda media-fina · 3 min',
    steps: [
      'Enjuaga el filtro con agua caliente y tira esa agua.',
      'Vierte 45 g de agua y deja que el café suelte gas durante 40 segundos.',
      'Añade el resto en círculos, despacio, hasta llegar a 250 g.',
      'Si tarda mucho más de 3 minutos, muele más grueso. Si tarda menos, más fino.',
    ],
  },
  {
    name: 'Prensa francesa',
    meta: '30 g de café · 500 g de agua · 94 °C · molienda gruesa · 8 min',
    steps: [
      'Vierte toda el agua de una vez sobre el café y deja reposar 4 minutos.',
      'Rompe la costra, retira la espuma con dos cucharas.',
      'Espera otros 4 minutos para que los finos se asienten.',
      'Baja el émbolo solo hasta la superficie y sirve todo, sin dejar café dentro.',
    ],
  },
]
