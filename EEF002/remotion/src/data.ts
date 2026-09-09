import { CAPTIONS } from './captions';
import { TRACK_SEGMENTS } from './track';

export interface BaseBlock {
  key: string;
  name: string;
  from: number;
  to: number;
  anchorX: 'left' | 'right' | 'center';
  category: 'small_left' | 'medium_right' | 'large_center';
  role: 'didactico' | 'refuerzo';
}

export interface MediaCardBlock extends BaseBlock {
  kind: 'media_card';
  src: string;
  title?: string;
  caption?: string;
  isVideo?: boolean;
}

export interface TitularCardBlock extends BaseBlock {
  kind: 'titular_card';
  title: string;
  subtitle?: string;
}

export type MotionBlock = MediaCardBlock | TitularCardBlock;

export const MARKS = {
  totalFrames: 4478,
  fps: 25,
  width: 1920,
  height: 1080,
  outroFadeStart: 4280,
  lowerThirdIn: 215,
  lowerThirdOut: 445,
  reservedLowerThird: {
    from: 215,
    to: 445,
    rect: [140, 860, 720, 150]
  }
};

export const BLOCKS: MotionBlock[] = [
  // Fila 02: 1. te paso
  {
    kind: 'media_card',
    key: 'f02_te_paso',
    name: '1. Te pasó',
    from: 206,
    to: 327,
    anchorX: 'left',
    category: 'small_left',
    role: 'refuerzo',
    src: 'assets/1. te pasó_.gif'
  },
  // Fila 03: 2. Elegir
  {
    kind: 'media_card',
    key: 'f03_elegir',
    name: '2. Elegir',
    from: 356,
    to: 472,
    anchorX: 'left',
    category: 'small_left',
    role: 'refuerzo',
    src: 'assets/2. elegir.jpg'
  },
  // Fila 04: Titular 'Necesidad ≠ deseo' y Recurso 3
  {
    kind: 'titular_card',
    key: 'f04_titular',
    name: 'Titular: Necesidad ≠ deseo',
    title: 'Necesidad ≠ deseo',
    from: 520,
    to: 670,
    anchorX: 'right',
    category: 'medium_right',
    role: 'didactico'
  },
  {
    kind: 'media_card',
    key: 'f04_diferencias',
    name: '3. Diferencias',
    from: 520,
    to: 670,
    anchorX: 'right',
    category: 'medium_right',
    role: 'didactico',
    src: 'assets/3. diferencias.gif'
  },
  // Fila 05: Titular 'Necesidades' y Recurso 4
  {
    kind: 'titular_card',
    key: 'f05_titular',
    name: 'Titular: Necesidades',
    title: 'Necesidades',
    from: 725,
    to: 894,
    anchorX: 'right',
    category: 'medium_right',
    role: 'didactico'
  },
  {
    kind: 'media_card',
    key: 'f05_necesidades',
    name: '4. Necesidades',
    from: 725,
    to: 894,
    anchorX: 'right',
    category: 'medium_right',
    role: 'didactico',
    src: 'assets/4. necesidades.png'
  },
  // Fila 06: Titular 'Necesidades primarias' y Recursos 5, 6, 7
  {
    kind: 'titular_card',
    key: 'f06_titular',
    name: 'Titular: Necesidades primarias',
    title: 'Necesidades primarias',
    from: 942,
    to: 1257,
    anchorX: 'right',
    category: 'medium_right',
    role: 'didactico'
  },
  {
    kind: 'media_card',
    key: 'f06_alimentarnos',
    name: '5. Alimentarnos',
    from: 942,
    to: 1040,
    anchorX: 'right',
    category: 'medium_right',
    role: 'didactico',
    src: 'assets/5. alimentarnos.jpg'
  },
  {
    kind: 'media_card',
    key: 'f06_agua',
    name: '6. Agua',
    from: 1045,
    to: 1150,
    anchorX: 'right',
    category: 'medium_right',
    role: 'didactico',
    src: 'assets/6. agua.jpg'
  },
  {
    kind: 'media_card',
    key: 'f06_vivienda',
    name: '7. Vivienda',
    from: 1155,
    to: 1257,
    anchorX: 'right',
    category: 'medium_right',
    role: 'didactico',
    src: 'assets/7. vivienda.jpg'
  },
  // Fila 07: Titular 'Necesidades secundarias' y Recurso 8
  {
    kind: 'titular_card',
    key: 'f07_titular',
    name: 'Titular: Necesidades secundarias',
    title: 'Necesidades secundarias',
    from: 1313,
    to: 1534,
    anchorX: 'right',
    category: 'medium_right',
    role: 'didactico'
  },
  {
    kind: 'media_card',
    key: 'f07_secundarias',
    name: '8. Necesidades secundarias',
    from: 1313,
    to: 1534,
    anchorX: 'right',
    category: 'medium_right',
    role: 'didactico',
    src: 'assets/8. necesidades secundarias.gif'
  },
  // Fila 08: 10. transporte
  {
    kind: 'media_card',
    key: 'f08_transporte',
    name: '10. Transporte',
    from: 1535,
    to: 1690,
    anchorX: 'left',
    category: 'small_left',
    role: 'refuerzo',
    src: 'assets/10. transporte.jpg'
  },
  // Fila 09: 9. internet y 11. entonces
  {
    kind: 'media_card',
    key: 'f09_internet',
    name: '9. Internet',
    from: 1720,
    to: 1845,
    anchorX: 'left',
    category: 'small_left',
    role: 'refuerzo',
    src: 'assets/9. internet.jpg'
  },
  {
    kind: 'media_card',
    key: 'f09_entonces',
    name: '11. Entonces',
    from: 1850,
    to: 1980,
    anchorX: 'left',
    category: 'small_left',
    role: 'refuerzo',
    src: 'assets/11. entonces.gif'
  },
  // Fila 10: Titular 'Deseo' y Recurso 12
  {
    kind: 'titular_card',
    key: 'f10_titular',
    name: 'Titular: Deseo',
    title: 'Deseo',
    from: 1996,
    to: 2100,
    anchorX: 'right',
    category: 'medium_right',
    role: 'didactico'
  },
  {
    kind: 'media_card',
    key: 'f10_deseo',
    name: '12. Deseo',
    from: 1996,
    to: 2100,
    anchorX: 'right',
    category: 'medium_right',
    role: 'didactico',
    isVideo: true,
    src: 'assets/12. deseo.mp4'
  },
  // Fila 11: 13. Tenemos hambre (Voz en off pantalla completa)
  {
    kind: 'media_card',
    key: 'f11_hambre',
    name: '13. Tenemos hambre',
    from: 2110,
    to: 2475,
    anchorX: 'center',
    category: 'large_center',
    role: 'didactico',
    isVideo: true,
    src: 'assets/13. Tenemos hambre.mp4'
  },
  // Fila 12: 16. puede ser
  {
    kind: 'media_card',
    key: 'f12_puede_ser',
    name: '16. Puede ser',
    from: 2490,
    to: 2650,
    anchorX: 'left',
    category: 'small_left',
    role: 'refuerzo',
    src: 'assets/16. puede ser.gif'
  },
  // Fila 13: 17. elegir
  {
    kind: 'media_card',
    key: 'f13_elegir',
    name: '17. Elegir',
    from: 2680,
    to: 2840,
    anchorX: 'left',
    category: 'small_left',
    role: 'refuerzo',
    src: 'assets/17. elegir.gif'
  },
  // Fila 14: 18. dinero
  {
    kind: 'media_card',
    key: 'f14_dinero',
    name: '18. Dinero',
    from: 2870,
    to: 3045,
    anchorX: 'right',
    category: 'medium_right',
    role: 'didactico',
    src: 'assets/18. dinero.jpg'
  },
  // Fila 15: 19. por eso (Voz en off pantalla completa)
  {
    kind: 'media_card',
    key: 'f15_por_eso',
    name: '19. Por eso',
    from: 3063,
    to: 3265,
    anchorX: 'center',
    category: 'large_center',
    role: 'didactico',
    isVideo: true,
    src: 'assets/19. por eso.mp4'
  },
  // Fila 16: 20. publicidad
  {
    kind: 'media_card',
    key: 'f16_publicidad',
    name: '20. Publicidad',
    from: 3280,
    to: 3560,
    anchorX: 'right',
    category: 'medium_right',
    role: 'didactico',
    src: 'assets/20. publicidad.jpg'
  },
  // Fila 17: 21. pensando
  {
    kind: 'media_card',
    key: 'f17_pensando',
    name: '21. Pensando',
    from: 3575,
    to: 3670,
    anchorX: 'left',
    category: 'small_left',
    role: 'refuerzo',
    src: 'assets/21. pensando.gif'
  },
  // Fila 18: Propuesta Pedagógica (Tarjeta reflexiva)
  {
    kind: 'titular_card',
    key: 'f18_propuesta',
    name: 'Propuesta: Consumo Consciente',
    title: 'Consumo Consciente',
    subtitle: 'Entender qué estamos eligiendo y por qué',
    from: 3790,
    to: 3853,
    anchorX: 'right',
    category: 'medium_right',
    role: 'didactico'
  },
  // Fila 19: 22. reconocemos y 23. Conciencia
  {
    kind: 'media_card',
    key: 'f19_reconocemos',
    name: '22. Reconocemos',
    from: 3865,
    to: 4050,
    anchorX: 'right',
    category: 'medium_right',
    role: 'didactico',
    src: 'assets/22. reconocemos.gif'
  },
  {
    kind: 'media_card',
    key: 'f19_conciencia',
    name: '23. Conciencia',
    from: 4055,
    to: 4275,
    anchorX: 'right',
    category: 'medium_right',
    role: 'didactico',
    src: 'assets/23. Conciencia.gif'
  }
];

export const DATA = {
  meta: {
    id: 'EEF002',
    subject: 'Educación Económica y Financiera',
    title: 'Necesidades y Deseos',
    durationInFrames: 4478,
    fps: 25,
    width: 1920,
    height: 1080
  },
  marks: MARKS,
  blocks: BLOCKS,
  captions: CAPTIONS,
  trackSegments: TRACK_SEGMENTS
};

export default DATA;
