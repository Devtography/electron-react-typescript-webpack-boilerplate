import { jest } from '@jest/globals';

test('NODE_ENV=test', async () => {
  process.env.NODE_ENV = 'test';
  jest.resetModules();

  const nodeEnv = await import('_utils/node-env');

  expect(nodeEnv.test).toBeTruthy();
  expect(nodeEnv.dev).toBeFalsy();
  expect(nodeEnv.prod).toBeFalsy();
});

test('NODE_ENV=development', async () => {
  process.env.NODE_ENV = 'development';
  jest.resetModules();

  const nodeEnv = await import('_utils/node-env');

  expect(nodeEnv.dev).toBeTruthy();
  expect(nodeEnv.prod).toBeFalsy();
  expect(nodeEnv.test).toBeFalsy();
});

test('NODE_ENV=production', async () => {
  process.env.NODE_ENV = 'production';
  jest.resetModules();

  const nodeEnv = await import('_utils/node-env');

  expect(nodeEnv.prod).toBeTruthy();
  expect(nodeEnv.dev).toBeFalsy();
  expect(nodeEnv.test).toBeFalsy();
});
