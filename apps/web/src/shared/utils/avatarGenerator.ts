export type AvatarStyle = 'cosmic';

type ColorPalette = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
};

const PALETTES: ColorPalette[] = [
  // Original palettes
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
  // New vibrant palettes
  {
    primary: '#8b5cf6',
    secondary: '#a78bfa',
    accent: '#c4b5fd',
    background: '#2e1b4b',
  },
  {
    primary: '#06b6d4',
    secondary: '#22d3ee',
    accent: '#67e8f9',
    background: '#083344',
  },
  {
    primary: '#f59e0b',
    secondary: '#fbbf24',
    accent: '#fcd34d',
    background: '#451a03',
  },
  {
    primary: '#ef4444',
    secondary: '#f87171',
    accent: '#fca5a5',
    background: '#450a0a',
  },
  {
    primary: '#84cc16',
    secondary: '#a3e635',
    accent: '#bef264',
    background: '#1a2e05',
  },
  {
    primary: '#06b6d4',
    secondary: '#22d3ee',
    accent: '#67e8f9',
    background: '#0c4a6e',
  },
  // Purple & violet variations
  {
    primary: '#9333ea',
    secondary: '#a855f7',
    accent: '#c084fc',
    background: '#3b0764',
  },
  {
    primary: '#7c3aed',
    secondary: '#8b5cf6',
    accent: '#a78bfa',
    background: '#2e1b4b',
  },
  // Blue variations
  {
    primary: '#2563eb',
    secondary: '#3b82f6',
    accent: '#60a5fa',
    background: '#1e3a8a',
  },
  {
    primary: '#0ea5e9',
    secondary: '#38bdf8',
    accent: '#7dd3fc',
    background: '#0c4a6e',
  },
  // Teal & cyan variations
  {
    primary: '#0d9488',
    secondary: '#14b8a6',
    accent: '#5eead4',
    background: '#042f2e',
  },
  {
    primary: '#0891b2',
    secondary: '#06b6d4',
    accent: '#22d3ee',
    background: '#083344',
  },
  // Green variations
  {
    primary: '#059669',
    secondary: '#10b981',
    accent: '#34d399',
    background: '#022c22',
  },
  {
    primary: '#65a30d',
    secondary: '#84cc16',
    accent: '#a3e635',
    background: '#1a2e05',
  },
  // Yellow & amber variations
  {
    primary: '#d97706',
    secondary: '#f59e0b',
    accent: '#fbbf24',
    background: '#431407',
  },
  {
    primary: '#ca8a04',
    secondary: '#eab308',
    accent: '#fde047',
    background: '#422006',
  },
  // Orange & red variations
  {
    primary: '#ea580c',
    secondary: '#f97316',
    accent: '#fb923c',
    background: '#431407',
  },
  {
    primary: '#dc2626',
    secondary: '#ef4444',
    accent: '#f87171',
    background: '#450a0a',
  },
  // Pink & rose variations
  {
    primary: '#db2777',
    secondary: '#ec4899',
    accent: '#f472b6',
    background: '#4c0519',
  },
  {
    primary: '#e11d48',
    secondary: '#f43f5e',
    accent: '#fb7185',
    background: '#4c0519',
  },
  // Indigo variations
  {
    primary: '#4f46e5',
    secondary: '#6366f1',
    accent: '#818cf8',
    background: '#1e1b4b',
  },
  {
    primary: '#4338ca',
    secondary: '#6366f1',
    accent: '#818cf8',
    background: '#1e1b4b',
  },
  // Emerald variations
  {
    primary: '#047857',
    secondary: '#059669',
    accent: '#10b981',
    background: '#022c22',
  },
  {
    primary: '#0d9488',
    secondary: '#14b8a6',
    accent: '#2dd4bf',
    background: '#042f2e',
  },
  // Sky blue variations
  {
    primary: '#0284c7',
    secondary: '#0ea5e9',
    accent: '#38bdf8',
    background: '#0c4a6e',
  },
  {
    primary: '#0369a1',
    secondary: '#0ea5e9',
    accent: '#7dd3fc',
    background: '#0c4a6e',
  },
  // Warm sunset palette
  {
    primary: '#f97316',
    secondary: '#fb923c',
    accent: '#fdba74',
    background: '#431407',
  },
  // Cool mint palette
  {
    primary: '#10b981',
    secondary: '#34d399',
    accent: '#6ee7b7',
    background: '#064e3b',
  },
  // Deep ocean palette
  {
    primary: '#0e7490',
    secondary: '#06b6d4',
    accent: '#22d3ee',
    background: '#083344',
  },
  // Lavender palette
  {
    primary: '#a855f7',
    secondary: '#c084fc',
    accent: '#d8b4fe',
    background: '#3b0764',
  },
  // Coral palette
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
