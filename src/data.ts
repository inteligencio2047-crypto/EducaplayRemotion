import { CAPTIONS, SentenceCaption } from './captions';

export type ResourceCategory = 'small_left' | 'medium_right' | 'large_center';

export interface BaseBlock {
  key: string;
  from: number;
  to: number;
  anchorX: 'left' | 'right' | 'center';
  category: ResourceCategory;
}

export interface ImageCardBlock extends BaseBlock {
  kind: 'image_card';
  src: string;
  title: string;
  caption?: string;
  source?: string;
}

export interface VideoCardBlock extends BaseBlock {
  kind: 'video_card';
  src: string;
  title: string;
  caption?: string;
  source?: string;
  clipFrom?: number;
}

export interface ConceptCardBlock extends BaseBlock {
  kind: 'concept_card';
  title: string;
  equation: string;
  subtitle: string;
}

export interface ActionCardBlock extends BaseBlock {
  kind: 'action_card';
  title: string;
  imageSrc?: string;
  items: string[];
}

export interface StickerBadgeBlock extends BaseBlock {
  kind: 'sticker_badge';
  text: string;
  icon?: string;
}

export interface TitularCardBlock extends BaseBlock {
  kind: 'titular_card';
  title: string;
  kicker?: string;
  subtitle?: string;
  showAccentRule?: boolean;
}

export interface StepHeaderBlock extends BaseBlock {
  kind: 'step_header';
  stepNumber: string;
  stepLabel?: string;
  title: string;
}

export interface StepBodyBlock extends BaseBlock {
  kind: 'step_body';
  items: { keyword: string; description: string; icon?: 'water' | 'gas' | 'electricity' | 'check' | 'warning' }[];
  footnote?: string;
}

export interface AlertPillBlock extends BaseBlock {
  kind: 'alert_pill';
  text: string;
  iconType?: 'alert' | 'siren' | 'question';
}

export type MotionBlock =
  | ImageCardBlock
  | VideoCardBlock
  | ConceptCardBlock
  | ActionCardBlock
  | StickerBadgeBlock
  | TitularCardBlock
  | StepHeaderBlock
  | StepBodyBlock
  | AlertPillBlock;

export interface EpisodeData {
  meta: {
    id: string;
    code: string;
    title: string;
    subject: string;
    subjectShort: string;
    accentColor: string;
    onAccentColor: string;
    presenterName: string;
    videoMaster: string;
    fps: number;
    durationInFrames: number;
  };
  blocks: MotionBlock[];
  captions: SentenceCaption[];
}

export const DATA: EpisodeData = {
  meta: {
    id: 'ambiente-amb26-02',
    code: 'AMB26-02',
    title: '¡Chaque el agua! Mitos y verdades sobre las inundaciones',
    subject: 'Educación Ambiental Integral',
    subjectShort: 'AMBIENTE',
    accentColor: '#10BA1B',
    onAccentColor: '#FFFFFF',
    presenterName: 'Prof. Amparo Pérez Rueda',
    videoMaster: 'RENDER/AMB26-02 - PRIMER CORTE.mp4',
    fps: 23.976,
    durationInFrames: 4461,
  },
  captions: CAPTIONS,
  blocks: [
    // 0A. 0:10 a 0:16 (F256 - F384) Recurso 1: "¡Chaque el agua!" al nombrarlo hasta segundo 16
    {
      key: 'block-0a-chaque',
      kind: 'image_card',
      category: 'small_left',
      anchorX: 'left',
      from: 256,
      to: 384,
      src: 'RECURSOS/chaque el agua.png',
      title: '¡Chaque el agua!',
      caption: 'Mitos y verdades sobre las inundaciones en Corrientes',
    },

    // 0B. 0:18 a 0:20 (F435 - F495) Recurso 2: "mitos" en "...derribar algunos mitos"
    {
      key: 'block-0b-mitos',
      kind: 'image_card',
      category: 'small_left',
      anchorX: 'left',
      from: 435,
      to: 495,
      src: 'RECURSOS/mitos.gif',
      title: 'Derribando mitos',
      caption: 'Información científica y verificada frente al agua',
    },

    // 1A. 0:22 a 0:38 (F505 - F780) Titular exacto de escaleta + video lluvia
    {
      key: 'block-1a-rain',
      kind: 'video_card',
      category: 'medium_right',
      anchorX: 'right',
      from: 505,
      to: 780,
      src: 'RECURSOS/video lluvia.mp4',
      title: 'Mito 1: “Nos inundamos porque está lloviendo mucho”',
      caption: '¡Falso! Influyen crecidas de ríos y tormentas a cientos de kilómetros',
      source: 'Lluvias e Inundaciones — Corrientes',
      clipFrom: 0,
    },

    // 1B. 0:39 a 0:46 (F934 - F1120) Recurso "ciudad" (Escurrimiento urbano)
    {
      key: 'block-1b-ciudad',
      kind: 'image_card',
      category: 'small_left',
      anchorX: 'left',
      from: 934,
      to: 1120,
      src: 'RECURSOS/ciudad.jpg',
      title: 'Escurrimiento urbano',
      caption: 'La lluvia directa sobre la ciudad satura los suelos',
      source: 'Ambiente Urbano',
    },

    // 1C. 0:47 a 0:58 (F1121 - F1390) Recurso "humedales" ("esponja natural" en minúsculas)
    {
      key: 'block-1c-humedales',
      kind: 'concept_card',
      category: 'small_left',
      anchorX: 'left',
      from: 1121,
      to: 1390,
      title: 'Protección de humedales',
      equation: 'esponja natural',
      subtitle: 'Absorben y retienen el exceso de agua pluvial regulando el caudal.',
    },

    // 2A. 0:59 a 1:12 (F1399 - F1709) Titular exacto de escaleta + Inundaciones repentinas
    {
      key: 'block-2a-flashflood',
      kind: 'image_card',
      category: 'medium_right',
      anchorX: 'right',
      from: 1399,
      to: 1709,
      src: 'RECURSOS/inundaciones repentinas.jpg',
      title: 'Mito 2: “Si vivo lejos del río, el agua no me llega”',
      caption: '¡Error! Inundaciones repentinas por lluvias torrenciales',
      source: 'Registro Documental',
    },

    // 2B. 1:13 a 1:20 (F1710 - F1940) Recurso "basura" ("desagües" en minúscula y alto contraste)
    {
      key: 'block-2b-basura',
      kind: 'image_card',
      category: 'small_left',
      anchorX: 'left',
      from: 1710,
      to: 1940,
      src: 'RECURSOS/basura.png',
      title: 'Cuidado de desagües',
      caption: 'Sacar la basura a horario evita que tu calle se vuelva un río temporal',
    },

    // 2C. 1:21 a 1:27 (F1945 - F2085) Recurso "plásticos" en "no tirar plásticos..."
    {
      key: 'block-2c-plasticos',
      kind: 'image_card',
      category: 'small_left',
      anchorX: 'left',
      from: 1945,
      to: 2085,
      src: 'RECURSOS/plásticos.png',
      title: 'Vía pública limpia',
      caption: 'No tirar plásticos en la vía pública es vital para que el agua escurra rápido',
    },

    // 3A. 1:28 a 1:32 (F2090 - F2230) Titular exacto de escaleta Mito 3
    {
      key: 'block-3a-mito3-titular',
      kind: 'titular_card',
      category: 'medium_right',
      anchorX: 'right',
      from: 2090,
      to: 2230,
      kicker: 'MITO 3',
      title: '“Si la calle está inundada, pero el agua está bajita, cruzo igual”',
      subtitle: '¡Peligro! Intentar cruzar calles anegadas es una pésima idea',
      showAccentRule: true,
    },

    // 3B. 1:33 a 1:41 (F2236 - F2430) Recurso "calle inundada" al nombrarlo hasta "idea"
    {
      key: 'block-3b-calle',
      kind: 'image_card',
      category: 'small_left',
      anchorX: 'left',
      from: 2236,
      to: 2430,
      src: 'RECURSOS/calle inundada.png',
      title: 'Calle inundada',
      caption: 'El charco gigante y turbio esconde trampas no visibles a simple vista',
    },

    // 3C. 1:42 a 1:50 (F2435 - F2640) Recurso "peligro" ("Trampas ocultas" en minúscula, sale antes de F2650 para no pisar el rostro)
    {
      key: 'block-3c-peligro',
      kind: 'image_card',
      category: 'small_left',
      anchorX: 'left',
      from: 2435,
      to: 2640,
      src: 'RECURSOS/peligro.gif',
      title: 'Trampas ocultas',
      caption: 'Alcantarillas destapadas, pozos y desniveles peligrosos bajo el agua',
    },

    // 4A. 1:52 a 1:57 (F2687 - F2787) Titular exacto de escaleta Mito 4 (margen seguro respecto al hombro)
    {
      key: 'block-4a-postrain',
      kind: 'titular_card',
      category: 'medium_right',
      anchorX: 'right',
      from: 2687,
      to: 2787,
      kicker: 'MITO 4',
      title: '“Si ya dejó de llover, ya pasó el peligro”',
      subtitle: '¡Falso! La postlluvia esconde otras amenazas severas',
      showAccentRule: true,
    },

    // 4B. 1:58 a 2:22 (F2793 - F3410) Recurso "amenazas" ("postlluvia" en minúscula) hasta "dengue"
    {
      key: 'block-4b-riesgos',
      kind: 'action_card',
      category: 'small_left',
      anchorX: 'left',
      from: 2793,
      to: 3410,
      title: 'Amenazas postlluvia',
      imageSrc: 'RECURSOS/amenazas.png',
      items: [
        'Cortar la electricidad si ingresó agua al hogar',
        'Nunca deben tocar electrodomésticos ni paredes húmedas',
        'Eliminar recipientes con agua estancada (Criadero de dengue)',
      ],
    },

    // 5A. 2:22 a 2:29 (F3405 - F3572) Titular exacto de escaleta Mito 5 ("clima" en minúscula) + "ficción pura"
    {
      key: 'block-5a-ficcion',
      kind: 'image_card',
      category: 'medium_right',
      anchorX: 'right',
      from: 3405,
      to: 3572,
      src: 'RECURSOS/ficción pura.gif',
      title: 'Mito 5: "El clima está controlado por corporaciones secretas y antenas gigantes"',
      caption: '¡Ficción pura! Las teorías conspirativas no tienen ningún sustento científico',
    },

    // 5B. 2:37 a 2:44 (F3765 - F3910) Recurso "calentamiento global" (actividad humana)
    {
      key: 'block-5b-calentamiento',
      kind: 'image_card',
      category: 'small_left',
      anchorX: 'left',
      from: 3765,
      to: 3910,
      src: 'RECURSOS/calentamiento global.png',
      title: 'Actividad humana',
      caption: 'La actividad humana está acelerando el calentamiento global',
      source: 'Ciencia del Clima',
    },

    // 5C. 2:45 a 2:54 (F3915 - F4160) Recurso "Fenómeno de El Niño" (impacto y tormentas extremas)
    {
      key: 'block-5c-nino',
      kind: 'concept_card',
      category: 'small_left',
      anchorX: 'left',
      from: 3915,
      to: 4160,
      title: 'Fenómeno de El Niño',
      equation: 'tormentas extremas',
      subtitle: 'Ciclos naturales combinados con el impacto humano intensifican las precipitaciones.',
    },

    // 6. 2:55 a 3:06 (F4163 - F4420) Cierre Institucional
    {
      key: 'block-6-cierre',
      kind: 'sticker_badge',
      category: 'small_left',
      anchorX: 'left',
      from: 4163,
      to: 4420,
      text: '¡Compartí este video para ganarle a la desinformación y al agua!',
      icon: 'RECURSOS/chaque el agua.png',
    },
  ],
};

export default DATA;
