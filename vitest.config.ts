import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['codegen/parser/**/*.test.ts'],
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['codegen/parser/pen-parser.ts'],
      exclude: ['codegen/parser/**/*.test.ts', 'codegen/parser/parse-example.ts']
    }
  }
});
