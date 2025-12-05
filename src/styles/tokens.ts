// design/tokens.ts
export const COLORS = {
  white: '#fff',
  black: '#000',
  primary: '#3673b4ff',
  green: '#d1e7dd',
  grey: '#f0f0f0',
  drkgrey: '#666',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const TYPOGRAPHY = {
  h1: { fontSize: 32, fontWeight: '700' as const },
  h2: { fontSize: 26, fontWeight: '700' as const },
  body: { fontSize: 16, fontWeight: '400' as const },
  small: { fontSize: 14, fontWeight: '400' as const },
};
