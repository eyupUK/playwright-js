import { test as base} from "@playwright/test";
import { Logger } from "winston";
import { options } from "./helpers/logger";


type Fixtures = {
    // set types of your fixtures
    logger: Logger;
  };
  
  
export const test = base.extend<Fixtures>({
    logger: 
      async ({}, use) => {
        // Initialize your logger here
        const logger = options(base.info().title, "debug");//{} as Logger; // Replace with actual logger initialization
        await use(logger);
      }
  });

export { expect } from '@playwright/test';


