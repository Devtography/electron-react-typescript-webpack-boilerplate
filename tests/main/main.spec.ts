import { exportedForTests } from '_main/main';

jest.mock('electron', () => ({
  app: { on: jest.fn() },
  ipcMain: { on: jest.fn() },
}));

test('Private props exported for unit tests', () => {
  expect(exportedForTests).toBeDefined();
});
