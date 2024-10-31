import { testObjects } from './test-objects';

Object.defineProperty(window, 'fetch', {
  writable: false,
  value: jest.fn().mockImplementation(() => ({
    ok: true,
    json: () => Promise.resolve(testObjects),
  })),
});
