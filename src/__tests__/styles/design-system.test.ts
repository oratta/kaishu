import { describe, it, expect } from '@jest/globals';

import { colors, typography, spacing, breakpoints, shadows, animation } from '@/lib/design-system';

describe('Design System', () => {
  describe('Color System', () => {
    it('should have primary colors defined', () => {
      expect(colors.primary).toBeDefined();
      expect(colors.primary.DEFAULT).toBe('#0F766E');
      expect(colors.primary[50]).toBeDefined();
      expect(colors.primary[900]).toBeDefined();
    });

    it('should have secondary colors defined', () => {
      expect(colors.secondary).toBeDefined();
      expect(colors.secondary.DEFAULT).toBe('#F5E6D3');
      expect(colors.secondary[50]).toBeDefined();
      expect(colors.secondary[900]).toBeDefined();
    });

    it('should have accent colors defined', () => {
      expect(colors.accent).toBeDefined();
      expect(colors.accent.DEFAULT).toBe('#FF6B6B');
      expect(colors.accent[50]).toBeDefined();
      expect(colors.accent[900]).toBeDefined();
    });

    it('should have background colors defined', () => {
      expect(colors.background).toBeDefined();
      expect(colors.background.primary).toBe('#FAFAFA');
      expect(colors.background.secondary).toBe('#F5F5F5');
    });

    it('should have semantic colors defined', () => {
      expect(colors.success).toBeDefined();
      expect(colors.warning).toBeDefined();
      expect(colors.error).toBeDefined();
      expect(colors.info).toBeDefined();
    });
  });

  describe('Typography System', () => {
    it('should have font families defined', () => {
      expect(typography.fontFamily).toBeDefined();
      expect(typography.fontFamily.sans).toContain('Noto Sans JP');
      expect(typography.fontFamily.mono).toContain('monospace');
    });

    it('should have font sizes defined', () => {
      expect(typography.fontSize).toBeDefined();
      expect(typography.fontSize.xs).toBe('0.75rem');
      expect(typography.fontSize.sm).toBe('0.875rem');
      expect(typography.fontSize.base).toBe('1rem');
      expect(typography.fontSize.lg).toBe('1.125rem');
      expect(typography.fontSize.xl).toBe('1.25rem');
      expect(typography.fontSize['2xl']).toBe('1.5rem');
      expect(typography.fontSize['3xl']).toBe('1.875rem');
      expect(typography.fontSize['4xl']).toBe('2.25rem');
      expect(typography.fontSize['5xl']).toBe('3rem');
    });

    it('should have font weights defined', () => {
      expect(typography.fontWeight).toBeDefined();
      expect(typography.fontWeight.normal).toBe('400');
      expect(typography.fontWeight.medium).toBe('500');
      expect(typography.fontWeight.semibold).toBe('600');
      expect(typography.fontWeight.bold).toBe('700');
    });

    it('should have line heights defined', () => {
      expect(typography.lineHeight).toBeDefined();
      expect(typography.lineHeight.tight).toBe('1.25');
      expect(typography.lineHeight.normal).toBe('1.5');
      expect(typography.lineHeight.relaxed).toBe('1.75');
    });
  });

  describe('Spacing System', () => {
    it('should have spacing scale defined', () => {
      expect(spacing).toBeDefined();
      expect(spacing[0]).toBe('0');
      expect(spacing[1]).toBe('0.25rem');
      expect(spacing[2]).toBe('0.5rem');
      expect(spacing[4]).toBe('1rem');
      expect(spacing[8]).toBe('2rem');
      expect(spacing[16]).toBe('4rem');
      expect(spacing[32]).toBe('8rem');
    });
  });

  describe('Responsive Breakpoints', () => {
    it('should have breakpoints defined', () => {
      expect(breakpoints).toBeDefined();
      expect(breakpoints.sm).toBe('640px');
      expect(breakpoints.md).toBe('768px');
      expect(breakpoints.lg).toBe('1024px');
      expect(breakpoints.xl).toBe('1280px');
      expect(breakpoints['2xl']).toBe('1536px');
    });
  });

  describe('Shadows', () => {
    it('should have shadow scale defined', () => {
      expect(shadows).toBeDefined();
      expect(shadows.sm).toBeDefined();
      expect(shadows.DEFAULT).toBeDefined();
      expect(shadows.md).toBeDefined();
      expect(shadows.lg).toBeDefined();
      expect(shadows.xl).toBeDefined();
    });
  });

  describe('Animation', () => {
    it('should have animation duration defined', () => {
      expect(animation.duration).toBeDefined();
      expect(animation.duration.fast).toBe('150ms');
      expect(animation.duration.normal).toBe('200ms');
      expect(animation.duration.slow).toBe('300ms');
    });

    it('should have animation easing defined', () => {
      expect(animation.easing).toBeDefined();
      expect(animation.easing.DEFAULT).toBe('cubic-bezier(0.4, 0.0, 0.2, 1)');
      expect(animation.easing.in).toBeDefined();
      expect(animation.easing.out).toBeDefined();
      expect(animation.easing.inOut).toBeDefined();
    });
  });
});
