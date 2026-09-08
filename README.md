# EducaPlay Secundaria — Remotion Motion Graphics Engine

> **Motor programático y estético unificado de Motion Graphics en Remotion para la serie educativa de televisión EducaPlay Secundaria (Gobierno de Corrientes).**

Este repositorio contiene todo el código fuente, componentes visuales, tipografías oficiales, activos de audio, reglas de diseño y complementos de IA (Skills) para generar gráficos en movimiento sincronizados con precisión de cuadros y exportar sobreimpresiones con canal alfa transparente (`.mov` ProRes 4444).

---

## 🎨 Características Principales

- **Ceja Cromática Cuatricolor Oficial**: Barra superior institucional de 4 bandas simétricas de 6px (`#D43453` Rubí, `#F0BA46` Oro, `#60B6D3` Celeste, `#5DAA46` Verde EducaPlay).
- **Tipografía Institucional Embebida**: Familias completas *Museo 700 / 900* y *Museo Sans 500 / 700* codificadas en Base64 en `src/styles/fonts.css`, garantizando idéntico render en Windows, macOS y Linux sin necesidad de instalar fuentes en el sistema operativo.
- **Contraste y Accesibilidad WCAG AAA**: Fondo contenedor nocturno `#07202C` con textos en blanco puro (`#FFFFFF`) y acentos de color por materia (ej. `#10BA1B` para Ambiente, `#00A859` para Lengua/Leo).
- **Slot Tracking Dinámico**: Detección del encuadre y posición del docente (`medium_right`, `small_left`, `large_center`) para coreografiar los gráficos automáticamente en la banda libre del cuadro sin pisar al presentador.
- **Micro-animaciones de Entrada y Salida**: Animaciones basadas en físicas de resortes (`spring({ damping: 15, stiffness: 120 })`) con desvanecimiento de salida coordinado de 12 frames y efectos de sonido Whoosh sincronizados.
- **Exportación de Canal Alfa Nativo**: Flujo de trabajo optimizado para Premiere Pro, DaVinci Resolve y After Effects mediante exportación ProRes 4444 con transparencia total de fondo.
- **Skill de Inteligencia Artificial Incluida**: Carpeta `.agents/skills/educaplay-motion-graphics/` lista para ser usada por asistentes AI (Antigravity IDE, Cursor, Claude Code) para generar nuevos episodios respetando estrictamente el manual de marca.

---

## 📋 Requisitos del Sistema

- **Node.js**: Versión 18.0.0 o superior (recomendado 20.x LTS o 22.x LTS).
- **npm**: Versión 9 o superior (incluido con Node.js).
- **Git**: Para clonar el repositorio.

---

## 🚀 Instalación y Puesta en Marcha

### 1. Clonar el repositorio
```bash
git clone https://github.com/inteligencio2047-crypto/EducaplayRemotion.git
cd EducaplayRemotion
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar Remotion Studio (Preview en vivo)
```bash
npm start
# o también:
npm run studio
```
Abre tu navegador en `http://localhost:3000` (o el puerto que indique la consola). Podrás previsualizar en tiempo real el episodio con el video del profesor o la composición de sobreimpresión transparente con scrubber cuadro por cuadro.

---

## 🎬 Scripts y Renderizado

| Comando | Descripción |
| :--- | :--- |
| `npm start` | Inicia Remotion Studio para vista previa interactiva. |
| `npm run check` | Ejecuta el validador estático de accesibilidad WCAG AAA, fuentes y tracking. |
| `npm run render:alpha` | **Exporta el video completo con canal alfa transparente** (`out/AMB26-02-OVERLAYS-ALPHA.mov`, ProRes 4444, 23.976 fps, 1080p). |
| `npm run render:alpha:1min` | Exporta un corte de prueba rápido de 1 minuto (1440 cuadros) con canal alfa. |
| `npm run build` | Renderiza el video compuesto final (`out/AMB26-02-FINAL.mp4`) incluyendo el master de cámara. |
| `npm run stills` | Genera capturas de sincronización cuadro a cuadro para verificación estética. |

---

## 📁 Estructura del Repositorio

```text
EducaplayRemotion/
├── .agents/
│   └── skills/
│       └── educaplay-motion-graphics/  # Skill unificada de IA con reglas de diseño y templates
│           ├── SKILL.md                # Especificación técnica, colores, tokens y directivas
│           └── reference/              # Plantillas data-template.ts y cues-ejemplo.json
├── ARQUITECTURA_MARCA_EDUCAPLAY.md     # Manual completo de arquitectura de marca y motion
├── public/
│   ├── audio/                          # Efectos sonoros sincronizados (whoosh_in, whoosh_out)
│   ├── RECURSOS/                       # Imágenes, stickers, infografías y clips del episodio
│   └── RENDER/                         # Video máster del corte docente optimizado para preview
├── scripts/
│   ├── check-layout.mjs                # Validador de slots, WCAG AAA y presencia de fuentes
│   └── generate-sync-mobile-stills.mjs # Script de generación de stills para QA visual
├── src/
│   ├── components/
│   │   ├── ActionCard.tsx              # Tarjetas de acción y medidas preventivas
│   │   ├── AlertPill.tsx               # Píldora animada de aviso/alerta con icono
│   │   ├── ChecklistCard.tsx           # Lista secuencial de verificación interactiva
│   │   ├── ConceptCard.tsx             # Ecuaciones pedagógicas y conceptos clave
│   │   ├── MediaCard.tsx               # Portacontenedores para fotos y videos secundarios
│   │   ├── RainbowEyebrow.tsx          # Componente atómico de ceja cromática cuatricolor
│   │   ├── SentenceCaptions.tsx        # Subtitulado dinámico con despeje de lower third
│   │   ├── SlotContainer.tsx           # Contenedor con físicas spring y slots espaciales
│   │   ├── StepBodyCard.tsx            # Cuerpo de paso con keywords e iconos
│   │   ├── StepHeaderCard.tsx          # Cabecera de paso numerada con badge
│   │   ├── StickerBadge.tsx            # Sellos institucionales de cierre
│   │   └── TitularCard.tsx             # Placa titular con ceja y subrayado verde
│   ├── styles/
│   │   └── fonts.css                   # Tipografías oficiales Museo y Museo Sans (Base64)
│   ├── captions.ts                     # Subtítulos con timing por palabra y oraciones
│   ├── data.ts                         # Escaleta y bloques de Motion Graphics del episodio
│   ├── EpisodeAMB2602.tsx              # Componente raíz del episodio AMB26-02
│   ├── index.ts                        # Entry point de Remotion
│   ├── Root.tsx                        # Registro de composiciones (Master, Alpha, 1Min)
│   └── track.ts                        # Segmentos de tracking espacial del profesor
├── ESCALETA AMB26_02.docx              # Escaleta original de producción
├── escaleta.json                       # Escaleta estructurada en formato JSON
├── transcription.json                  # Transcripción automatizada con timestamps
├── package.json                        # Definición de dependencias y scripts de render
├── remotion.config.ts                  # Configuración del CLI de Remotion
└── tsconfig.json                       # Configuración de TypeScript
```

---

## 🧩 Biblioteca de Componentes Visuales

1. **`TitularCard`**: Placa principal para títulos de temas o mitos. Cuenta con ceja cromática superior y subrayado verde acento `#10BA1B`.
2. **`StepHeaderCard`**: Cabecera para protocolos secuenciales (Paso 1, Paso 2, etc.) con badge circular y tipografía *Museo 900*.
3. **`StepBodyCard`**: Tarjeta complementaria que detalla los ítems de cada paso con íconos temáticos (agua, gas, electricidad) y notas al pie.
4. **`MediaCard`**: Ventana multimedia para fotografías fijas o videos complementarios con pie de foto y crédito de fuente.
5. **`ConceptCard`**: Destaca ecuaciones pedagógicas (ej. `Amenaza + Vulnerabilidad = Riesgo`) con subtítulo explicativo.
6. **`ActionCard`**: Tarjeta con imagen lateral y lista de acciones prácticas de protección civil.
7. **`AlertPill`**: Píldora compacta que emerge para reforzar un punto crítico con llamada de atención.
8. **`StickerBadge`**: Sello gráfico flotante para llamados a la acción y cierres institucionales.
9. **`SentenceCaptions`**: Subtítulos accesibles en tipografía Museo Sans con elevación automática cuando aparece el Lower Third del docente.

---

## 🎨 Paleta Cromática y Tokens de Marca

```typescript
export const BRAND_COLORS = {
  // Ceja Cuatricolor Oficial
  rainbowRuby: '#D43453',
  rainbowGold: '#F0BA46',
  rainbowBlue: '#60B6D3',
  rainbowGreen: '#5DAA46',

  // Contenedores
  cardBackground: '#07202C',
  cardBackgroundTransparent: 'rgba(7, 32, 44, 0.94)',

  // Acentos por Materia
  accentAmbiente: '#10BA1B',  // Verde Educación Ambiental Integral
  accentLengua: '#00A859',    // Verde Leo, Comprendo y Aprendo
  accentCiencias: '#60B6D3',  // Celeste Ciencias
  accentHistoria: '#F0BA46',  // Oro Historia

  // Tipografía
  textPrimary: '#FFFFFF',
  textSecondary: '#DDE5EB',
  textMuted: '#94A3B8',
};
```

---

## 🛠️ Cómo Adaptar a un Nuevo Episodio

1. Duplica o edita `src/data.ts` con la metadata de tu nuevo capítulo (código, título, docente, color de acento).
2. Genera los segmentos de posición del docente en `src/track.ts` a partir de los cortes de plano del máster.
3. Agrega tus imágenes y videos secundarios en `public/RECURSOS/`.
4. Define los bloques en el array `blocks` de `src/data.ts` indicando los frames `from` y `to`, el tipo de componente (`kind`) y el anclaje de slot (`anchorX: 'left' | 'right'`).
5. Ejecuta `npm run check` para validar contrastes y posiciones.
6. Ejecuta `npm run render:alpha` para obtener el archivo de sobreimpresiones transparente listo para montaje.

---

## 📄 Licencia

Desarrollado para la Dirección de Tecnología Educativa — Ministerio de Educación de la Provincia de Corrientes (EducaPlay Corrientes).
