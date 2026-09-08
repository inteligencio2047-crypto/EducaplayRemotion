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
  { frame: 350, name: '01_intro_collage_f350.png' },
  { frame: 890, name: '02_phone_left_compact_f890.png' },
  { frame: 1150, name: '03_news_clarin_low_f1150.png' },
  { frame: 1500, name: '04_mochila_left_compact_f1500.png' },
  { frame: 2200, name: '05_checklist_low_f2200.png' },
  { frame: 3150, name: '06_concept_left_f3150.png' },
  { frame: 3500, name: '07_action_hogar_low_f3500.png' },
  { frame: 4200, name: '08_protocol_inundacion_low_f4200.png' },
  { frame: 4350, name: '09_subtitles_evacuar_f4350.png' },
  { frame: 4620, name: '10_subtitles_riesgos_f4620.png' },
  { frame: 4740, name: '11_sticker_conclusion_f4740.png' },
];

console.log(`Generating ${stills.length} verification stills with Remotion...\n`);

for (const s of stills) {
  const outPath = path.join(outDir, s.name);
  console.log(`Rendering frame ${s.frame} -> ${s.name}...`);
  try {
    execSync(
      `npx remotion still EpisodeAMB2601 "${outPath}" --frame=${s.frame} --props="{}"`,
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
