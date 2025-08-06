import type { Config } from 'tailwindcss';
import { colors, typography, spacing, animation } from './src/lib/design-system';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    {
      pattern:
        /^(bg|text|border)-(primary|secondary|accent)-(50|100|200|300|400|500|600|700|800|900)$/,
    },
    {
      pattern: /^w-(1|2|4|8|16|32)$/,
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        secondary: colors.secondary,
        accent: colors.accent,
        background: colors.background,
        border: colors.border,
        success: colors.success,
        warning: colors.warning,
        error: colors.error,
        info: colors.info,
      },
      fontFamily: typography.fontFamily,
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
        30: '7.5rem',
      },
      transitionDuration: animation.duration,
      transitionTimingFunction: animation.easing,
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
        full: '9999px',
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgb(0 0 0 / 0.1)',
        glow: '0 0 16px -4px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
};
export default config;
