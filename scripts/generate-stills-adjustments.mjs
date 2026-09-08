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
  { frame: 580, name: 'check_1a_active_f580.png' },
  { frame: 635, name: 'check_1a_exited_f635.png' },
  { frame: 1480, name: 'check_2a_active_f1480.png' },
  { frame: 1525, name: 'check_2a_exited_f1525.png' },
  { frame: 2200, name: 'check_3a_active_f2200.png' },
  { frame: 2240, name: 'check_3a_exited_f2240.png' },
  { frame: 2790, name: 'check_4a_active_f2790.png' },
  { frame: 2825, name: 'check_4a_exited_f2825.png' },
  { frame: 3540, name: 'check_5a_active_f3540.png' },
  { frame: 3590, name: 'check_5a_exited_f3590.png' },
  { frame: 4250, name: 'check_6_active_f4250.png' },
  { frame: 4300, name: 'check_6_exited_f4300.png' },
];

console.log(`Generating ${stills.length} verification stills for adjusted blocks...\n`);

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
