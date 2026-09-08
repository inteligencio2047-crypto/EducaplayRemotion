import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.resolve(__dirname, '..');
const outDir = path.join(baseDir, 'out/stills');

fs.mkdirSync(outDir, { recursive: true });

const stills = [
  { frame: 270, name: 'amb26_02_f0270_recurso1_chaque_el_agua.png' },
  { frame: 350, name: 'amb26_02_f0350_lt_elevated_subtitles.png' },
  { frame: 470, name: 'amb26_02_f0470_recurso2_mitos.png' },
  { frame: 580, name: 'amb26_02_f0580_mito1_video_lluvia.png' },
  { frame: 1020, name: 'amb26_02_f1020_ciudad_escurrimiento.png' },
  { frame: 1280, name: 'amb26_02_f1280_humedales_esponja.png' },
  { frame: 1480, name: 'amb26_02_f1480_mito2_inundaciones_repentinas.png' },
  { frame: 1780, name: 'amb26_02_f1780_cuidado_desagues_basura.png' },
  { frame: 1990, name: 'amb26_02_f1990_via_publica_plasticos.png' },
  { frame: 2150, name: 'amb26_02_f2150_mito3_titular.png' },
  { frame: 2300, name: 'amb26_02_f2300_calle_inundada.png' },
  { frame: 2500, name: 'amb26_02_f2500_trampas_ocultas_peligro.png' },
  { frame: 2730, name: 'amb26_02_f2730_mito4_titular.png' },
  { frame: 3000, name: 'amb26_02_f3000_amenazas_postlluvia_action.png' },
  { frame: 3500, name: 'amb26_02_f3500_mito5_ficcion_pura.png' },
  { frame: 3820, name: 'amb26_02_f3820_actividad_humana_calentamiento.png' },
  { frame: 4000, name: 'amb26_02_f4000_fenomeno_el_nino.png' },
  { frame: 4220, name: 'amb26_02_f4220_cierre_institucional.png' },
];

console.log(`Generating ${stills.length} comprehensive verification stills for AMB26-02...\n`);

for (const s of stills) {
  const outPath = path.join(outDir, s.name);
  console.log(`Rendering frame ${s.frame} -> ${s.name}...`);
  try {
    execSync(
      `npx remotion still EpisodeAMB2602 "${outPath}" --frame=${s.frame} --props="{}"`,
      {
        cwd: baseDir,
        stdio: 'inherit',
      }
    );
  } catch (err) {
    console.error(`Error rendering frame ${s.frame}:`, err.message);
  }
}

console.log(`\n🎉 All stills generated successfully in: ${outDir}`);
