/**
 * Longhorn Aurora XAML to HTML5 Canvas - Perfect Replica
 * Based on exact XAML analysis
 */

export interface ColorTheme {
  id: string;
  name: string;
  background: {
    base: string[];
    animated1: string[];
    animated2: string[];
    overlay: string[];
  };
  rays: string;
  accent: string;
}

export const COLOR_THEMES: ColorTheme[] = [
  {
    id: 'original',
    name: 'Original Aurora',
    background: {
      base: ['#FF675BE6', '#ADA182EC', '#FF2212CB', '#F4C800A3'],
      animated1: ['#00000000', '#FFFF6868', '#00000000', '#FF131028'],
      animated2: ['#EE000000', '#00000000', '#FFD400FF', '#00000000'],
      overlay: ['#FF221797', '#637B72D9', '#BC776DDE', '#FF221797'],
    },
    rays: '#9EACFE',
    accent: '#B9C3FE',
  },
  {
    id: 'emerald',
    name: 'Emerald Dream',
    background: {
      base: ['#FF2E8B57', '#AD3CB371', '#FF1E6B47', '#F4006400'],
      animated1: ['#00000000', '#FF68FF98', '#00000000', '#FF0D281E'],
      animated2: ['#EE000000', '#00000000', '#FF00FF7F', '#00000000'],
      overlay: ['#FF0D472D', '#63527B62', '#BC4D7B5D', '#FF0D472D'],
    },
    rays: '#7FFFD4',
    accent: '#98FFB3',
  },
  {
    id: 'sunset',
    name: 'Sunset Blaze',
    background: {
      base: ['#FFFF4500', '#ADFF6347', '#FFDC143C', '#F4FF8C00'],
      animated1: ['#00000000', '#FFFFAA00', '#00000000', '#FF3D1408'],
      animated2: ['#EE000000', '#00000000', '#FFFF1493', '#00000000'],
      overlay: ['#FF8B0000', '#63CD5C5C', '#BCFF6B6B', '#FF8B0000'],
    },
    rays: '#FFA07A',
    accent: '#FFB366',
  },
  {
    id: 'ocean',
    name: 'Deep Ocean',
    background: {
      base: ['#FF000080', '#AD1E90FF', '#FF0000CD', '#F4000066'],
      animated1: ['#00000000', '#FF6868FF', '#00000000', '#FF101028'],
      animated2: ['#EE000000', '#00000000', '#FF00BFFF', '#00000000'],
      overlay: ['#FF000050', '#634169E1', '#BC6495ED', '#FF000050'],
    },
    rays: '#87CEEB',
    accent: '#ADD8E6',
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    background: {
      base: ['#FFFF00FF', '#AD00FFFF', '#FF8B00FF', '#F4FF1493'],
      animated1: ['#00000000', '#FF00FF00', '#00000000', '#FF280D28'],
      animated2: ['#EE000000', '#00000000', '#FFFFFF00', '#00000000'],
      overlay: ['#FF2D0047', '#63663399', '#BC9933FF', '#FF2D0047'],
    },
    rays: '#E0B0FF',
    accent: '#FF69B4',
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    background: {
      base: ['#FF404040', '#AD606060', '#FF303030', '#F4505050'],
      animated1: ['#00000000', '#FF888888', '#00000000', '#FF1A1A1A'],
      animated2: ['#EE000000', '#00000000', '#FFAAAAAA', '#00000000'],
      overlay: ['#FF202020', '#63505050', '#BC707070', '#FF202020'],
    },
    rays: '#C0C0C0',
    accent: '#E0E0E0',
  },
  {
    id: 'neon',
    name: 'Neon Nights',
    background: {
      base: ['#FFFF00D8', '#AD0433FF', '#FFCC00AA', '#F40022DD'],
      animated1: ['#00000000', '#FFFF44FF', '#00000000', '#FF1A0033'],
      animated2: ['#EE000000', '#00000000', '#FF6644FF', '#00000000'],
      overlay: ['#FF330066', '#634455AA', '#BC5533BB', '#FF220055'],
    },
    rays: '#FF00D8',
    accent: '#0433FF',
  },
];

// XAML base dimensions
const BASE_WIDTH = 800;
const BASE_HEIGHT = 600;

// Helper: Convert #AARRGGBB to rgba(r,g,b,a)
function hexToRgba(hex: string): string {
  if (!hex.startsWith('#')) return hex;
  const val = hex.substring(1);
  if (val.length === 8) {
    const a = parseInt(val.substring(0, 2), 16) / 255;
    const r = parseInt(val.substring(2, 4), 16);
    const g = parseInt(val.substring(4, 6), 16);
    const b = parseInt(val.substring(6, 8), 16);
    return `rgba(${r},${g},${b},${a.toFixed(4)})`;
  } else if (val.length === 6) {
    const r = parseInt(val.substring(0, 2), 16);
    const g = parseInt(val.substring(2, 4), 16);
    const b = parseInt(val.substring(4, 6), 16);
    return `rgba(${r},${g},${b},1)`;
  }
  return hex;
}

// Animation Helper: XAML DoubleAnimation with AutoReverse
function getAnimValue(
  time: number,
  duration: number,
  from: number,
  to: number,
  autoReverse = true
): number {
  if (duration === 0) return to;

  let progress: number;
  if (autoReverse) {
    const cycle = duration * 2;
    const t = time % cycle;
    if (t < duration) {
      progress = t / duration;
    } else {
      progress = 1 - (t - duration) / duration;
    }
  } else {
    progress = (time % duration) / duration;
  }

  return from + (to - from) * progress;
}

interface GradientStop {
  color: string;
  offset: number;
}

interface Bounds {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Point {
  x: number;
  y: number;
}

// Helper: Create linear gradient
function createGradient(
  ctx: CanvasRenderingContext2D,
  bounds: Bounds,
  startPt: Point,
  endPt: Point,
  stops: GradientStop[]
): CanvasGradient {
  const x1 = bounds.x + bounds.w * startPt.x;
  const y1 = bounds.y + bounds.h * startPt.y;
  const x2 = bounds.x + bounds.w * endPt.x;
  const y2 = bounds.y + bounds.h * endPt.y;

  const grad = ctx.createLinearGradient(x1, y1, x2, y2);
  stops.forEach((stop) => {
    grad.addColorStop(
      Math.max(0, Math.min(1, stop.offset)),
      hexToRgba(stop.color)
    );
  });
  return grad;
}

// Replace ray color in gradient stops
function applyRayColor(stops: GradientStop[], rayColor: string): GradientStop[] {
  return stops.map((stop) => {
    if (stop.color.includes('9EACFE') || stop.color.includes('B9C3FE')) {
      const alpha = stop.color.substring(1, 3);
      const newColor = `#${alpha}${rayColor.substring(1)}`;
      return { ...stop, color: newColor };
    }
    return stop;
  });
}

// Pre-compile all paths from XAML
const paths: Record<string, Path2D> = {
  fullRect: new Path2D('M 0 0 L 802 0 L 802 603 L 0 603 Z'),
  rect7: new Path2D('M 0 0 L 61 0 L 61 426 L 0 426 Z'),
  path4: new Path2D('M 9.69 0 C 0.64 53.14 -2.18 106.47 1.69 160'),
  path6_copy4: new Path2D(
    'M 10.53 0 C -0.60 85.75 -2.66 182.15 3.19 287.87'
  ),
  path6_copy2: new Path2D(
    'M 10.53 0 C -0.60 132.99 -2.66 282.51 3.19 446.47'
  ),
  path6_copy1: new Path2D(
    'M 10.53 0 C -0.60 111.71 -2.66 237.30 3.19 375.02'
  ),
  rect8_copy1: new Path2D('M 0 0 L 21.06 0 L 21.06 430.12 L 0 430.12 Z'),
  rect16: new Path2D('M 0.61 0 L 162.61 8.37 L 161.99 233.17 L 0 224.79 Z'),
  path6: new Path2D('M 17.23 0 C -0.98 102.77 -4.36 218.30 5.23 345'),
  rect11_copy2: new Path2D('M 0 0 L 57.81 0 L 57.81 431 L 0 431 Z'),
  rect8: new Path2D('M 0.54 0.58 L 36.59 0 L 36.04 272.11 L 0 272.70 Z'),
  rect16_copy1: new Path2D(
    'M 1.10 0 L 292.18 10.45 L 291.07 291.15 L 0 280.69 Z'
  ),
  path1: new Path2D('M 89 0 C 31.87 89.58 1.44 209.78 0 365'),
  rect6_copy2: new Path2D('M 0 0 L 32.57 0 L 32.57 436.93 L 0 436.93 Z'),
  rect14_copy1: new Path2D(
    'M 0 5.51 L 105.41 0 L 120.61 298.07 L 15.19 303.58 Z'
  ),
  rect17_copy1: new Path2D('M 0 0 L 57.63 0 L 57.63 432.10 L 0 432.10 Z'),
  rect6: new Path2D('M 1.99 0 L 25.55 0 L 23.55 431.45 L 0 431.45 Z'),
  rect11: new Path2D('M 0 0 L 57.81 0 L 57.81 447.96 L 0 447.96 Z'),
  rect14: new Path2D('M 0 4.93 L 105.41 0 L 120.61 266.64 L 15.19 271.57 Z'),
  rect17: new Path2D('M 0 0 L 107.80 0 L 107.80 432.10 L 0 432.10 Z'),
  path6_copy5: new Path2D(
    'M 21.01 0 C 2.79 102.77 -5.58 256.30 4.01 382.99'
  ),
  rect6_copy1: new Path2D('M 0 0 L 23.94 0 L 26.05 428.14 L 2.10 428.14 Z'),
  rect10: new Path2D('M 0 0 L 40.14 0.06 L 40.14 396.06 L 0 396 Z'),
  rect11_copy1: new Path2D('M 0 0 L 53.42 0 L 53.42 431 L 0 431 Z'),
  path2: new Path2D('M 24.39 0 C 4.33 60.95 -3.45 123.60 1.39 188'),
  rect3: new Path2D('M 0 0 L 516.96 0 L 516.96 164.00 L 0 164.00 Z'),
  rect1: new Path2D(
    'M 0 8.01 C 263.35 -2.65 530.64 -2.68 802 8.01 L 802 185.00 L 0 185.00 Z'
  ),
  rect4: new Path2D('M 0 0 L 802 0 L 802 212.55 L 0 212.55 Z'),
  path8_copy3: new Path2D(
    'M 361.96 0 C 400.82 61.96 75.41 695.61 0 770.20'
  ),
  path8_copy1: new Path2D('M 105.08 0 C 88.41 94.60 28.55 211.61 0 258.66'),
  path8_copy9: new Path2D('M 128.31 0 C 93.69 110.82 33.79 246.63 0 301.57'),
  path8_copy10: new Path2D('M 103.66 0 C 83.93 110.48 33.79 250.38 0 305.33'),
  path8: new Path2D('M 87.63 0 C 55.64 145.88 32.61 231.90 0 310.56'),
};

export interface RenderOptions {
  speed: number;
  theme: ColorTheme;
  hueShift: number;
  saturation: number;
}

function drawBackground2(
  ctx: CanvasRenderingContext2D,
  time: number,
  theme: ColorTheme
): void {
  const bg = theme.background;

  // Rectangle2_Copy1 - Base horizontal gradient
  ctx.save();
  ctx.translate(-0.5, -1.13);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 802, h: 603 },
    { x: 0, y: 0.5 },
    { x: 1, y: 0.5 },
    [
      { color: bg.base[0], offset: 0 },
      { color: bg.base[1], offset: 0.25 },
      { color: bg.base[2], offset: 0.4 },
      { color: bg.base[3], offset: 0.7 },
    ]
  );
  ctx.fill(paths.fullRect);
  ctx.restore();

  // Background2Colors - Animated opacity (5s, autoReverse)
  ctx.save();
  ctx.translate(-0.5, -1.13);
  ctx.globalAlpha = getAnimValue(time, 5, 0, 1, true);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 802, h: 603 },
    { x: 0, y: 0.5 },
    { x: 1, y: 0.5 },
    [
      { color: bg.animated1[0], offset: 0 },
      { color: bg.animated1[1], offset: 0.25 },
      { color: bg.animated1[2], offset: 0.4 },
      { color: bg.animated1[3], offset: 0.7 },
    ]
  );
  ctx.fill(paths.fullRect);
  ctx.restore();

  // Background3Colors - Animated opacity (6s, autoReverse)
  ctx.save();
  ctx.translate(-0.5, -1.13);
  ctx.globalAlpha = getAnimValue(time, 6, 0, 1, true);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 802, h: 603 },
    { x: 0, y: 0.5 },
    { x: 1, y: 0.5 },
    [
      { color: bg.animated2[0], offset: 0 },
      { color: bg.animated2[1], offset: 0.25 },
      { color: bg.animated2[2], offset: 0.4 },
      { color: bg.animated2[3], offset: 0.7 },
    ]
  );
  ctx.fill(paths.fullRect);
  ctx.restore();

  // Rectangle2 - Vertical gradient overlay
  ctx.save();
  ctx.translate(-0.5, -1.13);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 802, h: 603 },
    { x: 0.5, y: 0 },
    { x: 0.5, y: 1 },
    [
      { color: bg.overlay[0], offset: 0 },
      { color: bg.overlay[1], offset: 0.67 },
      { color: bg.overlay[2], offset: 0.82 },
      { color: bg.overlay[3], offset: 1 },
    ]
  );
  ctx.fill(paths.fullRect);
  ctx.restore();
}

function drawRays(
  ctx: CanvasRenderingContext2D,
  time: number,
  theme: ColorTheme
): void {
  const rayHex = theme.rays.substring(1);

  // ==================== Group5 ====================
  ctx.save();
  ctx.globalAlpha = getAnimValue(time, 4, 1, 0.1, true);

  // Rectangle7
  ctx.save();
  ctx.translate(370.5, 2.86);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 61, h: 426 },
    { x: 0, y: 0.5 },
    { x: 1, y: 0.5 },
    applyRayColor(
      [
        { color: '#009EACFE', offset: 0 },
        { color: '#459EACFE', offset: 0.3 },
        { color: '#5B9EACFE', offset: 0.71 },
        { color: '#009EACFE', offset: 1 },
      ],
      theme.rays
    )
  );
  ctx.fill(paths.rect7);
  ctx.restore();

  // Path4
  ctx.save();
  ctx.translate(600.8, 98.98);
  ctx.lineWidth = 1.33;
  ctx.strokeStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 12, h: 160 },
    { x: 0.5, y: 0 },
    { x: 0.5, y: 1 },
    [
      { color: '#00675BE6', offset: 0 },
      { color: '#9E675BE6', offset: 0.4 },
      { color: '#9EAEA7F2', offset: 0.75 },
      { color: '#00AEA7F2', offset: 1 },
    ]
  );
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 12, h: 160 },
    { x: -0.21, y: 0.49 },
    { x: 1.21, y: 0.51 },
    [
      { color: '#CB9991EE', offset: 0 },
      { color: '#00AEA7F2', offset: 0.79 },
    ]
  );
  ctx.fill(paths.path4);
  ctx.stroke(paths.path4);
  ctx.restore();

  // Path6_Copy4
  ctx.save();
  ctx.translate(600.45, -28.78);
  ctx.translate(5.26, 143.93);
  ctx.rotate((-2.51 * Math.PI) / 180);
  ctx.scale(0.89, 0.8);
  ctx.translate(-5.26, -143.93);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 13, h: 288 },
    { x: -0.005, y: 0.5 },
    { x: 1.565, y: 0.5 },
    applyRayColor(
      [
        { color: '#8C9EACFE', offset: 0 },
        { color: '#009EACFE', offset: 0.45 },
      ],
      theme.rays
    )
  );
  ctx.fill(paths.path6_copy4);
  ctx.restore();

  // Rectangle7_Copy1
  ctx.save();
  ctx.translate(230.5, -3.13);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 61, h: 426 },
    { x: 0, y: 0.5 },
    { x: 1, y: 0.5 },
    applyRayColor(
      [
        { color: '#009EACFE', offset: 0 },
        { color: '#3A9EACFE', offset: 0.31 },
        { color: '#549EACFE', offset: 0.84 },
        { color: '#009EACFE', offset: 1 },
      ],
      theme.rays
    )
  );
  ctx.fill(paths.rect7);
  ctx.restore();

  // Rectangle8_Copy1
  ctx.save();
  ctx.translate(534.23, -8.22);
  ctx.translate(10.53, 215.06);
  ctx.rotate((-177.77 * Math.PI) / 180);
  ctx.scale(1.0, 0.99);
  ctx.translate(-10.53, -215.06);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 21.06, h: 430.12 },
    { x: 0, y: 0.5 },
    { x: 1, y: 0.5 },
    applyRayColor(
      [
        { color: '#009EACFE', offset: 0 },
        { color: '#239EACFE', offset: 0.24 },
        { color: '#279EACFE', offset: 0.77 },
        { color: '#009EACFE', offset: 1 },
      ],
      theme.rays
    )
  );
  ctx.fill(paths.rect8_copy1);
  ctx.restore();

  ctx.restore(); // End Group5

  // ==================== Group4 ====================
  ctx.save();
  ctx.globalAlpha = getAnimValue(time, 3.5, 1, 0.1, true);

  // Rectangle16
  ctx.save();
  ctx.translate(59.19, 213.21);
  ctx.translate(81.3, 116.58);
  ctx.rotate((-5.29 * Math.PI) / 180);
  ctx.translate(-81.3, -116.58);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 163, h: 234 },
    { x: -0.2, y: 1.14 },
    { x: 0.68, y: 0.72 },
    applyRayColor(
      [
        { color: '#009EACFE', offset: 0 },
        { color: '#B19EACFE', offset: 0.07 },
        { color: '#2B9EACFE', offset: 0.57 },
        { color: '#009EACFE', offset: 0.7 },
      ],
      theme.rays
    )
  );
  ctx.fill(paths.rect16);
  ctx.restore();

  // Path6
  ctx.save();
  ctx.translate(643.26, 10.98);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 17.23, h: 345 },
    { x: 0, y: 0.5 },
    { x: 1, y: 0.5 },
    applyRayColor(
      [
        { color: '#8C9EACFE', offset: 0.01 },
        { color: '#009EACFE', offset: 0.53 },
      ],
      theme.rays
    )
  );
  ctx.fill(paths.path6);
  ctx.restore();

  // Rectangle11_Copy2
  ctx.save();
  ctx.translate(633.68, 9.86);
  ctx.translate(28.9, 215.5);
  ctx.rotate((0.96 * Math.PI) / 180);
  ctx.scale(1.0, 0.99);
  ctx.translate(-28.9, -215.5);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 57.81, h: 431 },
    { x: 0, y: 0.5 },
    { x: 1, y: 0.5 },
    applyRayColor(
      [
        { color: '#009EACFE', offset: 0 },
        { color: '#2F9EACFE', offset: 0.27 },
        { color: '#2B9EACFE', offset: 0.69 },
        { color: '#009EACFE', offset: 1 },
      ],
      theme.rays
    )
  );
  ctx.fill(paths.rect11_copy2);
  ctx.restore();

  // Rectangle8
  ctx.save();
  ctx.translate(552.23, 149.4);
  ctx.translate(18.29, 136.35);
  ctx.rotate((-177.77 * Math.PI) / 180);
  ctx.scale(1.0, 0.99);
  ctx.translate(-18.29, -136.35);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 36.59, h: 272.7 },
    { x: 0.265, y: 0.166 },
    { x: 1.155, y: 0.154 },
    applyRayColor(
      [
        { color: '#009EACFE', offset: 0 },
        { color: '#279EACFE', offset: 0.25 },
        { color: '#5B9EACFE', offset: 0.47 },
        { color: '#009EACFE', offset: 1 },
      ],
      theme.rays
    )
  );
  ctx.fill(paths.rect8);
  ctx.restore();

  // Rectangle16_Copy1
  ctx.save();
  ctx.translate(-8.31, 155.35);
  ctx.translate(146.09, 145.57);
  ctx.rotate((-5.29 * Math.PI) / 180);
  ctx.scale(0.99, 1.0);
  ctx.translate(-146.09, -145.57);
  ctx.translate(-30, 0);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 292.18, h: 291.15 },
    { x: 0.136, y: 1.334 },
    { x: 0.744, y: 0.466 },
    applyRayColor(
      [
        { color: '#009EACFE', offset: 0 },
        { color: '#B19EACFE', offset: 0.35 },
        { color: '#499EACFE', offset: 0.67 },
        { color: '#009EACFE', offset: 1 },
      ],
      theme.rays
    )
  );
  ctx.fill(paths.rect16_copy1);
  ctx.restore();

  ctx.restore(); // End Group4

  // ==================== Path1 (Animated X + Opacity) ====================
  ctx.save();
  const path1X = getAnimValue(time, 4, 686, 700, false);
  ctx.translate(path1X, 17.98);
  ctx.globalAlpha = getAnimValue(time, 2, 0, 1, true);
  ctx.lineWidth = 1.33;
  ctx.strokeStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 89, h: 365 },
    { x: 0.5, y: 0 },
    { x: 0.5, y: 1 },
    [
      { color: '#00675BE6', offset: 0 },
      { color: '#B8AEA7F2', offset: 0.12 },
      { color: '#9E675BE6', offset: 0.77 },
      { color: '#00AEA7F2', offset: 1 },
    ]
  );
  ctx.stroke(paths.path1);
  ctx.restore();

  // ==================== Group3 ====================
  ctx.save();
  ctx.globalAlpha = getAnimValue(time, 3, 1.0, 0.0, true);

  // Rectangle6_Copy2
  ctx.save();
  ctx.translate(430.49, -10.21);
  ctx.translate(16.28, 218.46);
  ctx.rotate((1.76 * Math.PI) / 180);
  ctx.scale(0.99, 1.0);
  ctx.translate(-16.28, -218.46);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 32.57, h: 436.93 },
    { x: 0, y: 0.5 },
    { x: 1, y: 0.5 },
    applyRayColor(
      [
        { color: '#009EACFE', offset: 0 },
        { color: '#549EACFE', offset: 0.53 },
        { color: '#009EACFE', offset: 1 },
      ],
      theme.rays
    )
  );
  ctx.fill(paths.rect6_copy2);
  ctx.restore();

  // Rectangle14_Copy1
  ctx.save();
  ctx.translate(159.36, 146.9);
  ctx.translate(60.3, 151.79);
  ctx.rotate((181.62 * Math.PI) / 180);
  ctx.translate(-60.3, -151.79);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 120.61, h: 303.58 },
    { x: 0.305, y: 0.137 },
    { x: 1.295, y: 0.003 },
    applyRayColor(
      [
        { color: '#009EACFE', offset: 0 },
        { color: '#FF9EACFE', offset: 1 },
      ],
      theme.rays
    )
  );
  ctx.fill(paths.rect14_copy1);
  ctx.restore();

  // Rectangle8_Copy2
  ctx.save();
  ctx.translate(281.23, 149.4);
  ctx.translate(18.29, 136.35);
  ctx.rotate((-177.77 * Math.PI) / 180);
  ctx.scale(1.0, 0.99);
  ctx.translate(-18.29, -136.35);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 36.59, h: 272.7 },
    { x: 0.265, y: 0.166 },
    { x: 1.155, y: 0.154 },
    applyRayColor(
      [
        { color: '#009EACFE', offset: 0 },
        { color: '#279EACFE', offset: 0.25 },
        { color: '#5B9EACFE', offset: 0.77 },
        { color: '#009EACFE', offset: 1 },
      ],
      theme.rays
    )
  );
  ctx.fill(paths.rect8);
  ctx.restore();

  // Rectangle17_Copy1
  ctx.save();
  ctx.translate(124.72, -12.49);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 57.63, h: 432.1 },
    { x: 0, y: 0.5 },
    { x: 1, y: 0.5 },
    applyRayColor(
      [
        { color: '#009EACFE', offset: 0 },
        { color: '#3A9EACFE', offset: 0.29 },
        { color: '#3D9EACFE', offset: 0.67 },
        { color: '#009EACFE', offset: 1 },
      ],
      theme.rays
    )
  );
  ctx.fill(paths.rect17_copy1);
  ctx.restore();

  ctx.restore(); // End Group3

  // ==================== Group1 ====================
  ctx.save();
  ctx.globalAlpha = getAnimValue(time, 2.5, 0.6, 0.2, true);

  // Rectangle6
  ctx.save();
  ctx.translate(506.01, -8.4);
  ctx.translate(12.77, 215.72);
  ctx.rotate((2.03 * Math.PI) / 180);
  ctx.translate(-12.77, -215.72);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 25.55, h: 431.45 },
    { x: 0, y: 0.5 },
    { x: 1, y: 0.5 },
    applyRayColor(
      [
        { color: '#009EACFE', offset: 0 },
        { color: '#279EACFE', offset: 0.53 },
        { color: '#009EACFE', offset: 1 },
      ],
      theme.rays
    )
  );
  ctx.fill(paths.rect6);
  ctx.restore();

  // Rectangle11
  ctx.save();
  ctx.translate(633.82, -7.1);
  ctx.translate(28.9, 223.98);
  ctx.rotate((0.96 * Math.PI) / 180);
  ctx.translate(-28.9, -223.98);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 57.81, h: 447.96 },
    { x: 0, y: 0.5 },
    { x: 1, y: 0.5 },
    applyRayColor(
      [
        { color: '#009EACFE', offset: 0 },
        { color: '#0D9EACFE', offset: 0.27 },
        { color: '#119EACFE', offset: 0.69 },
        { color: '#009EACFE', offset: 1 },
      ],
      theme.rays
    )
  );
  ctx.fill(paths.rect11);
  ctx.restore();

  // Rectangle14
  ctx.save();
  ctx.translate(100.38, 174.91);
  ctx.translate(60.3, 135.78);
  ctx.rotate((-180.06 * Math.PI) / 180);
  ctx.translate(-60.3, -135.78);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 120.61, h: 271.57 },
    { x: 0.358, y: 0.127 },
    { x: 1.342, y: -0.047 },
    applyRayColor(
      [
        { color: '#009EACFE', offset: 0 },
        { color: '#5B9EACFE', offset: 0.34 },
        { color: '#F49EACFE', offset: 0.92 },
        { color: '#009EACFE', offset: 1 },
      ],
      theme.rays
    )
  );
  ctx.fill(paths.rect14);
  ctx.restore();

  // Rectangle17
  ctx.save();
  ctx.translate(290.5, -8.49);
  ctx.translate(53.9, 216.05);
  ctx.rotate((4.46 * Math.PI) / 180);
  ctx.translate(-53.9, -216.05);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 107.8, h: 432.1 },
    { x: 0, y: 0.5 },
    { x: 1, y: 0.5 },
    applyRayColor(
      [
        { color: '#009EACFE', offset: 0 },
        { color: '#759EACFE', offset: 0.29 },
        { color: '#549EACFE', offset: 0.67 },
        { color: '#009EACFE', offset: 1 },
      ],
      theme.rays
    )
  );
  ctx.fill(paths.rect17);
  ctx.restore();

  // Path6_Copy2
  ctx.save();
  ctx.translate(623.92, -16.86);
  ctx.translate(5.26, 223.23);
  ctx.rotate((-1.31 * Math.PI) / 180);
  ctx.scale(0.99, 1.0);
  ctx.scale(1.0, 0.8);
  ctx.translate(-5.26, -223.23);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 10.53, h: 446.47 },
    { x: -0.005, y: 0.5 },
    { x: 1.565, y: 0.5 },
    applyRayColor(
      [
        { color: '#8C9EACFE', offset: 0 },
        { color: '#009EACFE', offset: 0.45 },
      ],
      theme.rays
    )
  );
  ctx.fill(paths.path6_copy2);
  ctx.restore();

  // Path6_Copy5
  ctx.save();
  ctx.translate(637.48, -24.01);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 21.01, h: 382.99 },
    { x: 0, y: 0.5 },
    { x: 1, y: 0.5 },
    [
      { color: '#CBFFFFFF', offset: 0 },
      { color: `#00${rayHex}`, offset: 0.46 },
    ]
  );
  ctx.fill(paths.path6_copy5);
  ctx.restore();

  ctx.restore(); // End Group1

  // ==================== Path6_Copy3 (Animated X + Opacity) ====================
  ctx.save();
  const path6c3X = getAnimValue(time, 7, 605, 620, false);
  ctx.translate(path6c3X, -16.86);
  ctx.translate(5.26, 223.23);
  ctx.rotate((2.51 * Math.PI) / 180);
  ctx.scale(-0.99, 1.0);
  ctx.translate(-5.26, -223.23);
  ctx.globalAlpha = getAnimValue(time, 3.5, 0, 1, true);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 10.53, h: 446.47 },
    { x: -0.005, y: 0.5 },
    { x: 1.565, y: 0.5 },
    applyRayColor(
      [
        { color: '#549EACFE', offset: 0 },
        { color: '#009EACFE', offset: 0.45 },
      ],
      theme.rays
    )
  );
  ctx.fill(paths.path6_copy2);
  ctx.restore();

  // ==================== Group2 ====================
  ctx.save();
  ctx.globalAlpha = getAnimValue(time, 2.5, 0, 1, true);

  // Rectangle6_Copy1
  ctx.save();
  ctx.translate(494.44, -8.25);
  ctx.translate(13.02, 214.07);
  ctx.rotate((1.76 * Math.PI) / 180);
  ctx.translate(-13.02, -214.07);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 26.05, h: 428.14 },
    { x: 0, y: 0.5 },
    { x: 1, y: 0.5 },
    applyRayColor(
      [
        { color: '#009EACFE', offset: 0 },
        { color: '#419EACFE', offset: 0.53 },
        { color: '#009EACFE', offset: 1 },
      ],
      theme.rays
    )
  );
  ctx.fill(paths.rect6_copy1);
  ctx.restore();

  // Rectangle10
  ctx.save();
  ctx.translate(455.35, 32.82);
  ctx.translate(20.07, 198.03);
  ctx.rotate((-179.07 * Math.PI) / 180);
  ctx.translate(-20.07, -198.03);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 40.14, h: 396.06 },
    { x: 0.13, y: 0.151 },
    { x: 1.33, y: 0.129 },
    applyRayColor(
      [
        { color: '#009EACFE', offset: 0 },
        { color: '#159EACFE', offset: 0.3 },
        { color: '#329EACFE', offset: 0.84 },
        { color: '#009EACFE', offset: 1 },
      ],
      theme.rays
    )
  );
  ctx.fill(paths.rect10);
  ctx.restore();

  // Rectangle11_Copy1
  ctx.save();
  ctx.translate(685.53, 2.86);
  ctx.translate(26.71, 215.5);
  ctx.rotate((2.18 * Math.PI) / 180);
  ctx.translate(-26.71, -215.5);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 53.42, h: 431 },
    { x: 0, y: 0.5 },
    { x: 1, y: 0.5 },
    applyRayColor(
      [
        { color: '#009EACFE', offset: 0 },
        { color: '#2F9EACFE', offset: 0.25 },
        { color: '#2B9EACFE', offset: 0.73 },
        { color: '#009EACFE', offset: 1 },
      ],
      theme.rays
    )
  );
  ctx.fill(paths.rect11_copy1);
  ctx.restore();

  // Path2 (Animated X)
  ctx.save();
  const path2X = getAnimValue(time, 5, 690, 705, false);
  ctx.translate(path2X, 201.98);
  ctx.lineWidth = 1.33;
  ctx.strokeStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 24.39, h: 188 },
    { x: 0.5, y: 0 },
    { x: 0.5, y: 1 },
    [
      { color: '#00675BE6', offset: 0 },
      { color: '#9E675BE6', offset: 0.4 },
      { color: '#9EAEA7F2', offset: 0.75 },
      { color: '#00AEA7F2', offset: 1 },
    ]
  );
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 24.39, h: 188 },
    { x: -0.22, y: 0.492 },
    { x: 0.64, y: 0.508 },
    [
      { color: '#CB9991EE', offset: 0 },
      { color: '#00AEA7F2', offset: 0.79 },
    ]
  );
  ctx.fill(paths.path2);
  ctx.stroke(paths.path2);
  ctx.restore();

  ctx.restore(); // End Group2

  // ==================== Path6_Copy1 (Animated X + Opacity) ====================
  ctx.save();
  const path6c1X = getAnimValue(time, 5, 630, 615, false);
  ctx.translate(path6c1X, 10.98);
  ctx.translate(5.26, 187.51);
  ctx.scale(1.0, 0.85);
  ctx.translate(-5.26, -187.51);
  ctx.globalAlpha = getAnimValue(time, 2.5, 0, 1, true);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 10.53, h: 375.02 },
    { x: 0, y: 0.5 },
    { x: 1, y: 0.5 },
    applyRayColor(
      [
        { color: '#8C9EACFE', offset: 0 },
        { color: '#009EACFE', offset: 1 },
      ],
      theme.rays
    )
  );
  ctx.fill(paths.path6_copy1);
  ctx.restore();

  // ==================== MovingRays (Animated X + Opacity) ====================
  ctx.save();
  const movingRaysX = getAnimValue(time, 20, 0, 200, false);
  ctx.translate(movingRaysX, 0);
  ctx.globalAlpha = getAnimValue(time, 10, 0, 1, true);

  // Rectangle7_Copy2
  ctx.save();
  ctx.translate(370.5, 2.86);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 61, h: 426 },
    { x: 0, y: 0.5 },
    { x: 1, y: 0.5 },
    applyRayColor(
      [
        { color: '#009EACFE', offset: 0 },
        { color: '#459EACFE', offset: 0.3 },
        { color: '#5B9EACFE', offset: 0.71 },
        { color: '#009EACFE', offset: 1 },
      ],
      theme.rays
    )
  );
  ctx.fill(paths.rect7);
  ctx.restore();

  // Rectangle11_Copy3
  ctx.save();
  ctx.translate(633.82, -7.1);
  ctx.translate(28.9, 223.98);
  ctx.rotate((0.96 * Math.PI) / 180);
  ctx.translate(-28.9, -223.98);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 57.81, h: 447.96 },
    { x: 0, y: 0.5 },
    { x: 1, y: 0.5 },
    applyRayColor(
      [
        { color: '#009EACFE', offset: 0 },
        { color: '#0D9EACFE', offset: 0.27 },
        { color: '#119EACFE', offset: 0.69 },
        { color: '#009EACFE', offset: 1 },
      ],
      theme.rays
    )
  );
  ctx.fill(paths.rect11);
  ctx.restore();

  // Rectangle17_Copy2
  ctx.save();
  ctx.translate(290.49, -8.49);
  ctx.translate(53.9, 216.05);
  ctx.rotate((4.46 * Math.PI) / 180);
  ctx.scale(1.0, 0.99);
  ctx.translate(-53.9, -216.05);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 107.8, h: 432.1 },
    { x: 0, y: 0.5 },
    { x: 1, y: 0.5 },
    applyRayColor(
      [
        { color: '#009EACFE', offset: 0 },
        { color: '#759EACFE', offset: 0.29 },
        { color: '#549EACFE', offset: 0.67 },
        { color: '#009EACFE', offset: 1 },
      ],
      theme.rays
    )
  );
  ctx.fill(paths.rect17);
  ctx.restore();

  // Rectangle6_Copy3
  ctx.save();
  ctx.translate(494.44, -8.25);
  ctx.translate(13.02, 214.07);
  ctx.rotate((1.76 * Math.PI) / 180);
  ctx.scale(0.99, 1.0);
  ctx.translate(-13.02, -214.07);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 26.05, h: 428.14 },
    { x: 0, y: 0.5 },
    { x: 1, y: 0.5 },
    applyRayColor(
      [
        { color: '#009EACFE', offset: 0 },
        { color: '#419EACFE', offset: 0.53 },
        { color: '#009EACFE', offset: 1 },
      ],
      theme.rays
    )
  );
  ctx.fill(paths.rect6_copy1);
  ctx.restore();

  // Rectangle10_Copy1
  ctx.save();
  ctx.translate(455.35, 32.82);
  ctx.translate(20.07, 198.03);
  ctx.rotate((-179.07 * Math.PI) / 180);
  ctx.translate(-20.07, -198.03);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 40.14, h: 396.06 },
    { x: 0.13, y: 0.151 },
    { x: 1.33, y: 0.129 },
    applyRayColor(
      [
        { color: '#009EACFE', offset: 0 },
        { color: '#159EACFE', offset: 0.3 },
        { color: '#329EACFE', offset: 0.84 },
        { color: '#009EACFE', offset: 1 },
      ],
      theme.rays
    )
  );
  ctx.fill(paths.rect10);
  ctx.restore();

  ctx.restore(); // End MovingRays
}

function drawLargeForegrounds(
  ctx: CanvasRenderingContext2D,
  time: number,
  _theme: ColorTheme
): void {
  // Rectangle3
  ctx.save();
  ctx.translate(0.5, 436.86);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 516.96, h: 164 },
    { x: 0.055, y: 0.55 },
    { x: 0.945, y: 0.55 },
    [
      { color: '#FF12127E', offset: 0 },
      { color: '#0012127E', offset: 1 },
    ]
  );
  ctx.fill(paths.rect3);
  ctx.restore();

  // Rectangle3ColorVariation (Animated Opacity)
  ctx.save();
  ctx.translate(0.5, 436.86);
  ctx.globalAlpha = getAnimValue(time, 5, 0, 1, true);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 516.96, h: 164 },
    { x: 0.055, y: 0.55 },
    { x: 0.945, y: 0.55 },
    [
      { color: '#99000000', offset: 0 },
      { color: '#0012127E', offset: 1 },
    ]
  );
  ctx.fill(paths.rect3);
  ctx.restore();

  // Rectangle1
  ctx.save();
  ctx.translate(-0.5, 415.85);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 802, h: 185 },
    { x: 0.509, y: 0.105 },
    { x: 0.491, y: 0.995 },
    [
      { color: '#D212127E', offset: 0 },
      { color: '#0012127E', offset: 0.58 },
    ]
  );
  ctx.fill(paths.rect1);
  ctx.restore();

  // Rectangle1ColorVariation (Animated Opacity)
  ctx.save();
  ctx.translate(-0.5, 415.85);
  ctx.globalAlpha = getAnimValue(time, 4, 0, 1, true);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 802, h: 185 },
    { x: 0.509, y: 0.105 },
    { x: 0.491, y: 0.995 },
    [
      { color: '#66000000', offset: 0 },
      { color: '#0012127E', offset: 0.58 },
    ]
  );
  ctx.fill(paths.rect1);
  ctx.restore();

  // Rectangle4
  ctx.save();
  ctx.translate(-0.5, -0.13);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 802, h: 212.55 },
    { x: 0.5, y: 0 },
    { x: 0.5, y: 1 },
    [
      { color: '#FF23159E', offset: 0 },
      { color: '#96372AB4', offset: 0.4 },
      { color: '#005448D4', offset: 1 },
    ]
  );
  ctx.fill(paths.rect4);
  ctx.restore();
}

function drawThinRays(
  ctx: CanvasRenderingContext2D,
  time: number,
  theme: ColorTheme
): void {
  const accentHex = theme.accent.substring(1);

  // ==================== BottomLights (Animated Opacity) ====================
  ctx.save();
  ctx.globalAlpha = getAnimValue(time, 6, 0.7, 0.1, true);

  // Path8_Copy3
  ctx.save();
  ctx.translate(244.95, 100.04);
  ctx.translate(182.58, 385.1);
  ctx.rotate((121.98 * Math.PI) / 180);
  ctx.scale(-0.99, 0.99);
  ctx.translate(-182.58, -385.1);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 361.96, h: 770.2 },
    { x: 0.461, y: 0.519 },
    { x: 0.559, y: 0.541 },
    applyRayColor(
      [
        { color: '#00B9C3FE', offset: 0.14 },
        { color: '#3D9EACFE', offset: 0.66 },
        { color: '#00B9C3FE', offset: 1 },
      ],
      theme.rays
    )
  );
  ctx.fill(paths.path8_copy3);
  ctx.restore();

  // Path8_Copy4
  ctx.save();
  ctx.translate(225.34, 95.3);
  ctx.translate(182.58, 385.1);
  ctx.rotate((-60.57 * Math.PI) / 180);
  ctx.scale(0.99, -0.99);
  ctx.translate(-182.58, -385.1);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 361.96, h: 770.2 },
    { x: 0.461, y: 0.519 },
    { x: 0.559, y: 0.541 },
    applyRayColor(
      [
        { color: '#00B9C3FE', offset: 0.08 },
        { color: '#3D9EACFE', offset: 0.52 },
        { color: '#00B9C3FE', offset: 0.93 },
      ],
      theme.rays
    )
  );
  ctx.fill(paths.path8_copy3);
  ctx.restore();

  // Path8_Copy5
  ctx.save();
  ctx.translate(346.33, 56.3);
  ctx.translate(182.58, 385.1);
  ctx.rotate((-62.42 * Math.PI) / 180);
  ctx.scale(0.99, -0.99);
  ctx.translate(-182.58, -385.1);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 361.96, h: 770.2 },
    { x: 0.461, y: 0.519 },
    { x: 0.559, y: 0.541 },
    applyRayColor(
      [
        { color: '#00B9C3FE', offset: 0.08 },
        { color: '#589EACFE', offset: 0.52 },
        { color: '#00B9C3FE', offset: 0.93 },
      ],
      theme.rays
    )
  );
  ctx.fill(paths.path8_copy3);
  ctx.restore();

  ctx.restore(); // End BottomLights

  // ==================== Path8_Copy1 (Animated X + Opacity) ====================
  ctx.save();
  const path8c1X = getAnimValue(time, 4, 70, 60, false);
  ctx.translate(path8c1X, 145.63);
  ctx.translate(52.54, 129.33);
  ctx.rotate((-8.3 * Math.PI) / 180);
  ctx.scale(1.0, 0.99);
  ctx.translate(-52.54, -129.33);
  ctx.globalAlpha = getAnimValue(time, 2, 0, 0.5, true);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 105.08, h: 258.66 },
    { x: 0.382, y: 0.499 },
    { x: 0.618, y: 0.541 },
    [
      { color: `#00${theme.rays.substring(1)}`, offset: 0.24 },
      { color: `#32${accentHex}`, offset: 0.56 },
      { color: '#45E9ECFF', offset: 0.8 },
    ]
  );
  ctx.fill(paths.path8_copy1);
  ctx.restore();

  // ==================== Path8_Copy10 (Animated X + Opacity) ====================
  ctx.save();
  const path8c10X = getAnimValue(time, 4, 80, 100, false);
  ctx.translate(path8c10X, 49.8);
  ctx.translate(51.83, 152.66);
  ctx.rotate((169.05 * Math.PI) / 180);
  ctx.scale(1.0, 0.99);
  ctx.translate(-51.83, -152.66);
  ctx.globalAlpha = getAnimValue(time, 2, 0, 1, true);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 103.66, h: 305.33 },
    { x: 0.381, y: 0.506 },
    { x: 0.619, y: 0.534 },
    [
      { color: `#00${theme.rays.substring(1)}`, offset: 0.41 },
      { color: `#1C${accentHex}`, offset: 0.72 },
    ]
  );
  ctx.fill(paths.path8_copy10);
  ctx.restore();

  // ==================== Lights (Animated X + Opacity) ====================
  ctx.save();
  const lightsX = getAnimValue(time, 6, -10, 10, false);
  ctx.translate(lightsX, 0);
  ctx.globalAlpha = getAnimValue(time, 3, 0, 0.6, true);

  // Path4_Copy1
  ctx.save();
  ctx.translate(600.8, 98.98);
  ctx.lineWidth = 1.33;
  ctx.strokeStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 12, h: 160 },
    { x: 0.5, y: 0 },
    { x: 0.5, y: 1 },
    [
      { color: '#00675BE6', offset: 0 },
      { color: '#9E675BE6', offset: 0.4 },
      { color: '#9EAEA7F2', offset: 0.75 },
      { color: '#00AEA7F2', offset: 1 },
    ]
  );
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 12, h: 160 },
    { x: -0.225, y: 0.494 },
    { x: 1.205, y: 0.506 },
    [
      { color: '#5B9991EE', offset: 0 },
      { color: '#00AEA7F2', offset: 0.79 },
    ]
  );
  ctx.fill(paths.path4);
  ctx.stroke(paths.path4);
  ctx.restore();

  // Path8_Copy9
  ctx.save();
  ctx.translate(47.68, 120.33);
  ctx.translate(64.15, 150.78);
  ctx.rotate((-142.73 * Math.PI) / 180);
  ctx.scale(-1.0, 0.82);
  ctx.translate(-64.15, -150.78);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 128.31, h: 301.57 },
    { x: 0.441, y: 0.482 },
    { x: 0.679, y: 0.518 },
    [
      { color: `#00${theme.rays.substring(1)}`, offset: 0.37 },
      { color: '#8FCFD6FE', offset: 0.69 },
    ]
  );
  ctx.fill(paths.path8_copy9);
  ctx.restore();

  ctx.restore(); // End Lights

  // ==================== TopLeft2 (Animated Opacity) ====================
  ctx.save();
  ctx.translate(-9, -15);
  ctx.translate(125, 199.61);
  ctx.rotate((-16.91 * Math.PI) / 180);
  ctx.translate(-125, -199.61);
  ctx.globalAlpha = getAnimValue(time, 2.5, 1, 0, true);

  // Path8
  ctx.save();
  ctx.translate(96.54, 28.53);
  ctx.translate(43.81, 155.28);
  ctx.rotate((5.86 * Math.PI) / 180);
  ctx.translate(-43.81, -155.28);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 87.63, h: 310.56 },
    { x: 0.455, y: 0.525 },
    { x: 0.625, y: 0.535 },
    [
      { color: `#00${theme.rays.substring(1)}`, offset: 0.24 },
      { color: `#1C${accentHex}`, offset: 0.56 },
      { color: '#4CE9ECFF', offset: 0.8 },
    ]
  );
  ctx.fill(paths.path8);
  ctx.restore();

  ctx.restore(); // End TopLeft2

  // ==================== Path8_Copy14 (Animated X + Opacity) ====================
  ctx.save();
  const path8c14X = getAnimValue(time, 4, 45, 55, false);
  ctx.translate(path8c14X, -68.18);
  ctx.translate(51.83, 152.66);
  ctx.scale(1.0, 0.99);
  ctx.translate(-51.83, -152.66);
  ctx.globalAlpha = getAnimValue(time, 2, 0, 1, true);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 103.66, h: 305.33 },
    { x: 0.381, y: 0.506 },
    { x: 0.619, y: 0.534 },
    [
      { color: `#00${theme.rays.substring(1)}`, offset: 0.41 },
      { color: `#1C${accentHex}`, offset: 0.72 },
    ]
  );
  ctx.fill(paths.path8_copy10);
  ctx.restore();

  // ==================== Path8_Copy15 (Animated X + Opacity) ====================
  ctx.save();
  const path8c15X = getAnimValue(time, 4, 65, 50, false);
  ctx.translate(path8c15X, -163.15);
  ctx.translate(51.83, 152.66);
  ctx.rotate((352.09 * Math.PI) / 180);
  ctx.scale(0.99, 0.99);
  ctx.translate(-51.83, -152.66);
  ctx.globalAlpha = getAnimValue(time, 2, 0, 1, true);
  ctx.fillStyle = createGradient(
    ctx,
    { x: 0, y: 0, w: 103.66, h: 305.33 },
    { x: 0.381, y: 0.506 },
    { x: 0.619, y: 0.534 },
    [
      { color: `#00${theme.rays.substring(1)}`, offset: 0.41 },
      { color: `#1C${accentHex}`, offset: 0.72 },
    ]
  );
  ctx.fill(paths.path8_copy10);
  ctx.restore();
}

export function render(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  time: number,
  options: RenderOptions
): void {
  const adjustedTime = time * options.speed;

  ctx.setTransform(1, 0, 0, 1, 0, 0);

  // Apply hue-rotate and saturation filter
  const hueFilter = options.hueShift !== 0 ? `hue-rotate(${options.hueShift}deg)` : '';
  const satFilter = options.saturation !== 100 ? `saturate(${options.saturation}%)` : '';
  ctx.filter = [hueFilter, satFilter].filter(Boolean).join(' ') || 'none';

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const scaleX = canvas.width / BASE_WIDTH;
  const scaleY = canvas.height / BASE_HEIGHT;
  ctx.scale(scaleX, scaleY);

  drawBackground2(ctx, adjustedTime, options.theme);
  drawRays(ctx, adjustedTime, options.theme);
  drawLargeForegrounds(ctx, adjustedTime, options.theme);
  drawThinRays(ctx, adjustedTime, options.theme);

  // Reset filter
  ctx.filter = 'none';
}
