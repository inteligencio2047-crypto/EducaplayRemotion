---
name: educaplay-motion-graphics
description: |
  Guía integral y estándar técnico unificado para la creación, animación, diseño visual, tracking y sincronización de Motion Graphics en Remotion para los episodios educativos de EducaPlay Secundaria (Corrientes). Usar al diseñar, maquetar, animar o renderizar cualquier episodio de cualquier materia (Matemática, Lengua/Leo, Ambiente, Historia, etc.): coreografía según la posición del docente, ceja cromática cuatricolor obligatoria, tipografía oficial Museo y Museo Sans, contraste WCAG AAA, exportación de canal alfa y verificación geométrica.
allowed-tools: Bash(npm run *), Bash(node *), Bash(npx remotion *), Bash(ffmpeg *), Bash(ffprobe *)
---

# EducaPlay Motion Graphics — Estándar Técnico y Sistema Visual Unificado

Esta skill condensa el estándar oficial, reglas de oro, patrones de diseño estético y el motor de producción de **Motion Graphics educativos en Remotion** dentro del ecosistema de **EducaPlay Secundaria**.

---

## 1. Principios Fundamentales del Sistema

### 1.1. Categorización de Carga de Atención y Coreografía Dual
La interacción entre el docente y los motion graphics se rige de forma estricta por el nivel de atención que demanda el contenido pedagógico. Antes de animar, cada recurso debe clasificarse en una de estas tres categorías operativas:

1. **Recursos con Baja Carga de Atención (Stickers, Emojis y Titulares Cortos)**:
   - **Contenido**: Emojis animados, stickers ilustrativos, palabras clave o titulares de 1 o 2 líneas breves.
   - **Comportamiento del Docente**: El docente **permanece en el centro** de la pantalla (`framing: 'center'`).
   - **Ubicación del Gráfico**: El recurso se ancla flotante a la **IZQUIERDA** del docente en pantalla, respetando su silueta sin invadir su gesticulación ni los márgenes de seguridad.

2. **Recursos con Media Carga de Atención (Textos Largos, Videos Cortos, Gráficos y Enumeraciones)**:
   - **Contenido**: Conceptos desarrollados, pastillas descriptivas, enumeraciones verticales/fichas (pasos, ejemplos), comparativas y videos secundarios breves.
   - **Comportamiento del Docente**: El docente **se mueve o es reencuadrado a la IZQUIERDA** (`framing: 'left'`) en la línea de tiempo.
   - **Ubicación del Gráfico**: Se ancla a la **DERECHA** (`anchorX: 'right'`), ubicándose de forma protagónica debajo del logo/marca de agua de la materia, con pastillas de mayor porte e imágenes/videos en tarjetas con `<RainbowEyebrow />`.

3. **Recursos con Alta Carga de Atención (Videos Extensos y Gráficos Complejos)**:
   - **Contenido**: Videos demostrativos largos, infografías de alta densidad conceptual, mapas o cuadros sinópticos completos explicados en voz en off.
   - **Comportamiento del Docente**: El docente **desaparece del cuadro** (`framing: 'none'`).
   - **Ubicación del Gráfico**: Ocupa el centro de la pantalla a **cuadro completo / full screen** hasta los márgenes de seguridad (`safeArea`), con fondo propio o viñeta de plató, mientras la narración en off guía la lectura.

> [!CRITICAL]
> **Nunca escribas coordenadas `top`/`left` a mano en los componentes de un episodio.** Toda posición se resuelve matemáticamente a través de `<Slot>` y `resolveSlot()` respetando esta coreografía.

### 1.2. Protocolo Obligatorio de Pre-Edición: Tablero Interactivo de Sincronización (Fase 0)
> [!IMPORTANT]
> **ESTÁNDAR MANDATORIO PARA TODAS LAS MATERIAS Y EPISODIOS FUTUROS**:
> Antes de escribir una sola línea de código en Remotion (`data.ts`), es **estrictamente obligatorio** confeccionar el **Tablero Interactivo de Sincronización Pre-Edición** (`TABLA_SINCRONIZACION_PRE_EDICION_[CODIGO].html` y `.md`). Este protocolo aplica sin excepción a todas las materias de EducaPlay Secundaria (Educación Ambiental, Educación Económica y Financiera, Lengua/Leo, Historia, Ciudadanía Digital, Matemática, etc.) como instancia formal de validación técnica y pedagógica entre el Editor de Video, el Docente y el Motion Designer.

#### 1.2.1. Entregables Obligatorios de Fase 0
Por cada episodio a producir, el equipo debe generar en la carpeta del capítulo:
1. `TABLA_SINCRONIZACION_PRE_EDICION_[CODIGO].html`: Interfaz web interactiva de control con selectores, enlaces de recursos y botón de lanzamiento.
2. `TABLA_SINCRONIZACION_PRE_EDICION_[CODIGO].md`: Respaldo documental markdown formateado para lectura y control en GitHub.
3. `TABLA_SINCRONIZACION_DATOS.json`: Matriz de datos crudos estructurada con marcas temporales, textos y metadatos.
4. `remotion_generator.py`: Generador automatizado del proyecto Remotion (`data.ts`, `captions.ts`, componentes y assets).
5. `local_bridge_server.py`: Micro-servidor HTTP local (puerto 3210) que permite conectar la página HTML con el CLI de Remotion con un solo clic.

#### 1.2.2. Requisitos Mandatorios del Tablero de Sincronización
1. **Cruce Temporal Exacto**:
   - Mapear cada fila de la escaleta contra el audio real del primer corte (`PRIMER CORTE.mp4`), documentando el segundo exacto (`start_time - end_time`) y los números de frame reales a 25 fps (`start_frame - end_frame`).
2. **Transcripción Fiel, Diferencias de Diálogo (🔴 Resaltado Rojo) y Selector de Subtítulos de 3 Vías**:
   - Transcribir el discurso real pronunciado por el docente (vía Whisper a nivel palabra).
   - **Resaltar obligatoriamente en rojo vivo (`#DC2626`)** toda diferencia entre lo escrito en la escaleta y lo dicho en cámara (omisiones, sustituciones, adiciones o cambios de entonación).
   - **Selector interactivo de fuente de subtítulos** en cada fila del HTML:
     * **[ ● ] Guion Escaleta (Recomendado por defecto)**: Marcado por defecto, garantiza coherencia gramatical y didáctica de guion.
     * **[ ○ ] Real Grabado (1er Corte)**: Opción para adoptar la transcripción exacta del audio grabado cuando las variaciones del docente sean pertinentes.
     * **[ ○ ] ✍️ Corrección Manual Personalizada**: Despliega un `<textarea>` editable donde el corrector o editor redacta la versión definitiva que se inyectará en `captions.ts`.
3. **Columna Específica de Titulares de la Escaleta Original**:
   - Registrar en una columna propia el texto literal de cada **Titular pautado en la escaleta original**, detallando su **código de tiempo y frame exacto de entrada y salida**.
   - Identificar explícitamente el recurso gráfico al que va asociado en la misma fila para resolver su coexistencia espacial y evitar colisiones visuales.
4. **Columna de Propuestas Exclusiva para Filas Vacías (con Casilla Marcable)**:
   - **Regla de oro anti-saturación**: La columna de propuestas **SOLO puede contener sugerencias en las filas donde NO existan ni recursos gráficos ni titulares propuestos por el docente en la escaleta original** (vacíos visuales del guion). Si la fila ya cuenta con titular o recurso, la columna debe permanecer limpia (`—`).
   - Cada propuesta debe incluir una **casilla interactiva marcable y desmarcable (`<input type="checkbox">`)**, permitiendo al profesor y al editor activar o desestimar el gráfico propuesto con un solo clic.
5. **Detección del Encuadre Real vs. Norma de 3 Niveles de Atención**:
   - Registrar la posición real del profesor en el video (Centro, Izquierda, Fuera de cuadro) y contrastarla con la requerida según el nivel de atención (Baja, Media o Alta), alertando al editor si se requiere reencuadre digital en Premiere.
6. **Auditoría de Recursos, Alerta de Faltantes y Casilla de Enlace**:
   - Comparar rigurosamente los nombres y tipos de archivos de la carpeta `RECURSOS/` contra la escaleta:
     * **Alerta visual destacada para recursos faltantes**: Todo recurso solicitado que no esté presente en disco debe destacarse con tarjeta roja `🚨 RECURSO FALTANTE EN CARPETA`.
     * **Casilla interactiva para enlazar reemplazo**: Disponer en el HTML de un campo de texto y un botón **📁 Examinar** para asociar el archivo alternativo localmente antes de generar el código.
     * Alertar archivos sin extensión (ej. videos guardados sin `.mp4`).
     * Alertar imágenes pesadas sin optimizar o GIF sin fondo transparente.
7. **Botón de Aprobación y Generación Automatizada en Remotion (Preview Local)**:
   - Al pie de la tabla y en una barra flotante inferior, disponer del botón **`🚀 Aceptar y Generar Proyecto Remotion`**.
   - Al presionarlo, el tablero compila el manifest aprobado (`TABLA_SINCRONIZACION_APROBADA.json`), llama al bridge local y genera automáticamente `data.ts`, `captions.ts` y levanta el entorno de **Remotion Preview en `http://localhost:3000`** para su visualización y revisión inmediata.
8. **Instancia de Corrección y Firma Previa**:
   - El documento generado debe ser validado formalmente por el Editor y el Docente antes de dar por cerrado el pase a producción.

### 1.3. Reglas de Identidad y Docentes
- **Los nombres de las personas NUNCA se toman de la escaleta**: Las escaletas se redactan en preproducción y el casting real cambia frecuentemente. El nombre se extrae de la **placa quemada en el máster MP4** (lower third) y se confirma con coordinación.
- **La placa de nombre es un rect reservado (`RESERVED`)**: Se declara en `data.ts` con su rango de frames (`from` / `to`) para que ningún gráfico ni subtítulo la pise.

### 1.4. Reglas Estrictas de Contraste, Legibilidad y Subtitulado (WCAG AAA)
- **NUNCA texto blanco suelto sobre el fondo del plató**: Los platós (cian `#1195C4`, lila `#EAA1F0`, verde menta, etc.) son claros y dan un ratio menor a 3.5:1 (rechazado por corrección pedagógica).
- **Todo texto va sobre `<Surface>` o tarjetas opacas**: Fondo blanco con tinta oscura (`#07202C` / `#0C2B24`, ratio > 15:1).
- **Énfasis triple**: Resaltado amarillo (`#FFF6C4`) + tinta oscura + subrayado o filete de color.
- **Subtítulos con Scrim**: Fondo negro semitransparente con opacidad mínima de $\alpha = 0.55$ (`rgba(7, 32, 44, 0.55)`), `backdropFilter: blur(10px)` y borde sutil `rgba(255, 255, 255, 0.16)` para garantizar ratio $\ge 4.5:1$ sobre fondos claros o ropa del docente.
- **Regla Inflexible de Máximo 2 Líneas en Subtítulos**: Ningún bloque de subtitulado puede superar las **dos líneas** en pantalla bajo ninguna circunstancia. Si un diálogo o texto excede este límite (típicamente > 80-90 caracteres o más de una proposición gramatical), el texto **DEBE dividirse en oraciones completas o cláusulas sintácticas de fácil comprensión**, sin cortar conceptos a la mitad ni quebrar sintagmas, sincronizando cada parte resultante de forma exacta con la palabra inicial y final pronunciada por el profesor (extraída de `transcript_words.json`). Cada bloque resultante debe tener como máximo 1 o 2 líneas equilibradas (`textWrap: 'balance'`).
- **Evasión Obligatoria de la Placa del Docente (Elevación Automática F215 a F445)**: Durante los frames en que la placa lower-third con el nombre del profesor está en pantalla (declarada en `MARKS.lowerThirdIn` y `MARKS.lowerThirdOut`, comúnmente entre F215 y F445), la caja de subtítulos **DEBE elevarse automáticamente** (`bottom: 230px`, con `transition: 'bottom 0.25s ease'`) para despejar totalmente la franja inferior izquierda y evitar cualquier colisión o solapamiento con la caja identificatoria del docente. Una vez finalizada la placa del docente, el subtítulo desciende suavemente a su posición base estándar (`bottom: 48px`).
- **Pisos de legibilidad**: Ancho mínimo de tarjeta **380 px**, cuerpo de texto mínimo **26 px**, duración mínima de bloque **60 frames** (2.4 s), y **75 frames** de panel quieto antes del primer resaltado.
- **Contrato de Montaje en Remotion (`<Sequence>`)**: Todo bloque de `DATA.blocks` debe envolverse indefectiblemente en un `<Sequence key={block.key} name={block.name} from={block.from} durationInFrames={block.to - block.from}>`. Nunca debe instanciarse `<SlotContainer>` directamente sobre el tiempo global de la composición, pues `useCurrentFrame()` interpretaría el frame absoluto del capítulo, haciendo que las funciones de interpolación y desvanecimiento (`fadeIn`/`fadeOut`) reduzcan la opacidad a 0 y oculten el recurso en el monitor de programa. El `<Sequence>` aísla el tiempo local (0 a `durationInFrames`), permitiendo que el `spring` de entrada, la opacidad y los efectos de salida operen con total nitidez.

---

## 2. Sistema Estético Oficial EducaPlay

### 2.1. Ceja Cromática Cuatricolor Obligatoria (`<RainbowEyebrow />`)
**TODA tarjeta pedagógica, titular, recurso, concepto, protocolo, paso o checklist DEBE incluir en su borde superior la Ceja Cromática Oficial de EducaPlay**:
- **Estructura**: 4 segmentos horizontales de proporciones exactamente iguales (25% cada uno), ordenados de izquierda a derecha:
  1. `Rojo / Coral`: `#D43453` (25%)
  2. `Amarillo Cálido / Oro`: `#F0BA46` (25%)
  3. `Cian / Celeste`: `#60B6D3` (25%)
  4. `Verde Hoja / Materia`: `#5DAA46` (25%)
- **Dimensiones**: Altura fija de `6px` a `8px` (`eyebrowHeight: '6px'`).
- **Enmascaramiento**: La tarjeta contenedora padre declara `borderRadius: '24px'` y `overflow: 'hidden'`, logrando que el borde multicolor se adapte de forma nativa a la curvatura de las esquinas superiores.
- **Regla de oro**: NUNCA usar bordes superiores monocolores verdes, blancos o planos. El riel cuatricolor es el sello distintivo de la marca paraguas EducaPlay.

```tsx
export const RainbowEyebrow: React.FC<{ height?: string | number }> = ({ height = '6px' }) => {
  const colors = ['#D43453', '#F0BA46', '#60B6D3', '#5DAA46'];
  return (
    <div style={{ width: '100%', height, display: 'flex', flexDirection: 'row', flexShrink: 0 }}>
      {colors.map((c, i) => (
        <div key={i} style={{ flex: 1, height: '100%', backgroundColor: c }} />
      ))}
    </div>
  );
};
```

### 2.2. Jerarquía Tipográfica de Marca (Museo y Museo Sans)
El proyecto utiliza exclusivamente las fuentes corporativas embebidas en `src/styles/fonts.css`:

1. **Kickers / Etiquetas / Tags de Categoría Superior**:
   - Fuente: `Museo Sans` 700 u 800
   - Formato: `textTransform: 'uppercase'` con `letterSpacing: '0.10em'` a `'0.14em'`
   - Color: `accentDeep` (`#06590D` en Ambiente)
   - Tamaño: 16–18 px
   - Ejemplos: `DECISIONES CLAVE`, `PASO`, `PROTOCOLO DE SEGURIDAD`, `CONCEPTO CLAVE`, `REGISTRO DOCUMENTAL · CORRIENTES`.

2. **Titulares Principales (`TitularCard`)**:
   - Fuente: `Museo` (pesos 700 o 900 - Slab serif distintivo de EducaPlay)
   - Color: Tinta oscura profunda (`THEME.ink`: `#0C2B24` o `#07202C`)
   - Interlineado: `lineHeight: 1.20` a `1.24`
   - Tamaño: 34–38 px (versión compacta 30–32 px)
   - **Filete de Acento Inferior**: En tarjetas de titulares de decisiones, preguntas o mitos, se coloca un filete horizontal verde de acento (`width: 84px`, `height: 4px`, `borderRadius: 2px`, `backgroundColor: THEME.accent`) inmediatamente debajo del título y antes de la bajada explicativa.

3. **Cuerpo, Bajadas y Explicaciones**:
   - Fuente: `Museo Sans` (pesos 400, 600 o 700)
   - Tamaño mínimo: $\ge 26\text{ px}$ (piso estricto de legibilidad pedagógica)
   - Interlineado: `lineHeight: 1.30` a `1.35`
   - Color: `THEME.accentDeep` o `THEME.ink`

4. **Tarjetas de Pasos Modulares (`StepHeaderCard` y `StepBodyCard`)**:
   - **Cabecera de Paso**: Número de paso en cuerpo gigante (56 px, `Museo 900`, `THEME.accentDeep`), separador vertical (`2px solid rgba(7, 32, 44, 0.12)`), etiqueta `PASO` en `Museo Sans 800` mayúsculas y nombre del paso en `Museo 900`.
   - **Cuerpo de Paso**: Ceja cuatricolor superior, íconos vectoriales delineados de servicios (agua, gas, electricidad), palabra clave en negrita (`Museo Sans 900`), texto explicativo en `Museo Sans 600` (piso 26 px), divisor horizontal sutil y nota al pie en 20–22 px (`Museo Sans 600`).

5. **Pastillas de Alerta Flotantes (`AlertPill`)**:
   - Cápsula blanca flotante (`borderRadius: '20px'`), sombra profunda, borde fino `rgba(7, 32, 44, 0.09)`, ícono badge a la izquierda (`🚨`, `⚠️`, `❓`) y texto en `Museo 900` (30 px), ideales para preguntas retóricas, avisos de atención o llamadas de foco pedagógico (ej. "¿Qué hacés?", "¿A dónde vas?").

6. **Tarjetas de Recursos Didácticos (`<MediaCard />`)**:
   - **Ceja Cromática Cuatricolor Obligatoria**: Riel de 4 colores en el borde superior (`<RainbowEyebrow />`), altura fija de 6 px a 8 px.
   - **Well de Media Calibrado**: Contenedor superior para imágenes, GIFs animados o videos. Fondo `#07202C` para video/fotos reales o `#F4FBFD` para elementos gráficos transparentes.
   - **Badge de Fuente / Atribución**: Esquina superior derecha con fondo oscuro translúcido (`rgba(7, 32, 44, 0.90)`), borde sutil de acento y texto en `Museo Sans 700` (15 px) con espaciado amplio.
   - **Pie Tipográfico Institucional**: Superficie blanca `#FFFFFF`, Título en `Museo 900` (32–36 px, color tinta `#07202C` / `#0C2B24`) y bajada / crédito en `Museo Sans 600` (24–26 px, color `THEME.accentDeep`).
   - **Dimensiones según Carga de Atención**:
     * `small_left`: 560 × 300 px (docente en centro).
     * `medium_right`: 680 × 380 px (docente a la izquierda).
     * `large_center`: 1140 × 480 px (pantalla completa / docente en off).

7. **Estilo de Tarjetas Generales (Norma Paraguas ARQUITECTURA_MARCA_EDUCAPLAY.md)**:
   - Fondo: Blanco puro `#FFFFFF` (opacidad $\ge 0.94$).
   - Vértices: `borderRadius: '24px'` con `overflow: 'hidden'`.
   - Borde: `1.5px solid rgba(7, 32, 44, 0.09)`.
   - Sombra: `0 20px 48px rgba(7, 32, 44, 0.16), 0 4px 12px rgba(7, 32, 44, 0.05)`.

---

## 3. Flujo de Trabajo para un Episodio

```
    [ Máster MP4 (1er Corte) + Escaleta .docx + Carpeta RECURSOS ]
                                   │
                                   ▼
        0. Fase Pre-Edición: Matriz de Sincronización
        - Transcripción y cotejo del diálogo real vs guion
        - Auditoría de recursos (archivos sin extensión, faltantes)
        - Categorización en 3 niveles de carga de atención
        - Detección de posición del docente (Centro, Izquierda, OFF)
        - Validación y correcciones previas con Editor y Docente
                                   │
                                   ▼
        1. Transcripción Fina y Cues a Nivel Palabra
        (Whisper -ml 1 ➔ words.json / cues.def.json ➔ align-cues.mjs)
                                   │
                                   ▼
        2. Tracker de Plató y Segmentación Dinámica
        (track-presenter.mjs ➔ track.ts con profileT)
                                   │
                                   ▼
        3. Maquetación de Componentes & Animación
        (Tarjetas con RainbowEyebrow, Springs, tipografía Museo)
                                   │
                                   ▼
        4. Declaración Editorial en data.ts
        (BLOCKS, MARKS, CAPTIONS, correcciones ASR y slots seguros)
                                   │
                                   ▼
        5. Verificación Geométrica y Cromática
        (npm run check: layout + contrast + overlays)
                                   │
                                   ▼
        6. Exportación y Entrega
        - MOV ProRes 4444 con Canal Alfa (Overlay transparente)
        - MP4 Completo con Máster de Video
```

### Transcripción y Sincronización Whisper
- Ejecutar Whisper obligatoriamente con `-ml 1` para obtener timestamps palabra por palabra.
- **Correcciones de subtítulos**: Los errores de transcripción de Whisper nunca se editan a mano en `captions.ts`. Se declaran en `data.ts` mediante `applyCaptionFixes([{find, replace, why}])`.

---

## 4. Exportación y Render de Entregables

### 4.1. Video Completo (Máster + Overlays)
```bash
npx remotion render src/index.ts Episode<CODE> out/<CODE>-FINAL.mp4 --concurrency=8
```

### 4.2. Video con Canal Alpha (Solo Motion Graphics + Subtítulos)
Para entregar al editor de video una pista transparente lista para superponer en Premiere Pro, DaVinci Resolve o Final Cut:
```bash
npx remotion render src/index.ts Episode<CODE>-Overlay out/<CODE>-OVERLAYS-ALPHA.mov --codec=prores --prores-profile=4444 --concurrency=8
```

> [!TIP]
> En la composición de overlays, la raíz utiliza `<AbsoluteFill style={{ backgroundColor: 'transparent' }}>` y omite el `<OffthreadVideo>` del máster, preservando el canal alfa en todos los gráficos, subtítulos con su *scrim* semitransparente y efectos sonoros sincronizados.

---

## 5. Checklist de Control de Calidad Pre-Render

1. [ ] **Matriz Pre-Edición Aprobada**: ¿Se generó la tabla de sincronización y carga de atención, y fue revisada/aprobada por el editor y el docente?
2. [ ] **Auditoría de Recursos Completa**: ¿Se verificaron extensiones faltantes, archivos huérfanos o ausentes en `RECURSOS/`?
3. [ ] **Coreografía Dual Cumplida**: 
   - Baja carga de atención: docente en el centro, recurso anclado a la izquierda.
   - Media carga de atención: docente a la izquierda, recurso anclado a la derecha bajo el logo.
   - Alta carga de atención / OFF: docente fuera de cuadro, recurso a pantalla completa (safe area).
4. [ ] **Identidad Oficial EducaPlay**: ¿Todas las tarjetas incluyen la **ceja cromática cuatricolor** obligatoria (`#D43453`, `#F0BA46`, `#60B6D3`, `#5DAA46`) de 6 a 8 px?
5. [ ] **Jerarquía Tipográfica**: ¿Titulares en `Museo 900` y cuerpo/etiquetas en `Museo Sans` respetando el piso estricto de 26 px?
6. [ ] **Contraste WCAG AAA**: ¿Todo texto está montado sobre `<Surface>` o tarjetas blancas (nunca texto blanco sobre el plató)?
7. [ ] **Subtítulos con Scrim**: ¿El fondo de subtítulos tiene `rgba(7, 32, 44, 0.55)` con blur de 10 px y borde sutil?
8. [ ] **Geometría y Alpha Runs**: ¿El reporte de `npm run check` arrojó 0 colisiones contra el docente, marcas reservadas o entre bloques?
9. [ ] **Entregables Verificados**: ¿Se renderizó el `.mov` ProRes 4444 con canal alfa verificado para el montaje final en Premiere?
