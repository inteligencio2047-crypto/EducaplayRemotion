import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.resolve(__dirname, '..');

console.log('=== EDUCAPLAY REMOTION LAYOUT & CONTRAST CHECKER (AMB26-02) ===\n');

// 1. Check fonts
const fontsCss = fs.readFileSync(path.join(baseDir, 'src/styles/fonts.css'), 'utf-8');
const hasMuseo = fontsCss.includes("font-family: 'Museo'") || fontsCss.includes('font-family: "Museo"');
const hasMuseoSans = fontsCss.includes("font-family: 'Museo Sans'") || fontsCss.includes('font-family: "Museo Sans"');

if (hasMuseo && hasMuseoSans) {
  console.log('✅ Fonts: Museo and Museo Sans embedded properly in fonts.css');
} else {
  console.error('❌ Fonts: Missing Museo or Museo Sans font definition!');
  process.exit(1);
}

// 2. Load DATA and TRACK_SEGMENTS
const dataTs = fs.readFileSync(path.join(baseDir, 'src/data.ts'), 'utf-8');
const trackTs = fs.readFileSync(path.join(baseDir, 'src/track.ts'), 'utf-8');

// Extract tracking segments JSON
const trackMatch = trackTs.match(/export const TRACK_SEGMENTS: TrackSegment\[\] = (\[[\s\S]*?\]);/);
if (!trackMatch) {
  console.error('❌ Could not parse TRACK_SEGMENTS from track.ts');
  process.exit(1);
}
const trackSegments = JSON.parse(trackMatch[1]);
console.log(`✅ Loaded ${trackSegments.length} tracking segments from track.ts.`);

// 3. Lower Third Clearance Check (AMB26-02 LowerThird active F250 to F460)
const captionsTs = fs.readFileSync(path.join(baseDir, 'src/components/SentenceCaptions.tsx'), 'utf-8');
if (captionsTs.includes('frame >= 250 && frame <= 460') && captionsTs.includes("'220px'")) {
  console.log('✅ Subtitle LowerThird Clearance: Subtitles elevate to bottom: 220px from F250 to F460 (Prof. Amparo Pérez Rueda).');
} else {
  console.error('❌ Subtitle LowerThird Clearance check failed in SentenceCaptions.tsx!');
  process.exit(1);
}

// 4. Accent Color & Subject Identity
if (dataTs.includes("accentColor: '#10BA1B'") && dataTs.includes("subjectShort: 'AMBIENTE'")) {
  console.log('✅ Accent Color: #10BA1B (Verde Ambiente) correctly configured for AMB26-02.');
} else {
  console.error('❌ Brand Identity: Missing #10BA1B accentColor or AMBIENTE subjectShort!');
  process.exit(1);
}

// 5. Fade-Out and Spring Animation
const slotTs = fs.readFileSync(path.join(baseDir, 'src/components/SlotContainer.tsx'), 'utf-8');
if (slotTs.includes('durationInFrames - 12') && slotTs.includes('stiffness: 90')) {
  console.log('✅ SlotContainer: Verified 12-frame fade-out & physics-based spring entrance.');
} else {
  console.error('❌ SlotContainer: Missing 12-frame fade-out or spring configuration!');
  process.exit(1);
}

// 6. Sound Effects Assets Check
const audioDir = path.join(baseDir, 'public/audio');
if (
  fs.existsSync(path.join(audioDir, 'whoosh_in.wav')) &&
  fs.existsSync(path.join(audioDir, 'whoosh_out.wav')) &&
  fs.existsSync(path.join(audioDir, 'pop.wav'))
) {
  console.log('✅ Audio SFX: Verified entry and exit sound effects in public/audio/');
} else {
  console.error('❌ Audio SFX: Missing whoosh_in.wav, whoosh_out.wav or pop.wav!');
  process.exit(1);
}

console.log('\n🎉 ALL CHECKS PASSED SUCCESSFULLY FOR AMB26-02!');
