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

### 1.1. El Máster ya decidió el encuadre (La coreografía se lee, no se inventa)
El montajista y el camarógrafo mueven la cámara o reencuadran al docente para hacerle lugar al contenido gráfico:
- **Docente a la izquierda (`framing: 'left'`)**: El Motion Graphic se ancla automáticamente a la **DERECHA** (`anchorX: 'right'`).
- **Docente al centro (`framing: 'center'`)**: El Motion Graphic acompaña en la banda lateral disponible más ancha (`opposite` / `widest`) sin invadir la silueta de la persona ni sus manos abiertas.
- **Docente fuera de cuadro / Orador en OFF (`framing: 'none'`)**: El Motion Graphic debe ser **CENTRADO, FIJO Y PROTAGONISTA** en pantalla (`anchorX: 'center'`), aprovechando el ancho útil de la zona segura.

> [!CRITICAL]
> **Nunca escribas coordenadas `top`/`left` a mano en los componentes de un episodio.** Toda posición se resuelve matemáticamente a través de `<Slot>` y `resolveSlot()`.

### 1.2. Reglas de Identidad y Docentes
- **Los nombres de las personas NUNCA se toman de la escaleta**: Las escaletas se redactan en preproducción y el casting real cambia frecuentemente. El nombre se extrae de la **placa quemada en el máster MP4** (lower third) y se confirma con coordinación.
- **La placa de nombre es un rect reservado (`RESERVED`)**: Se declara en `data.ts` con su rango de frames (`from` / `to`) para que ningún gráfico ni subtítulo la pise.

### 1.3. Reglas Estrictas de Contraste y Legibilidad (WCAG AAA)
- **NUNCA texto blanco suelto sobre el fondo del plató**: Los platós (cian `#1195C4`, lila `#EAA1F0`, verde menta, etc.) son claros y dan un ratio menor a 3.5:1 (rechazado por corrección pedagógica).
- **Todo texto va sobre `<Surface>` o tarjetas opacas**: Fondo blanco con tinta oscura (`#07202C` / `#0C2B24`, ratio > 15:1).
- **Énfasis triple**: Resaltado amarillo (`#FFF6C4`) + tinta oscura + subrayado o filete de color.
- **Subtítulos con Scrim**: Fondo negro semitransparente con opacidad mínima de $\alpha = 0.55$ (`rgba(7, 32, 44, 0.55)`), `backdropFilter: blur(10px)` y borde sutil `rgba(255, 255, 255, 0.16)` para garantizar ratio $\ge 4.5:1$ sobre fondos claros o ropa del docente.
- **Pisos de legibilidad**: Ancho mínimo de tarjeta **380 px**, cuerpo de texto mínimo **26 px**, duración mínima de bloque **60 frames** (2.4 s), y **75 frames** de panel quieto antes del primer resaltado.

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
   - Cápsula blanca flotante (`borderRadius: '20px'`), sombra profunda, borde fino `rgba(7, 32, 44, 0.09)`, ícono badge a la izquierda (`🚨`, `⚠️`, `❓`) y texto en `Museo 900` (30 px).

6. **Estilo de Tarjetas Generales**:
   - Fondo: Blanco puro `#FFFFFF` (opacidad $\ge 0.94$).
   - Vértices: `borderRadius: '24px'` con `overflow: 'hidden'`.
   - Borde: `1.5px solid rgba(7, 32, 44, 0.09)`.
   - Sombra: `0 20px 48px rgba(7, 32, 44, 0.16), 0 4px 12px rgba(7, 32, 44, 0.05)`.

---

## 3. Flujo de Trabajo para un Episodio

```
    [ Máster MP4 + Escaleta .docx ]
                   │
                   ▼
       1. Transcripción y Cues
    (Whisper -ml 1 ➔ words.json)
    (cues.def.json ➔ align-cues.mjs)
                   │
                   ▼
         2. Tracker de Plató
     (track-presenter.mjs ➔ track.ts)
     [Segmenta: left, center, none]
                   │
                   ▼
      3. Componentes & Animación
   (Tarjetas con RainbowEyebrow, Springs)
                   │
                   ▼
           4. data.ts
      (BLOCKS, MARKS, CAPTIONS)
                   │
                   ▼
     5. Verificación Completa
  (npm run check: layout + contrast)
  (npm run stills: contact sheet)
                   │
                   ▼
          6. Renders Finales
  - MP4 Completo con Máster de Video
  - MOV ProRes 4444 con Canal Alfa
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

1. [ ] ¿Todas las tarjetas incluyen la **ceja cromática cuatricolor** (`#D43453`, `#F0BA46`, `#60B6D3`, `#5DAA46`)?
2. [ ] ¿Los titulares usan `Museo 900` y las etiquetas/cuerpo usan `Museo Sans` respetando el piso de 26 px?
3. [ ] ¿Los titulares de decisiones o mitos incluyen el filete de acento verde inferior?
4. [ ] ¿Los motion graphics en tramos en OFF están perfectamente centrados?
5. [ ] ¿Cuando el docente está a la izquierda los gráficos están anclados a la derecha?
6. [ ] ¿Ningún gráfico ni subtítulo pisa al docente, ni la placa de nombre reservada, ni la marca de agua?
7. [ ] ¿El reporte de `npm run check` arrojó 0 errores en geometría y contraste?
8. [ ] ¿Se renderizó el `.mov` ProRes 4444 con canal alfa verificado?
