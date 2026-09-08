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
  { frame: 350, name: 'mobile_subtitles_elevated_f350.png' },
  { frame: 580, name: 'mobile_mito1_video_epigrafe_f580.png' },
  { frame: 1100, name: 'mobile_humedales_card_f1100.png' },
  { frame: 2300, name: 'mobile_calle_epigrafe_f2300.png' },
  { frame: 2600, name: 'mobile_peligro_active_f2600.png' },
  { frame: 2685, name: 'mobile_peligro_exited_f2685.png' },
  { frame: 2693, name: 'mobile_frame_2693_clean.png' },
  { frame: 3250, name: 'mobile_action_card_f3250.png' },
];

console.log(`Generating ${stills.length} mobile readability verification stills...\n`);

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

console.log(`\n🎉 Mobile verification stills generated in: ${outDir}`);
