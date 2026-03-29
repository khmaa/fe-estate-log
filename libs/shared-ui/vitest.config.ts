import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['text', 'text-summary', 'html', 'lcov'],
    },
  },
});
