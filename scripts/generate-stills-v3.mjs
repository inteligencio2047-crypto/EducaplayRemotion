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
  { frame: 844, name: '01_subtitles_elevated_f844.png' },
  { frame: 890, name: '02_subtitles_elevated_f890.png' },
  { frame: 905, name: '03_subtitles_descended_f905.png' },
  { frame: 1150, name: '04_news_low_280px_f1150.png' },
  { frame: 2200, name: '05_checklist_low_280px_f2200.png' },
  { frame: 3500, name: '06_action_low_280px_f3500.png' },
  { frame: 4200, name: '07_protocol_low_280px_f4200.png' },
];

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
