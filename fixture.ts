import { test as base} from "@playwright/test";
import { Logger } from "winston";
import { options } from "./helpers/logger";


type Fixtures = {
    // set types of your fixtures
    logger: Logger;
    userToken: string;
  };
  
  
export const test = base.extend<Fixtures>({
    logger: 
      async ({}, use) => {
        // Initialize your logger here
        const logger = options(base.info().title, "debug");//{} as Logger; // Replace with actual logger initialization
        await use(logger);
      },
      userToken: async ({}, use) => {
        // You can generate or fetch a token here for authentication
        // For example, you might want to call an API to get a token
        // or use a hardcoded token for testing purposes
        const token = 'fake-token-123';
        await use(token);
      },
  });
  

export { expect } from '@playwright/test';


