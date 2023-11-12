import * as matchers from '@testing-library/jest-dom/matchers';
import { expect, beforeEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

expect.extend(matchers);

beforeEach(() => {
  cleanup();
});
