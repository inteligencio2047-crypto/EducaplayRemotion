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
  { frame: 350, name: '01_amb2_subtitles_elevated_f350.png' },
  { frame: 470, name: '02_amb2_subtitles_descended_f470.png' },
  { frame: 700, name: '03_amb2_mito1_rain_f700.png' },
  { frame: 1100, name: '04_amb2_humedales_left_f1100.png' },
  { frame: 1550, name: '05_amb2_mito2_flashflood_f1550.png' },
  { frame: 1900, name: '06_amb2_basura_left_f1900.png' },
  { frame: 2300, name: '07_amb2_mito3_calle_f2300.png' },
  { frame: 2600, name: '08_amb2_peligro_left_f2600.png' },
  { frame: 2900, name: '09_amb2_mito4_amenazas_f2900.png' },
  { frame: 3250, name: '10_amb2_riesgos_left_f3250.png' },
  { frame: 3600, name: '11_amb2_mito5_ficcion_f3600.png' },
  { frame: 3950, name: '12_amb2_calentamiento_left_f3950.png' },
  { frame: 4250, name: '13_amb2_cierre_f4250.png' },
];

console.log(`Generating ${stills.length} verification stills for AMB26-02...\n`);

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

console.log(`\n🎉 Stills generated in: ${outDir}`);
