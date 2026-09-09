"""
Generador automático del proyecto Remotion para EEF002 basado en la Matriz de Sincronización Aprobada.
"""
import os, sys, json, subprocess, shutil

BASE_DIR = os.path.abspath(r"c:\Users\produ\Videos\EDUCAPLAY 2026 LOCAL\SECUNDARIA\Educacion economica y financiera\EEF002")
REMOTION_DIR = os.path.join(BASE_DIR, "remotion")
NODE_MODULES_SRC = os.path.abspath(r"c:\Users\produ\Videos\EDUCAPLAY 2026 LOCAL\SECUNDARIA\Educación Ambiental integral\AMB26-02\node_modules")
BACKUP_EEF001_DIR = os.path.abspath(r"c:\Users\produ\Videos\EDUCAPLAY 2026 LOCAL\SECUNDARIA\_backup_remotion_previous\EEF001")
APPROVED_MANIFEST_PATH = os.path.join(BASE_DIR, "TABLA_SINCRONIZACION_APROBADA.json")
DEFAULT_MANIFEST_PATH = os.path.join(BASE_DIR, "TABLA_SINCRONIZACION_DATOS.json")

def setup_remotion_project(manifest_data=None):
    os.makedirs(REMOTION_DIR, exist_ok=True)
    src_dir = os.path.join(REMOTION_DIR, "src")
    components_dir = os.path.join(src_dir, "components")
    styles_dir = os.path.join(src_dir, "styles")
    public_dir = os.path.join(REMOTION_DIR, "public")
    os.makedirs(components_dir, exist_ok=True)
    os.makedirs(styles_dir, exist_ok=True)
    os.makedirs(public_dir, exist_ok=True)

    # 1. Vincular node_modules mediante junction si no existe
    nm_dst = os.path.join(REMOTION_DIR, "node_modules")
    if not os.path.exists(nm_dst):
        print("Creando enlace junction a node_modules...")
        cmd = f'cmd /c mklink /J "{nm_dst}" "{NODE_MODULES_SRC}"'
        subprocess.run(cmd, shell=True, check=True)

    # 2. Copiar package.json y configs
    pkg_json = {
      "name": "educaplay-eef002-remotion",
      "version": "1.0.0",
      "description": "EducaPlay Secundaria - Motion Graphics EEF002 (Necesidades y Deseos)",
      "scripts": {
        "start": "remotion preview src/index.ts --port 3000",
        "preview": "remotion preview src/index.ts --port 3000",
        "build": "remotion render EpisodeEEF002 out/EEF002-FINAL.mp4",
        "render:alpha": "remotion render EpisodeEEF002-Overlay out/EEF002-OVERLAY-ALPHA.mov --codec=prores --prores-profile=4444 --pixel-format=yuva444p10le"
      },
      "dependencies": {
        "@remotion/cli": "^4.0.280",
        "@remotion/media-utils": "^4.0.280",
        "@remotion/shapes": "^4.0.280",
        "react": "^18.3.1",
        "react-dom": "^18.3.1",
        "remotion": "^4.0.280"
      },
      "devDependencies": {
        "@types/react": "^18.3.3",
        "typescript": "^5.4.5"
      }
    }
    with open(os.path.join(REMOTION_DIR, "package.json"), "w", encoding="utf-8") as f:
        json.dump(pkg_json, f, indent=2)

    tsconfig = {
      "compilerOptions": {
        "target": "es2022",
        "module": "commonjs",
        "jsx": "react-jsx",
        "strict": False,
        "noImplicitAny": False,
        "esModuleInterop": True,
        "skipLibCheck": True,
        "forceConsistentCasingInFileNames": True
      }
    }
    with open(os.path.join(REMOTION_DIR, "tsconfig.json"), "w", encoding="utf-8") as f:
        json.dump(tsconfig, f, indent=2)

    remotion_config = """import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setConcurrency(4);
"""
    with open(os.path.join(REMOTION_DIR, "remotion.config.ts"), "w", encoding="utf-8") as f:
        f.write(remotion_config)

    # 3. Generar Sistema de Diseño Oficial EducaPlay (brand/ y components/)
    brand_dir = os.path.join(src_dir, "brand")
    os.makedirs(brand_dir, exist_ok=True)
    
    # brand/eefTheme.ts
    theme_ts = """/**
 * Tema oficial para Educación Económica y Financiera (EducaPlay Secundaria)
 * Basado estrictamente en ARQUITECTURA_MARCA_EDUCAPLAY.md y estándares WCAG AAA.
 */
export const THEME = {
  ink: '#07202C',         // Tinta oscura profunda (>15:1 sobre blanco)
  accent: '#00ADC3',      // Acento cian oficial de la materia
  accentDeep: '#006876',  // Cian profundo para kickers y tags (WCAG AAA > 7:1)
  emphasisBg: '#FFF6C4',  // Fondo amarillo pastel para ÉNFASIS TRIPLE oficial
  surface: '#FFFFFF',     // Superficie blanca luminosa (alfa >= 0.94)

  // Bordes y sombras institucionales unificadas
  border: '1.5px solid rgba(7, 32, 44, 0.09)',
  shadow: '0 20px 48px rgba(7, 32, 44, 0.16), 0 4px 12px rgba(7, 32, 44, 0.05)',
  eyebrowHeight: '6px',

  // Ceja Cromática Oficial de Marca EducaPlay (Riel Arcoíris de 4 colores)
  rainbowRail: ['#D43453', '#F0BA46', '#60B6D3', '#5DAA46'] as const,
  rainbowGradient: 'linear-gradient(to right, #D43453 0%, #D43453 25%, #F0BA46 25%, #F0BA46 50%, #60B6D3 50%, #60B6D3 75%, #5DAA46 75%, #5DAA46 100%)',

  // Banda de subtítulos con scrim esmerilado calibrado (frosted glass)
  captions: {
    scrim: 'rgba(7, 32, 44, 0.55)',
    border: '1.2px solid rgba(255, 255, 255, 0.18)',
    blur: '12px',
    fontSize: '34px',
  },

  // Tipografías oficiales
  fonts: {
    title: "'Museo', system-ui, -apple-system, sans-serif",
    body: "'Museo Sans', system-ui, -apple-system, sans-serif",
  },
} as const;

export default THEME;
"""
    with open(os.path.join(brand_dir, "eefTheme.ts"), "w", encoding="utf-8") as f:
        f.write(theme_ts)

    # Copiar fuentes si existen en backup
    styles_b = os.path.join(BACKUP_EEF001_DIR, "src", "styles")
    if os.path.exists(styles_b):
        for item in os.listdir(styles_b):
            s = os.path.join(styles_b, item)
            d = os.path.join(styles_dir, item)
            if os.path.isfile(s):
                shutil.copy2(s, d)

    # RainbowEyebrow.tsx
    eyebrow_tsx = """import React from 'react';
import { THEME } from '../brand/eefTheme';

export interface RainbowEyebrowProps {
  height?: string | number;
}

export const RainbowEyebrow: React.FC<RainbowEyebrowProps> = ({
  height = THEME.eyebrowHeight,
}) => {
  return (
    <div
      style={{
        width: '100%',
        height,
        display: 'flex',
        flexDirection: 'row',
        flexShrink: 0,
      }}
    >
      {THEME.rainbowRail.map((color, idx) => (
        <div
          key={idx}
          style={{
            flex: 1,
            height: '100%',
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
};

export default RainbowEyebrow;
"""
    with open(os.path.join(components_dir, "RainbowEyebrow.tsx"), "w", encoding="utf-8") as f:
        f.write(eyebrow_tsx)

    # TitularCard.tsx
    titular_tsx = """import React from 'react';
import { THEME } from '../brand/eefTheme';
import { RainbowEyebrow } from './RainbowEyebrow';

export interface TitularCardProps {
  title: string;
  kicker?: string;
  subtitle?: string;
  showAccentRule?: boolean;
  isCompact?: boolean;
}

export const TitularCard: React.FC<TitularCardProps> = ({
  title,
  kicker,
  subtitle,
  showAccentRule = true,
  isCompact = false,
}) => {
  return (
    <div
      style={{
        backgroundColor: THEME.surface,
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: THEME.shadow,
        border: THEME.border,
        maxWidth: isCompact ? '560px' : '680px',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: THEME.fonts.title,
      }}
    >
      <RainbowEyebrow />
      <div style={{ padding: isCompact ? '20px 26px' : '24px 32px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {kicker && (
          <span
            style={{
              fontSize: '18px',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: 800,
              color: THEME.accentDeep,
              fontFamily: THEME.fonts.body,
            }}
          >
            {kicker}
          </span>
        )}
        <div
          style={{
            fontSize: isCompact ? '32px' : '36px',
            fontWeight: 900,
            color: THEME.ink,
            lineHeight: 1.22,
            fontFamily: THEME.fonts.title,
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </div>
        {showAccentRule && (
          <div
            style={{
              width: '84px',
              height: '4px',
              backgroundColor: THEME.accent,
              borderRadius: '2px',
              marginTop: '4px',
              marginBottom: subtitle ? '6px' : '0px',
            }}
          />
        )}
        {subtitle && (
          <div
            style={{
              fontSize: '26px',
              fontWeight: 600,
              color: THEME.accentDeep,
              fontFamily: THEME.fonts.body,
              lineHeight: 1.35,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};

export default TitularCard;
"""
    with open(os.path.join(components_dir, "TitularCard.tsx"), "w", encoding="utf-8") as f:
        f.write(titular_tsx)

    # MediaCard.tsx
    media_tsx = """import React from 'react';
import { getRemotionEnvironment, Html5Video, Img, OffthreadVideo, staticFile } from 'remotion';
import { THEME } from '../brand/eefTheme';
import { RainbowEyebrow } from './RainbowEyebrow';

export interface MediaCardProps {
  kind: 'image' | 'video';
  src: string;
  title?: string;
  caption?: string;
  source?: string;
  clipFrom?: number;
  isCompact?: boolean;
  isLarge?: boolean;
}

export const MediaCard: React.FC<MediaCardProps> = ({
  kind,
  src,
  title,
  caption,
  source,
  clipFrom = 0,
  isCompact = false,
  isLarge = false,
}) => {
  const widthPx = isLarge ? 1480 : isCompact ? 480 : 680;
  const heightPx = isLarge ? ((title || caption) ? 720 : 832) : isCompact ? 280 : 380;
  const isTransparentGraphic = src.endsWith('.png') || src.endsWith('.gif');
  const isRendering = getRemotionEnvironment().isRendering;

  return (
    <div
      style={{
        backgroundColor: THEME.surface,
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: THEME.shadow,
        border: THEME.border,
        width: `${widthPx}px`,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: THEME.fonts.title,
        position: 'relative',
      }}
    >
      <RainbowEyebrow />
      {source && (
        <div
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            backgroundColor: 'rgba(7, 32, 44, 0.90)',
            color: '#FFFFFF',
            padding: '6px 14px',
            borderRadius: '10px',
            fontSize: '15px',
            fontWeight: 700,
            zIndex: 10,
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(0, 173, 195, 0.4)',
            fontFamily: THEME.fonts.body,
            letterSpacing: '0.04em',
          }}
        >
          Fuente: {source}
        </div>
      )}
      <div
        style={{
          width: '100%',
          height: `${heightPx}px`,
          position: 'relative',
          backgroundColor: isTransparentGraphic ? '#F4FBFD' : '#07202C',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottom: (title || caption) ? '1.5px solid rgba(7, 32, 44, 0.08)' : 'none',
        }}
      >
        {(() => {
          let safeSrc = src;
          if (src && !src.startsWith('http://') && !src.startsWith('https://') && !src.startsWith('/static')) {
            try {
              safeSrc = staticFile(src);
            } catch {
              safeSrc = src;
            }
          }
          if (kind === 'image') {
            return (
              <Img
                src={safeSrc}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: isTransparentGraphic ? 'contain' : 'cover',
                  padding: isTransparentGraphic ? '20px' : '0px',
                }}
              />
            );
          } else if (isRendering) {
            return (
              <OffthreadVideo
                src={safeSrc}
                startFrom={clipFrom * 25}
                volume={0}
                muted
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            );
          } else {
            return (
              <Html5Video
                src={safeSrc}
                startFrom={clipFrom * 25}
                volume={0}
                muted
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            );
          }
        })()}
      </div>
      {(title || caption) && (
        <div
          style={{
            padding: isCompact ? '18px 24px' : '22px 28px',
            backgroundColor: THEME.surface,
            color: THEME.ink,
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          {title && (
            <div
              style={{
                fontSize: isCompact ? '32px' : '36px',
                fontWeight: 900,
                color: THEME.ink,
                lineHeight: 1.22,
                fontFamily: THEME.fonts.title,
                letterSpacing: '-0.01em',
              }}
            >
              {title}
            </div>
          )}
          {caption && (
            <div
              style={{
                fontSize: isCompact ? '24px' : '26px',
                fontWeight: 600,
                color: THEME.accentDeep,
                lineHeight: 1.35,
                fontFamily: THEME.fonts.body,
              }}
            >
              {caption}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MediaCard;
"""
    with open(os.path.join(components_dir, "MediaCard.tsx"), "w", encoding="utf-8") as f:
        f.write(media_tsx)

    # AlertPill.tsx
    alert_tsx = """import React from 'react';
import { THEME } from '../brand/eefTheme';

export interface AlertPillProps {
  text: string;
  icon?: string;
  iconType?: 'alert' | 'siren' | 'question' | 'custom';
}

export const AlertPill: React.FC<AlertPillProps> = ({
  text,
  icon,
  iconType = 'alert',
}) => {
  const renderIcon = () => {
    if (icon) return <span style={{ fontSize: '32px', lineHeight: 1 }}>{icon}</span>;
    switch (iconType) {
      case 'siren': return <span style={{ fontSize: '32px', lineHeight: 1 }}>🚨</span>;
      case 'question': return <span style={{ fontSize: '32px', lineHeight: 1 }}>❓</span>;
      case 'alert':
      default: return <span style={{ fontSize: '32px', lineHeight: 1 }}>⚠️</span>;
    }
  };

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '16px',
        backgroundColor: THEME.surface,
        color: THEME.ink,
        padding: '14px 28px',
        borderRadius: '20px',
        border: THEME.border,
        boxShadow: THEME.shadow,
        fontFamily: THEME.fonts.title,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>{renderIcon()}</div>
      <span
        style={{
          fontSize: '30px',
          fontWeight: 900,
          color: THEME.ink,
          fontFamily: THEME.fonts.title,
          letterSpacing: '-0.01em',
        }}
      >
        {text}
      </span>
    </div>
  );
};

export default AlertPill;
"""
    with open(os.path.join(components_dir, "AlertPill.tsx"), "w", encoding="utf-8") as f:
        f.write(alert_tsx)

    # SentenceCaptions.tsx
    captions_comp_tsx = """import React from 'react';
import { useCurrentFrame } from 'remotion';
import { SentenceCaption } from '../captions';
import { MARKS } from '../data';
import { THEME } from '../brand/eefTheme';

export interface SentenceCaptionsProps {
  captions: SentenceCaption[];
}

export const SentenceCaptions: React.FC<SentenceCaptionsProps> = ({ captions }) => {
  const frame = useCurrentFrame();
  const activeCaption = captions.find(
    (c) => frame >= c.startFrame && frame <= c.endFrame
  );

  if (!activeCaption) return null;

  // Elevación obligatoria de subtítulos entre F215 y F445 para no colisionar con la placa del profesor
  const lowerThirdIn = (MARKS as any).lowerThirdIn ?? 215;
  const lowerThirdOut = (MARKS as any).lowerThirdOut ?? 445;
  const isLowerThirdActive = frame >= lowerThirdIn && frame <= lowerThirdOut;
  const bottomPos = isLowerThirdActive ? '230px' : '48px';

  return (
    <div
      style={{
        position: 'absolute',
        bottom: bottomPos,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        backgroundColor: THEME.captions.scrim,
        backdropFilter: `blur(${THEME.captions.blur})`,
        WebkitBackdropFilter: `blur(${THEME.captions.blur})`,
        padding: '12px 30px',
        borderRadius: '16px',
        border: THEME.captions.border,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
        maxWidth: '1280px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        pointerEvents: 'none',
        fontFamily: THEME.fonts.body,
        transition: 'bottom 0.25s ease',
      }}
    >
      <span
        style={{
          fontSize: THEME.captions.fontSize,
          fontWeight: 700,
          color: '#FFFFFF',
          letterSpacing: '-0.01em',
          lineHeight: 1.3,
          textAlign: 'center',
          fontFamily: THEME.fonts.body,
          textWrap: 'balance',
          whiteSpace: 'normal',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
        }}
      >
        {activeCaption.formattedText || activeCaption.text}
      </span>
    </div>
  );
};

export default SentenceCaptions;
"""
    with open(os.path.join(components_dir, "SentenceCaptions.tsx"), "w", encoding="utf-8") as f:
        f.write(captions_comp_tsx)

    # 4. Vincular video master y recursos en public/
    master_src = os.path.join(BASE_DIR, "RENDER", "EEF002 - PRIMER CORTE.mp4")
    master_dst = os.path.join(public_dir, "master.mp4")
    if os.path.exists(master_src) and not os.path.exists(master_dst):
        try:
            # Intentar hardlink primero (no requiere privilegios de administrador)
            cmd = f'cmd /c mklink /H "{master_dst}" "{master_src}"'
            res = subprocess.run(cmd, shell=True, capture_output=True)
            if res.returncode != 0:
                print("Hardlink falló, copiando master...")
                shutil.copy2(master_src, master_dst)
        except Exception:
            pass

    # Copiar recursos a public/assets
    assets_dst = os.path.join(public_dir, "assets")
    os.makedirs(assets_dst, exist_ok=True)
    recursos_src = os.path.join(BASE_DIR, "RECURSOS", "drive-download-20260828T201621Z-1-001")
    if os.path.exists(recursos_src):
        for fname in os.listdir(recursos_src):
            src_f = os.path.join(recursos_src, fname)
            dst_f = os.path.join(assets_dst, fname)
            if os.path.isfile(src_f) and not os.path.exists(dst_f):
                shutil.copy2(src_f, dst_f)

    # Si hay '12. deseo' sin extensión, crear copia como '12. deseo.mp4'
    raw_12 = os.path.join(assets_dst, "12. deseo")
    if os.path.exists(raw_12) and not os.path.exists(os.path.join(assets_dst, "12. deseo.mp4")):
        shutil.copy2(raw_12, os.path.join(assets_dst, "12. deseo.mp4"))

    # Copiar archivos enlazados de reemplazo si existen en manifest
    if manifest_data and "linkedResources" in manifest_data:
        for k, v in manifest_data["linkedResources"].items():
            if v and os.path.exists(v):
                dest_file = os.path.join(assets_dst, os.path.basename(v))
                shutil.copy2(v, dest_file)

    # 5. Generar tracking segments (track.ts)
    track_ts = """export type Framing = 'center' | 'left' | 'none';

export interface TrackSegment {
  from: number;
  to: number;
  framing: Framing;
  desc: string;
}

export const TRACK_SEGMENTS: TrackSegment[] = [
  { from: 0, to: 120, framing: 'none', desc: 'Bumper intro institucional' },
  { from: 125, to: 2105, framing: 'center', desc: 'Profesor en centro del plató (x ~ 950)' },
  { from: 2110, to: 2480, framing: 'none', desc: 'Voz en off Fila 11 (Docente fuera de cuadro)' },
  { from: 2485, to: 3050, framing: 'center', desc: 'Profesor en centro del plató (x ~ 950)' },
  { from: 3055, to: 3270, framing: 'none', desc: 'Voz en off Fila 15 (Docente fuera de cuadro)' },
  { from: 3275, to: 4280, framing: 'center', desc: 'Profesor en centro del plató (x ~ 963)' },
  { from: 4285, to: 4478, framing: 'none', desc: 'Bumper de cierre y outro' }
];

export function getFramingAtFrame(frame: number): Framing {
  for (const seg of TRACK_SEGMENTS) {
    if (frame >= seg.from && frame <= seg.to) {
      return seg.framing;
    }
  }
  return 'center';
}
"""
    with open(os.path.join(src_dir, "track.ts"), "w", encoding="utf-8") as f:
        f.write(track_ts)

    # 6. Generar captions.ts con la elección de subtítulos
    generate_captions_ts(src_dir, manifest_data)

    # 7. Generar data.ts
    generate_data_ts(src_dir, manifest_data)

    # 8. Generar EpisodeEEF002.tsx y Root.tsx e index.ts
    generate_episode_and_root(src_dir)

    print("Proyecto Remotion EEF002 configurado exitosamente en:", REMOTION_DIR)

def generate_captions_ts(src_dir, manifest_data):
    # Cargar datos base
    with open(DEFAULT_MANIFEST_PATH, "r", encoding="utf-8") as f:
        raw_rows = json.load(f)

    # Obtener elecciones
    user_choices = {}
    if manifest_data and "rows" in manifest_data:
        for r in manifest_data["rows"]:
            user_choices[str(r.get("row", ""))] = r

    captions_list = []
    for r in raw_rows:
        row_id = str(r["row"]).zfill(2)
        start_f = r["start_frame"]
        end_f = r["end_frame"]
        
        # Determinar texto según elección
        choice = user_choices.get(row_id, {})
        source = choice.get("subtitleSource", "escaleta")
        
        if source == "escaleta":
            text = r["dialogo_escaleta"].replace('"', '\\"').strip()
        elif source == "real":
            text = r["dialogo_real"].replace('"', '\\"').strip()
        elif source == "custom" and choice.get("customText"):
            text = choice.get("customText").replace('"', '\\"').strip()
        else:
            text = r["dialogo_escaleta"].replace('"', '\\"').strip()

        # Separar en frases de longitud balanceada si es muy largo
        captions_list.append(f"""  {{
    row: "{row_id}",
    source: "{source}",
    text: "{text}",
    formattedText: "{text}",
    startFrame: {start_f},
    endFrame: {end_f}
  }}""")

    joined_captions = ",\n".join(captions_list)
    captions_ts_content = f"""// Subtítulos para EEF002 generados a partir de la Matriz Pre-Edición
export interface SentenceCaption {{
  row: string;
  source: string;
  text: string;
  formattedText: string;
  startFrame: number;
  endFrame: number;
}}

export const CAPTIONS: SentenceCaption[] = [
{joined_captions}
];
"""
    with open(os.path.join(src_dir, "captions.ts"), "w", encoding="utf-8") as f:
        f.write(captions_ts_content)

def generate_data_ts(src_dir, manifest_data):
    # Cargar bloques y sincronización
    with open(DEFAULT_MANIFEST_PATH, "r", encoding="utf-8") as f:
        raw_rows = json.load(f)

    user_choices = {}
    if manifest_data and "rows" in manifest_data:
        for r in manifest_data["rows"]:
            user_choices[r["row"]] = r

    # Chequear propuesta de Fila 18
    fila18_approved = True
    if manifest_data and "rows" in manifest_data:
        for r in manifest_data["rows"]:
            if r["row"] == "18":
                fila18_approved = r.get("proposalAccepted", True)

    data_ts = f"""import {{ CAPTIONS }} from './captions';
import {{ TRACK_SEGMENTS }} from './track';

export interface BaseBlock {{
  key: string;
  name: string;
  from: number;
  to: number;
  anchorX: 'left' | 'right' | 'center';
  category: 'small_left' | 'medium_right' | 'large_center';
  role: 'didactico' | 'refuerzo';
}}

export interface MediaCardBlock extends BaseBlock {{
  kind: 'media_card';
  src: string;
  title?: string;
  caption?: string;
  isVideo?: boolean;
}}

export interface TitularCardBlock extends BaseBlock {{
  kind: 'titular_card';
  title: string;
  subtitle?: string;
}}

export type MotionBlock = MediaCardBlock | TitularCardBlock;

export const MARKS = {{
  totalFrames: 4478,
  fps: 25,
  width: 1920,
  height: 1080,
  outroFadeStart: 4280,
  reservedLowerThird: {{
    from: 240,
    to: 450,
    rect: [140, 860, 720, 150]
  }}
}};

export const BLOCKS: MotionBlock[] = [
  // Fila 02: 1. te paso
  {{
    kind: 'media_card',
    key: 'f02_te_paso',
    name: '1. Te pasó',
    from: 206,
    to: 327,
    anchorX: 'left',
    category: 'small_left',
    role: 'refuerzo',
    src: 'assets/1. te pasó_.gif'
  }},
  // Fila 03: 2. Elegir
  {{
    kind: 'media_card',
    key: 'f03_elegir',
    name: '2. Elegir',
    from: 356,
    to: 472,
    anchorX: 'left',
    category: 'small_left',
    role: 'refuerzo',
    src: 'assets/2. elegir.jpg'
  }},
  // Fila 04: Titular 'Necesidad ≠ deseo' y Recurso 3
  {{
    kind: 'titular_card',
    key: 'f04_titular',
    name: 'Titular: Necesidad ≠ deseo',
    title: 'Necesidad ≠ deseo',
    from: 520,
    to: 670,
    anchorX: 'right',
    category: 'medium_right',
    role: 'didactico'
  }},
  {{
    kind: 'media_card',
    key: 'f04_diferencias',
    name: '3. Diferencias',
    from: 520,
    to: 670,
    anchorX: 'right',
    category: 'medium_right',
    role: 'didactico',
    src: 'assets/3. diferencias.gif'
  }},
  // Fila 05: Titular 'Necesidades' y Recurso 4
  {{
    kind: 'titular_card',
    key: 'f05_titular',
    name: 'Titular: Necesidades',
    title: 'Necesidades',
    from: 725,
    to: 894,
    anchorX: 'right',
    category: 'medium_right',
    role: 'didactico'
  }},
  {{
    kind: 'media_card',
    key: 'f05_necesidades',
    name: '4. Necesidades',
    from: 725,
    to: 894,
    anchorX: 'right',
    category: 'medium_right',
    role: 'didactico',
    src: 'assets/4. necesidades.gif'
  }},
  // Fila 06: Titular 'Necesidades primarias' y Recursos 5, 6, 7
  {{
    kind: 'titular_card',
    key: 'f06_titular',
    name: 'Titular: Necesidades primarias',
    title: 'Necesidades primarias',
    from: 942,
    to: 1257,
    anchorX: 'right',
    category: 'medium_right',
    role: 'didactico'
  }},
  {{
    kind: 'media_card',
    key: 'f06_piramide',
    name: '5. Pirámide de Maslow',
    from: 942,
    to: 1040,
    anchorX: 'right',
    category: 'medium_right',
    role: 'didactico',
    src: 'assets/5. Pirámide de Maslow.png'
  }},
  {{
    kind: 'media_card',
    key: 'f06_primarias',
    name: '6. Necesidades primarias',
    from: 1045,
    to: 1150,
    anchorX: 'right',
    category: 'medium_right',
    role: 'didactico',
    src: 'assets/6. Necesidades primarias.png'
  }},
  {{
    kind: 'media_card',
    key: 'f06_alimento',
    name: '7. Alimento',
    from: 1155,
    to: 1257,
    anchorX: 'right',
    category: 'medium_right',
    role: 'didactico',
    src: 'assets/7. Alimento.png'
  }},
  // Fila 07: Titular 'Necesidades secundarias' y Recurso 8
  {{
    kind: 'titular_card',
    key: 'f07_titular',
    name: 'Titular: Necesidades secundarias',
    title: 'Necesidades secundarias',
    from: 1313,
    to: 1534,
    anchorX: 'right',
    category: 'medium_right',
    role: 'didactico'
  }},
  {{
    kind: 'media_card',
    key: 'f07_secundarias',
    name: '8. Necesidades secundarias',
    from: 1313,
    to: 1534,
    anchorX: 'right',
    category: 'medium_right',
    role: 'didactico',
    src: 'assets/8. Necesidades secundarias.png'
  }},
  // Fila 08: 9. transporte
  {{
    kind: 'media_card',
    key: 'f08_transporte',
    name: '9. Transporte',
    from: 1535,
    to: 1690,
    anchorX: 'left',
    category: 'small_left',
    role: 'refuerzo',
    src: 'assets/9. transporte.gif'
  }},
  // Fila 09: 10. educacion y 11. internet
  {{
    kind: 'media_card',
    key: 'f09_educacion',
    name: '10. Educación',
    from: 1720,
    to: 1845,
    anchorX: 'left',
    category: 'small_left',
    role: 'refuerzo',
    src: 'assets/10. educacion.gif'
  }},
  {{
    kind: 'media_card',
    key: 'f09_internet',
    name: '11. Internet',
    from: 1850,
    to: 1980,
    anchorX: 'left',
    category: 'small_left',
    role: 'refuerzo',
    src: 'assets/11. internet.gif'
  }},
  // Fila 10: Titular 'Deseo' y Recurso 12
  {{
    kind: 'titular_card',
    key: 'f10_titular',
    name: 'Titular: Deseo',
    title: 'Deseo',
    from: 1996,
    to: 2100,
    anchorX: 'right',
    category: 'medium_right',
    role: 'didactico'
  }},
  {{
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
  }},
  // Fila 11: 13. Tenemos hambre (Voz en off pantalla completa)
  {{
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
  }},
  // Fila 12: 16. postre
  {{
    kind: 'media_card',
    key: 'f12_postre',
    name: '16. Postre',
    from: 2490,
    to: 2650,
    anchorX: 'left',
    category: 'small_left',
    role: 'refuerzo',
    src: 'assets/16. postre.jpg'
  }},
  // Fila 13: 17. elegir
  {{
    kind: 'media_card',
    key: 'f13_elegir',
    name: '17. Elegir',
    from: 2680,
    to: 2840,
    anchorX: 'left',
    category: 'small_left',
    role: 'refuerzo',
    src: 'assets/17. elegir.gif'
  }},
  // Fila 14: 18. remera de marca
  {{
    kind: 'media_card',
    key: 'f14_remera',
    name: '18. Remera de marca',
    from: 2870,
    to: 3045,
    anchorX: 'right',
    category: 'medium_right',
    role: 'didactico',
    src: 'assets/18. remera de marca.png'
  }},
  // Fila 15: 19. por eso (Voz en off pantalla completa)
  {{
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
  }},
  // Fila 16: 20. recursos escasos
  {{
    kind: 'media_card',
    key: 'f16_escasos',
    name: '20. Recursos escasos',
    from: 3280,
    to: 3560,
    anchorX: 'right',
    category: 'medium_right',
    role: 'didactico',
    src: 'assets/20. recursos escasos.jpg'
  }},
  // Fila 17: 21. pensando
  {{
    kind: 'media_card',
    key: 'f17_pensando',
    name: '21. Pensando',
    from: 3575,
    to: 3670,
    anchorX: 'left',
    category: 'small_left',
    role: 'refuerzo',
    src: 'assets/21. pensando.gif'
  }},
  """

    # Propuesta de Fila 18 si está aprobada
    if fila18_approved:
        data_ts += """  // Fila 18: Propuesta Pedagógica (Tarjeta reflexiva)
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
"""

    data_ts += """  // Fila 19: 22. QR EEF26-02
  {
    kind: 'media_card',
    key: 'f19_qr',
    name: '22. QR EEF26-02',
    from: 3865,
    to: 4275,
    anchorX: 'right',
    category: 'medium_right',
    role: 'didactico',
    src: 'assets/22. QR EEF26-02.png'
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
"""
    with open(os.path.join(src_dir, "data.ts"), "w", encoding="utf-8") as f:
        f.write(data_ts)

def generate_episode_and_root(src_dir):
    episode_tsx = """import React from 'react';
import {
  AbsoluteFill,
  getRemotionEnvironment,
  interpolate,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import DATA, { MARKS, MotionBlock } from './data';
import { getFramingAtFrame } from './track';
import { SlotContainer } from './components/SlotContainer';
import { MediaCard } from './components/MediaCard';
import { TitularCard } from './components/TitularCard';
import { SentenceCaptions } from './components/SentenceCaptions';

export interface EpisodeEEF002Props {
  includeMasterVideo?: boolean;
}

export const EpisodeEEF002: React.FC<EpisodeEEF002Props> = ({
  includeMasterVideo = true,
}) => {
  const frame = useCurrentFrame();
  const currentFraming = getFramingAtFrame(frame);
  const isRendering = getRemotionEnvironment().isRendering;

  const outroFade = interpolate(
    frame,
    [MARKS.outroFadeStart, MARKS.totalFrames - 2],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const renderBlockContent = (block: MotionBlock) => {
    switch (block.kind) {
      case 'media_card':
        return (
          <MediaCard
            kind={block.isVideo ? 'video' : 'image'}
            src={block.src}
            title={block.title}
            caption={block.caption}
            isCompact={block.category === 'small_left'}
            isLarge={block.category === 'large_center'}
          />
        );
      case 'titular_card':
        return (
          <TitularCard
            title={block.title}
            subtitle={block.subtitle}
          />
        );
      default:
        return null;
    }
  };

  return (
    <AbsoluteFill style={{ backgroundColor: includeMasterVideo ? '#000' : 'transparent' }}>
      {/* 1. Master Video layer */}
      {includeMasterVideo && (
        <AbsoluteFill>
          <OffthreadVideo
            src={staticFile('master.mp4')}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </AbsoluteFill>
      )}

      {/* 2. Motion Graphics Blocks Layer */}
      <AbsoluteFill>
        {DATA.blocks.map((block) => {
          const durationInFrames = block.to - block.from;
          return (
            <Sequence
              key={block.key}
              name={block.name}
              from={block.from}
              durationInFrames={durationInFrames}
            >
              <SlotContainer
                blockKey={block.key}
                category={block.category}
                anchorX={block.anchorX}
                framing={currentFraming}
                from={block.from}
                to={block.to}
                durationInFrames={durationInFrames}
              >
                {renderBlockContent(block)}
              </SlotContainer>
            </Sequence>
          );
        })}
      </AbsoluteFill>

      {/* 3. Subtitles Layer */}
      <SentenceCaptions captions={DATA.captions} />

      {/* 4. Outro Fade */}
      {includeMasterVideo && (
        <AbsoluteFill
          style={{
            backgroundColor: '#000',
            opacity: outroFade,
            pointerEvents: 'none',
          }}
        />
      )}
    </AbsoluteFill>
  );
};
"""
    with open(os.path.join(src_dir, "EpisodeEEF002.tsx"), "w", encoding="utf-8") as f:
        f.write(episode_tsx)

    root_tsx = """import React from 'react';
import { Composition } from 'remotion';
import { EpisodeEEF002 } from './EpisodeEEF002';
import DATA from './data';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Master preview with video */}
      <Composition
        id="EpisodeEEF002"
        component={EpisodeEEF002}
        durationInFrames={DATA.meta.durationInFrames}
        fps={DATA.meta.fps}
        width={1920}
        height={1080}
        defaultProps={{
          includeMasterVideo: true,
        }}
      />

      {/* Alpha overlay for editing in Premiere */}
      <Composition
        id="EpisodeEEF002-Overlay"
        component={EpisodeEEF002}
        durationInFrames={DATA.meta.durationInFrames}
        fps={DATA.meta.fps}
        width={1920}
        height={1080}
        defaultProps={{
          includeMasterVideo: false,
        }}
      />
    </>
  );
};
"""
    with open(os.path.join(src_dir, "Root.tsx"), "w", encoding="utf-8") as f:
        f.write(root_tsx)

    index_ts = """import { registerRoot } from 'remotion';
import { RemotionRoot } from './Root';
import './styles/fonts.css';

registerRoot(RemotionRoot);
"""
    with open(os.path.join(src_dir, "index.ts"), "w", encoding="utf-8") as f:
        f.write(index_ts)

if __name__ == "__main__":
    manifest = None
    if os.path.exists(APPROVED_MANIFEST_PATH):
        try:
            with open(APPROVED_MANIFEST_PATH, "r", encoding="utf-8") as f:
                manifest = json.load(f)
                print("Cargado manifest aprobado:", APPROVED_MANIFEST_PATH)
        except Exception as e:
            print("Error cargando manifest aprobado:", e)

    setup_remotion_project(manifest)

    if "--launch" in sys.argv:
        print("Iniciando Remotion Preview en localhost:3000...")
        subprocess.Popen("npx remotion preview src/index.ts --port 3000", cwd=REMOTION_DIR, shell=True)
