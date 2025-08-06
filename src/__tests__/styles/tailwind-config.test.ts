import { describe, it, expect } from '@jest/globals';

import tailwindConfig from '../../../tailwind.config';

describe('Tailwind CSS Configuration', () => {
  describe('Theme Extensions', () => {
    it('should extend colors with custom design system colors', () => {
      expect(tailwindConfig.theme?.extend?.colors).toHaveProperty('primary');
      expect(tailwindConfig.theme?.extend?.colors).toHaveProperty('secondary');
      expect(tailwindConfig.theme?.extend?.colors).toHaveProperty('accent');
    });

    it('should have custom font family', () => {
      expect(tailwindConfig.theme?.extend?.fontFamily).toBeDefined();
      const fontFamilyConfig = tailwindConfig.theme?.extend?.fontFamily;
      expect(fontFamilyConfig).toBeDefined();

      if (fontFamilyConfig && typeof fontFamilyConfig === 'object' && 'sans' in fontFamilyConfig) {
        const sansFont = fontFamilyConfig.sans;
        expect(Array.isArray(sansFont)).toBe(true);
        if (Array.isArray(sansFont)) {
          expect(sansFont).toContain('Noto Sans JP');
        }
      }
    });

    it('should have extended spacing values', () => {
      const extendedSpacing = tailwindConfig.theme?.extend?.spacing as Record<string, string>;
      expect(extendedSpacing).toBeDefined();
      expect(extendedSpacing['18']).toBe('4.5rem');
    });

    it('should have custom animation values', () => {
      expect(tailwindConfig.theme?.extend?.transitionDuration).toBeDefined();
      const transitionDuration = tailwindConfig.theme?.extend?.transitionDuration as Record<
        string,
        string
      >;
      expect(transitionDuration.normal).toBe('200ms');
    });
  });

  describe('Plugins', () => {
    it('should include required plugins', () => {
      expect(tailwindConfig.plugins).toBeDefined();
      expect(Array.isArray(tailwindConfig.plugins)).toBe(true);
    });
  });

  describe('Content Configuration', () => {
    it('should scan correct file paths', () => {
      expect(tailwindConfig.content).toBeDefined();
      expect(tailwindConfig.content).toContain('./src/pages/**/*.{js,ts,jsx,tsx,mdx}');
      expect(tailwindConfig.content).toContain('./src/components/**/*.{js,ts,jsx,tsx,mdx}');
      expect(tailwindConfig.content).toContain('./src/app/**/*.{js,ts,jsx,tsx,mdx}');
    });
  });
});
