import { defineConfig, devices } from '@playwright/test';
const envVars = require('dotenv').config({ override: false, path: './.env' }).parsed; // Load environment variables as json object from .env file can be overriden by CLI.
const baseUrl = process.env.BASE_URL;


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Maximum time one test can run for. */
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  // No of workers defined by .env or 2 workers by default
  // @ts-ignore
  workers: parseInt(process.env.WORKERS) || 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { open: 'always' }],
    [
      'allure-playwright',
      {
        outputFolder: 'allure-results', //run 'allure generate ./allure-results --clean -o ./allure-report' and 'allure serve ./allure-results' respectively for Allure reporting
        suiteTitle: true,
      },
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: fetched from .env file to apply the single source
    // @ts-ignore
    baseURL: baseUrl, // alternative use of envVars.BASE_URL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    /* Configure the browser */
    headless: process.env.HEADLESS === 'true' ? true : false, // headless mode is set to false by default
    // attachments:
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 }
       },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'],
    //     viewport: { width: 1920, height: 1080 }
    //    },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'],
    //     viewport: { width: 1920, height: 1080 }
    //    },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

