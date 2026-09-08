// Single-line sentence captions for AMB26-02 (Exact Word-Aligned Timestamps & Pedagogical Corrections)
export interface SentenceCaption {
  text: string;
  formattedText: string;
  startFrame: number;
  endFrame: number;
}

export const CAPTIONS: SentenceCaption[] = [
  // Intro (F256 - F498) -> Elevated during F250-F460 to clear lower-third presentation plate
  {
    text: "¡Chaque el agua! ¿Qué hacemos si Corrientes se inunda?",
    formattedText: "¡Chaque el agua! ¿Qué hacemos si Corrientes se\u00A0inunda?",
    startFrame: 256,
    endFrame: 359,
  },
  {
    text: "Antes que nada, estar bien informados,",
    formattedText: "Antes que nada, estar bien\u00A0informados,",
    startFrame: 364,
    endFrame: 424,
  },
  {
    text: "y para eso vamos a derribar algunos mitos.",
    formattedText: "y para eso vamos a derribar algunos\u00A0mitos.",
    startFrame: 425,
    endFrame: 498,
  },

  // Mito 1 (F503 - F1395)
  {
    text: "Mito 1: «Nos inundamos porque está lloviendo mucho».",
    formattedText: "Mito 1: «Nos inundamos porque está lloviendo\u00A0mucho».",
    startFrame: 503,
    endFrame: 601,
  },
  {
    text: "¡Falso! Las lluvias locales intensas no son el único detonante.",
    formattedText: "¡Falso! Las lluvias locales intensas no son el único\u00A0detonante.",
    startFrame: 602,
    endFrame: 720,
  },
  {
    text: "Muchas veces sufrimos la crecida de los ríos",
    formattedText: "Muchas veces sufrimos la crecida de los\u00A0ríos",
    startFrame: 721,
    endFrame: 815,
  },
  {
    text: "por tormentas que ocurren a cientos de kilómetros.",
    formattedText: "por tormentas que ocurren a cientos de\u00A0kilómetros.",
    startFrame: 816,
    endFrame: 933,
  },
  {
    text: "Por otro lado, cuando la lluvia cae directamente sobre nuestra ciudad,",
    formattedText: "Por otro lado, cuando la lluvia cae directamente sobre nuestra\u00A0ciudad,",
    startFrame: 934,
    endFrame: 1043,
  },
  {
    text: "entran en juego el escurrimiento y la saturación de los suelos.",
    formattedText: "entran en juego el escurrimiento y la saturación de los\u00A0suelos.",
    startFrame: 1044,
    endFrame: 1120,
  },
  {
    text: "Por eso en nuestra provincia es tan importante la protección de los humedales,",
    formattedText: "Por eso en nuestra provincia es tan importante la protección de los\u00A0humedales,",
    startFrame: 1121,
    endFrame: 1218,
  },
  {
    text: "que actúan como una esponja natural, absorbiendo y reteniendo el exceso de agua.",
    formattedText: "que actúan como una esponja natural, absorbiendo y reteniendo el exceso de\u00A0agua.",
    startFrame: 1219,
    endFrame: 1395,
  },

  // Mito 2 (F1399 - F2085)
  {
    text: "Mito 2: «Si vivo lejos del río, el agua no me llega».",
    formattedText: "Mito 2: «Si vivo lejos del río, el agua no me\u00A0llega».",
    startFrame: 1399,
    endFrame: 1515,
  },
  {
    text: "¡Error! Existen inundaciones repentinas por lluvias torrenciales,",
    formattedText: "¡Error! Existen inundaciones repentinas por lluvias\u00A0torrenciales,",
    startFrame: 1518,
    endFrame: 1630,
  },
  {
    text: "que pueden pasar en cualquier barrio.",
    formattedText: "que pueden pasar en cualquier\u00A0barrio.",
    startFrame: 1631,
    endFrame: 1709,
  },
  {
    text: "Si los desagües están tapados, tu calle se vuelve un río temporal.",
    formattedText: "Si los desagües están tapados, tu calle se vuelve un río\u00A0temporal.",
    startFrame: 1710,
    endFrame: 1846,
  },
  {
    text: "Acá somos todos protagonistas:",
    formattedText: "Acá somos todos\u00A0protagonistas:",
    startFrame: 1847,
    endFrame: 1906,
  },
  {
    text: "sacar la basura a horario,",
    formattedText: "sacar la basura a\u00A0horario,",
    startFrame: 1907,
    endFrame: 1947,
  },
  {
    text: "no tirar plásticos en la vía pública es vital para que el agua escurra rápido y no nos tape.",
    formattedText: "no tirar plásticos en la vía pública es vital para que el agua escurra rápido y no nos\u00A0tape.",
    startFrame: 1948,
    endFrame: 2085,
  },

  // Mito 3 (F2090 - F2685)
  {
    text: "Mito 3: «Si la calle está inundada, pero el agua está bajita, cruzo igual».",
    formattedText: "Mito 3: «Si la calle está inundada, pero el agua está bajita, cruzo\u00A0igual».",
    startFrame: 2090,
    endFrame: 2225,
  },
  {
    text: "¡Peligro! Intentar cruzar es una pésima idea.",
    formattedText: "¡Peligro! Intentar cruzar es una pésima\u00A0idea.",
    startFrame: 2230,
    endFrame: 2340,
  },
  {
    text: "Ese charco gigante y turbio esconde trampas:",
    formattedText: "Ese charco gigante y turbio esconde\u00A0trampas:",
    startFrame: 2345,
    endFrame: 2434,
  },
  {
    text: "alcantarillas destapadas, pozos o desniveles que no se ven a simple vista.",
    formattedText: "alcantarillas destapadas, pozos o desniveles que no se ven a simple\u00A0vista.",
    startFrame: 2440,
    endFrame: 2601,
  },
  {
    text: "¡Buscá nomás un camino alternativo y no te arriesgues!",
    formattedText: "¡Buscá nomás un camino alternativo y no te\u00A0arriesgues!",
    startFrame: 2602,
    endFrame: 2685,
  },

  // Mito 4 (F2687 - F3415)
  {
    text: "Mito 4: «Si ya dejó de llover, ya pasó el peligro».",
    formattedText: "Mito 4: «Si ya dejó de llover, ya pasó el\u00A0peligro».",
    startFrame: 2687,
    endFrame: 2787,
  },
  {
    text: "¡Falso! La postlluvia esconde otras amenazas.",
    formattedText: "¡Falso! La postlluvia esconde otras\u00A0amenazas.",
    startFrame: 2787,
    endFrame: 2915,
  },
  {
    text: "Si ingresó agua dentro de casa el riesgo eléctrico es altísimo,",
    formattedText: "Si ingresó agua dentro de casa el riesgo eléctrico es\u00A0altísimo,",
    startFrame: 2916,
    endFrame: 3020,
  },
  {
    text: "nunca deben tocar electrodomésticos ni paredes húmedas sin cortar la corriente antes.",
    formattedText: "nunca deben tocar electrodomésticos ni paredes húmedas sin cortar la corriente\u00A0antes.",
    startFrame: 3021,
    endFrame: 3170,
  },
  {
    text: "Y afuera, el agua estancada puede estar contaminada",
    formattedText: "Y afuera, el agua estancada puede estar\u00A0contaminada",
    startFrame: 3171,
    endFrame: 3249,
  },
  {
    text: "y es el criadero VIP del mosquito del dengue.",
    formattedText: "y es el criadero VIP del mosquito del\u00A0dengue.",
    startFrame: 3250,
    endFrame: 3315,
  },
  {
    text: "No debemos bajar la guardia.",
    formattedText: "No debemos bajar la\u00A0guardia.",
    startFrame: 3316,
    endFrame: 3365,
  },
  {
    text: "Y este sí que ya es un montón.",
    formattedText: "Y este sí que ya es un\u00A0montón.",
    startFrame: 3366,
    endFrame: 3415,
  },

  // Mito 5 (F3420 - F4160)
  {
    text: "Mito 5: «El clima está controlado por corporaciones secretas y antenas gigantes».",
    formattedText: "Mito 5: «El clima está controlado por corporaciones secretas y antenas\u00A0gigantes».",
    startFrame: 3420,
    endFrame: 3570,
  },
  {
    text: "¡Ficción pura! Las teorías conspirativas no tienen ningún sustento científico.",
    formattedText: "¡Ficción pura! Las teorías conspirativas no tienen ningún sustento\u00A0científico.",
    startFrame: 3575,
    endFrame: 3715,
  },
  {
    text: "Lo que sí es real y está comprobado por la ciencia,",
    formattedText: "Lo que sí es real y está comprobado por la\u00A0ciencia,",
    startFrame: 3716,
    endFrame: 3810,
  },
  {
    text: "es que la actividad humana está acelerando el calentamiento global.",
    formattedText: "es que la actividad humana está acelerando el calentamiento\u00A0global.",
    startFrame: 3811,
    endFrame: 3910,
  },
  {
    text: "Nuestro impacto en el planeta, combinado con ciclos naturales como el Fenómeno de El Niño,",
    formattedText: "Nuestro impacto en el planeta, combinado con ciclos naturales como el Fenómeno de El\u00A0Niño,",
    startFrame: 3915,
    endFrame: 4030,
  },
  {
    text: "es lo que provoca que las lluvias y tormentas sean cada vez más intensas y extremas.",
    formattedText: "es lo que provoca que las lluvias y tormentas sean cada vez más intensas y\u00A0extremas.",
    startFrame: 4035,
    endFrame: 4160,
  },

  // Cierre (F4163 - F4280)
  {
    text: "¡Compartí este video para ganarle a la desinformación y al agua!",
    formattedText: "¡Compartí este video para ganarle a la desinformación y al\u00A0agua!",
    startFrame: 4163,
    endFrame: 4280,
  },
];

export default CAPTIONS;
