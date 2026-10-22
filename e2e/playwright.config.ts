import { defineConfig, devices } from '@playwright/test';
import { resolve } from 'path';

const root = resolve(__dirname, '..');
const browser = { ...devices['Desktop Chrome'] };

export default defineConfig({
  testDir: './tests',
  // Run one test at a time
  fullyParallel: false,
  // CI is an env variable set by GitHub Actions. It is unset locally.
  forbidOnly: !!process.env.CI,
  // Retry failed tests once in CI; locally, report failures without retrying.
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  timeout: 30_000,
  expect: { timeout: 10_000 },
  reporter: [
    ['list'],
    ['html', { outputFolder: resolve(root, 'playwright-report'), open: 'never' }],
  ],
  outputDir: resolve(root, 'test-results'),
  use: {
    locale: 'en-US', timezoneId: 'UTC',
    // Record a trace only when a test fails
    trace: 'retain-on-failure',
    // Take a screenshot only when a test fails
    screenshot: 'only-on-failure',
    // Record a video only when a test fails
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'api', testDir: './tests/api', use: { baseURL: 'http://localhost:13000' } },
    { name: 'spaces', testDir: './tests/spaces', use: { ...browser, baseURL: 'http://localhost:13002' } },
    { name: 'public', testDir: './tests/public', use: { ...browser, baseURL: 'http://localhost:13001' } },
  ],
  // Docker manages the API; Playwright starts only the two frontend servers.
  // Refuse occupied frontend ports to avoid using a developer's running app.
  webServer: [
    { command: 'node e2e/start-server.js spaces', url: 'http://localhost:13002', cwd: root, timeout: 180_000, reuseExistingServer: false },
    { command: 'node e2e/start-server.js public', url: 'http://localhost:13001', cwd: root, timeout: 180_000, reuseExistingServer: false },
  ],
});
