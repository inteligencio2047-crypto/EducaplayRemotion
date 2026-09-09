export type Framing = 'center' | 'left' | 'none';

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
