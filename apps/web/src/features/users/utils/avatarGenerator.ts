export type AvatarStyle = 'cosmic';

type ColorPalette = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
};

const PALETTES: ColorPalette[] = [
  {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    accent: '#a855f7',
    background: '#1e1b4b',
  },
  {
    primary: '#14b8a6',
    secondary: '#06b6d4',
    accent: '#22d3d1',
    background: '#134e4a',
  },
  {
    primary: '#f97316',
    secondary: '#fb923c',
    accent: '#fbbf24',
    background: '#431407',
  },
  {
    primary: '#ec4899',
    secondary: '#f472b6',
    accent: '#f9a8d4',
    background: '#4c0519',
  },
  {
    primary: '#3b82f6',
    secondary: '#60a5fa',
    accent: '#93c5fd',
    background: '#1e3a5f',
  },
  {
    primary: '#10b981',
    secondary: '#34d399',
    accent: '#6ee7b7',
    background: '#064e3b',
  },
  {
    primary: '#f43f5e',
    secondary: '#fb7185',
    accent: '#fda4af',
    background: '#4c0519',
  },
];

// Simple hash function for deterministic generation
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

// Seeded random number generator
function seededRandom(seed: number): () => number {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

function drawCosmic(
  ctx: CanvasRenderingContext2D,
  size: number,
  palette: ColorPalette,
  random: () => number
) {
  // Deep space background with gradient
  const bgGradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size
  );
  bgGradient.addColorStop(0, palette.background);
  bgGradient.addColorStop(1, '#0a0a0f');
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, size, size);

  // Stars
  for (let i = 0; i < 50; i++) {
    const x = random() * size;
    const y = random() * size;
    const starSize = random() * 2;

    ctx.beginPath();
    ctx.arc(x, y, starSize, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + random() * 0.7})`;
    ctx.fill();
  }

  // Nebula clouds
  for (let i = 0; i < 3; i++) {
    const x = random() * size;
    const y = random() * size;
    const cloudSize = 40 + random() * 80;

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, cloudSize);
    gradient.addColorStop(
      0,
      [palette.primary, palette.secondary, palette.accent][i % 3]
    );
    gradient.addColorStop(1, 'transparent');

    ctx.beginPath();
    ctx.arc(x, y, cloudSize, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.globalAlpha = 0.4;
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawInitials(
  ctx: CanvasRenderingContext2D,
  size: number,
  initials: string
) {
  ctx.font = `bold ${size * 0.45}px 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.fillText(initials, size / 2, size / 2);
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
}

export function generateAvatar(
  seed: string,
  options: {
    size?: number;
    style?: AvatarStyle;
    includeInitials?: boolean;
  } = {}
): HTMLCanvasElement {
  const { size = 256, includeInitials = false } = options;

  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const hash = hashString(seed);
  const random = seededRandom(hash);
  const palette = PALETTES[hash % PALETTES.length];

  drawCosmic(ctx, size, palette, random);

  if (includeInitials) {
    const initials = seed
      .split(' ')
      .slice(0, 2)
      .map(s => s[0]?.toUpperCase() ?? '')
      .join('');
    drawInitials(ctx, size, initials || seed.slice(0, 2).toUpperCase());
  }

  return canvas;
}

export function generateAvatarBlob(
  seed: string,
  options?: Parameters<typeof generateAvatar>[1]
): Promise<Blob> {
  const canvas = generateAvatar(seed, options);
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob) resolve(blob);
      else reject(new Error('Failed to generate avatar blob'));
    }, 'image/png');
  });
}

export function generateAvatarDataUrl(
  seed: string,
  options?: Parameters<typeof generateAvatar>[1]
): string {
  const canvas = generateAvatar(seed, options);
  return canvas.toDataURL('image/png');
}
