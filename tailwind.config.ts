import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F4C5C',
          50: '#E7F4F6',
          100: '#C2E4E9',
          200: '#9DD3DC',
          300: '#78C2CF',
          400: '#53B1C2',
          500: '#0F4C5C',
          600: '#0C3D4A',
          700: '#092E38',
          800: '#061F26',
          900: '#031014',
        },
        secondary: {
          DEFAULT: '#F5E6D3',
          50: '#FEFDFB',
          100: '#FDF9F3',
          200: '#FBF3E7',
          300: '#F9EDDB',
          400: '#F7E7CF',
          500: '#F5E6D3',
          600: '#E6D1B3',
          700: '#D7BC93',
          800: '#C8A773',
          900: '#B99253',
        },
        accent: {
          DEFAULT: '#FF6B6B',
          50: '#FFE5E5',
          100: '#FFC7C7',
          200: '#FFA8A8',
          300: '#FF8A8A',
          400: '#FF6B6B',
          500: '#FF4C4C',
          600: '#FF2E2E',
          700: '#FF0F0F',
          800: '#F00000',
          900: '#D10000',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
