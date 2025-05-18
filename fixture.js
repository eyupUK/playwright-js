import { test as base } from "@playwright/test";
import { options } from "./helpers/logger";
import PlaywrightWrapper from "./helpers/PlaywrightWrapper";



export const test = base.extend({
  logger:
    async ({ }, use) => {
      // Initialize your logger here
      const logger = options(base.info().title, "debug");//{} as Logger; // Replace with actual logger initialization
      await use(logger);
    },
  utils:
    async ({ page }, use) => {
      // Initialize your base page here
      const utils = new PlaywrightWrapper(page);
      await use(utils);
    },
});


export { expect } from '@playwright/test';


