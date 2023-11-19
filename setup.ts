import * as matchers from '@testing-library/jest-dom/matchers';
import { expect, beforeEach, beforeAll, afterEach, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { server } from './test/mocks/server';

expect.extend(matchers);

beforeEach(() => {
  cleanup();
});

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'error',
  });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
