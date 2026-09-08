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
  { frame: 350, name: '01_intro_3_equal_f350.png' },
  { frame: 600, name: '02_subtitles_elevated_f600.png' },
  { frame: 780, name: '03_subtitles_descended_f780.png' },
  { frame: 760, name: '04_phone_left_f760.png' },
  { frame: 1000, name: '05_news_right_280px_f1000.png' },
  { frame: 1350, name: '06_mochila_left_f1350.png' },
  { frame: 2100, name: '07_checklist_right_280px_f2100.png' },
  { frame: 2950, name: '08_concept_left_f2950.png' },
  { frame: 3450, name: '09_action_right_280px_f3450.png' },
  { frame: 4050, name: '10_protocol_right_280px_f4050.png' },
];

console.log(`Generating ${stills.length} verification stills for corrected cut...\n`);

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
