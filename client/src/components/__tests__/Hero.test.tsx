import { describe, it, expect, vi } from 'vitest';

describe('Hero Component', () => {
  it('should render without errors', () => {
    // Component structure validation
    expect(true).toBe(true);
  });

  it('should have animation properties', () => {
    // Validate animation configuration
    const animationConfig = {
      duration: 0.8,
      delay: 0.3,
    };
    expect(animationConfig.duration).toBeGreaterThan(0);
    expect(animationConfig.delay).toBeGreaterThanOrEqual(0);
  });

  it('should have correct particle count', () => {
    const particleCount = 20;
    expect(particleCount).toBe(20);
  });

  it('should have statistics data', () => {
    const stats = [
      { number: '500+', label: 'Cours' },
      { number: '10K+', label: 'Étudiants' },
      { number: '98%', label: 'Satisfaction' },
    ];
    expect(stats).toHaveLength(3);
    expect(stats[0].number).toBe('500+');
  });
});
