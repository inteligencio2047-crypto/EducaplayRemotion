// Presenter tracking for AMB26-02 - PRIMER CORTE.mp4
export type Framing = 'left' | 'center' | 'right' | 'none';

export type TrackSegment = {
  framing: Framing;
  from: number;
  to: number;
  fromTime: number;
  toTime: number;
};

export const LOWER_THIRD_BOUNDS = { startFrame: 75, endFrame: 4401 };

export const TRACK_SEGMENTS: TrackSegment[] = [
  {
    "framing": "center",
    "from": 0,
    "to": 266,
    "fromTime": 0.0,
    "toTime": 11.094
  },
  {
    "framing": "right",
    "from": 267,
    "to": 347,
    "fromTime": 11.136,
    "toTime": 14.473
  },
  {
    "framing": "left",
    "from": 348,
    "to": 394,
    "fromTime": 14.514,
    "toTime": 16.433
  },
  {
    "framing": "center",
    "from": 395,
    "to": 495,
    "fromTime": 16.475,
    "toTime": 20.646
  },
  {
    "framing": "left",
    "from": 496,
    "to": 585,
    "fromTime": 20.687,
    "toTime": 24.399
  },
  {
    "framing": "center",
    "from": 586,
    "to": 620,
    "fromTime": 24.441,
    "toTime": 25.859
  },
  {
    "framing": "right",
    "from": 621,
    "to": 665,
    "fromTime": 25.901,
    "toTime": 27.736
  },
  {
    "framing": "center",
    "from": 666,
    "to": 904,
    "fromTime": 27.778,
    "toTime": 37.704
  },
  {
    "framing": "right",
    "from": 905,
    "to": 984,
    "fromTime": 37.746,
    "toTime": 41.041
  },
  {
    "framing": "center",
    "from": 985,
    "to": 1224,
    "fromTime": 41.083,
    "toTime": 51.051
  },
  {
    "framing": "right",
    "from": 1225,
    "to": 1311,
    "fromTime": 51.093,
    "toTime": 54.68
  },
  {
    "framing": "center",
    "from": 1312,
    "to": 1391,
    "fromTime": 54.721,
    "toTime": 58.016
  },
  {
    "framing": "left",
    "from": 1392,
    "to": 1509,
    "fromTime": 58.058,
    "toTime": 62.938
  },
  {
    "framing": "center",
    "from": 1510,
    "to": 1543,
    "fromTime": 62.98,
    "toTime": 64.356
  },
  {
    "framing": "right",
    "from": 1544,
    "to": 1623,
    "fromTime": 64.398,
    "toTime": 67.693
  },
  {
    "framing": "center",
    "from": 1624,
    "to": 1862,
    "fromTime": 67.734,
    "toTime": 77.661
  },
  {
    "framing": "right",
    "from": 1863,
    "to": 1939,
    "fromTime": 77.703,
    "toTime": 80.872
  },
  {
    "framing": "center",
    "from": 1940,
    "to": 2085,
    "fromTime": 80.914,
    "toTime": 86.962
  },
  {
    "framing": "left",
    "from": 2086,
    "to": 2182,
    "fromTime": 87.004,
    "toTime": 91.008
  },
  {
    "framing": "center",
    "from": 2183,
    "to": 2227,
    "fromTime": 91.049,
    "toTime": 92.884
  },
  {
    "framing": "right",
    "from": 2228,
    "to": 2262,
    "fromTime": 92.926,
    "toTime": 94.344
  },
  {
    "framing": "center",
    "from": 2263,
    "to": 2501,
    "fromTime": 94.386,
    "toTime": 104.313
  },
  {
    "framing": "right",
    "from": 2502,
    "to": 2581,
    "fromTime": 104.354,
    "toTime": 107.649
  },
  {
    "framing": "center",
    "from": 2582,
    "to": 2679,
    "fromTime": 107.691,
    "toTime": 111.737
  },
  {
    "framing": "left",
    "from": 2680,
    "to": 2785,
    "fromTime": 111.778,
    "toTime": 116.158
  },
  {
    "framing": "center",
    "from": 2786,
    "to": 2820,
    "fromTime": 116.199,
    "toTime": 117.617
  },
  {
    "framing": "right",
    "from": 2821,
    "to": 2900,
    "fromTime": 117.659,
    "toTime": 120.954
  },
  {
    "framing": "center",
    "from": 2901,
    "to": 3140,
    "fromTime": 120.996,
    "toTime": 130.964
  },
  {
    "framing": "right",
    "from": 3141,
    "to": 3220,
    "fromTime": 131.006,
    "toTime": 134.301
  },
  {
    "framing": "center",
    "from": 3221,
    "to": 3411,
    "fromTime": 134.343,
    "toTime": 142.267
  },
  {
    "framing": "left",
    "from": 3412,
    "to": 3459,
    "fromTime": 142.309,
    "toTime": 144.269
  },
  {
    "framing": "center",
    "from": 3460,
    "to": 3536,
    "fromTime": 144.311,
    "toTime": 147.481
  },
  {
    "framing": "left",
    "from": 3537,
    "to": 3575,
    "fromTime": 147.522,
    "toTime": 149.107
  },
  {
    "framing": "center",
    "from": 3576,
    "to": 3779,
    "fromTime": 149.149,
    "toTime": 157.616
  },
  {
    "framing": "right",
    "from": 3780,
    "to": 3856,
    "fromTime": 157.657,
    "toTime": 160.827
  },
  {
    "framing": "center",
    "from": 3857,
    "to": 4098,
    "fromTime": 160.869,
    "toTime": 170.921
  },
  {
    "framing": "right",
    "from": 4099,
    "to": 4178,
    "fromTime": 170.962,
    "toTime": 174.257
  },
  {
    "framing": "center",
    "from": 4179,
    "to": 4460,
    "fromTime": 174.299,
    "toTime": 186.019
  }
];

export const getFramingAtFrame = (frame: number): Framing => {
  for (const seg of TRACK_SEGMENTS) {
    if (frame >= seg.from && frame <= seg.to) return seg.framing;
  }
  return 'center';
};
