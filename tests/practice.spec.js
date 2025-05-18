import { expect, test } from '../fixture';

// get the credentials 
const VALID_EMAIL    = process.env.USER_NAME;
const VALID_PASSWORD = process.env.PASSWORD;
const baseUrl = process.env.BASEURL;

// List all of your negative test cases here:
const invalidLogins = [
  {
    name:      'empty email',
    email:     ' ',
    password:  VALID_PASSWORD,
    errorText: 'Please enter a valid email',
  },
  {
    name:      'empty password',
    email:     VALID_EMAIL,
    password:  ' ',
    errorText: 'Incorrect password',
  },
  {
    name:      'both empty',
    email:     ' ',
    password:  ' ',
    errorText: 'Please enter a valid email',
  },
  {
    name:      'malformed email (missing @)',
    email:     VALID_EMAIL.replace('@', ''),
    password:  VALID_PASSWORD,
    errorText: 'Please enter a valid email',
  },
];

test.describe('Invalid login cases', () => {
    invalidLogins.forEach(({ name, email, password, errorText }) => {
      test(name, async ({ page, utils }) => {
        await utils.goto(baseUrl + '/login');
        await utils.login(email, password);
        await expect(page.getByText(errorText)).toBeVisible();
        await expect(page).toHaveURL(/\/login$/);
        await expect(page.getByText('New file')).toBeHidden();
      });
    });
  });

// test.describe.parallel('Invalid login cases', () => {
//     invalidLogins.forEach(({ name, email, password, errorText }) => {
//       test(name, async ({ page, utils }) => {
//         await utils.goto(baseUrl + '/login');
//         await utils.login(email, password);
//         await expect(page.getByText(errorText)).toBeVisible();
//         await expect(page).toHaveURL(/\/login$/);
//         await expect(page.getByText('New file')).toBeHidden();
//       });
//     });
//   });
  

test.describe('Dolittle Page Tests', () => {

    // setup 
    test.beforeEach(async ({ page, utils, logger }, testInfo) => {
        logger.info(`🚀 🚀 🚀 ${testInfo.title} 🚀 🚀 🚀 TEST STARTED 🚀 🚀 🚀`);
        const baseUrl = process.env.BASEURL || "https://sheets.lido.app";
        if (!baseUrl) {
            logger.error('BASE_URL is not defined in the environment variables');
            throw new Error('BASE_URL is not defined in the environment variables');
        }
        try {
            await utils.goto(baseUrl + '/login');
            logger.info(`🚀 Navigated to ${baseUrl} by .env`);
        } catch (error) {
            logger.error('Error of navigating to the page:', error);
        }
    });


    // teardown
    test.afterEach(async ({ page, logger }, testInfo) => {
        logger.info(`🏁 🏁 🏁  ${testInfo.title} 🏁 🏁 🏁 TEST FINISHED 🏁 🏁 🏁 `);
        if (testInfo.status === 'failed') {
            logger.fail('Test Failed: ' + testInfo.title);
        }
        else if (testInfo.status === 'passed') {
            logger.pass('Test Result: ' + testInfo.status.toUpperCase());
        }
        else {
            logger.debug('Test Result: ' + testInfo.status.toUpperCase());
        }
        logger.info('Closing the page...');
    });



    test('Hooks: log in and log out', async ({ page, utils, logger }) => {
        const email = VALID_EMAIL;
        const password = VALID_PASSWORD;
        if (!email || !password) {
            logger.error('EMAIL or PASSWORD is not defined in the environment variables');
            throw new Error('EMAIL or PASSWORD is not defined in the environment variables');
        }

        await utils.login(email, password);
        await expect(async () => {
            await expect(page.getByText('New file')).toBeVisible();
            expect(await page.url()).toBe("https://sheets.lido.app/");
            expect(await page.title()).toBe("Lido | Files");
        }).toPass();

        await utils.logout();
        await expect(async () => {
            await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Log in with email' })).toBeVisible();
            await expect(page.url()).toBe("https://sheets.lido.app/login");
            await expect(page.getByText('New file')).not.toBeVisible();
        }).toPass();
    });

    test('Test 1: Invalid credentials', async ({ page, utils, logger }) => {
        const email = VALID_EMAIL;
        const password = VALID_PASSWORD;
        await utils.login(" ", password);
        await expect(async () => {
            await expect(page.getByText('Please enter a valid email')).toBeVisible();
            await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Log in with email' })).toBeVisible();
            await expect(page.url()).toBe("https://sheets.lido.app/login");
            await expect(page.getByText('New file')).not.toBeVisible();
        }).toPass();
        await page.waitForFunction(async (page) =>  {
            return page.getByText('Please enter a valid email').not.toBeVisible();
        }
    );
        await utils.login(email, " ");
        await expect(async () => {
            await expect(page.getByText('Incorrect password')).toBeVisible();
            await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Log in with email' })).toBeVisible();
            await expect(page.url()).toBe("https://sheets.lido.app/login");
            await expect(page.getByText('New file')).not.toBeVisible();
        }).toPass();
        await page.waitForTimeout(1000);
        await utils.login(" ", " ");
        await expect(async () => {
            await expect(page.getByText('Please enter a valid email')).toBeVisible();
            await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Log in with email' })).toBeVisible();
            await expect(page.url()).toBe("https://sheets.lido.app/login");
            await expect(page.getByText('New file')).not.toBeVisible();
        }).toPass();

        await page.waitForTimeout(1000);
        await utils.login(email.replace('@', ''), password);
        await expect(async () => {
            await expect(page.getByText('Please enter a valid email')).toBeVisible();
            await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Log in with email' })).toBeVisible();
            await expect(page.url()).toBe("https://sheets.lido.app/login");
            await expect(page.getByText('New file')).not.toBeVisible();
        }).toPass();
    });


    test('Test 2: Create and delete file', async ({ page, utils, logger }) => {
        const email = VALID_EMAIL;
        const password = VALID_PASSWORD;
        if (!email || !password) {
            logger.error('EMAIL or PASSWORD is not defined in the environment variables');
            throw new Error('EMAIL or PASSWORD is not defined in the environment variables');
        }
        await utils.login(email, password);

        // Create a new file
        await page.getByText('New file').click();
        // rename the file as unique name
        const fileName = 'test' + Date.now();
        console.log('File name:', fileName);
        await page.locator("div[class^='styled__FileTitleInputContainer']").click();
        await page.locator("div[class^='styled__FileTitleInputContainer']").getByRole('textbox').clear();
        await page.locator("div[class^='styled__FileTitleInputContainer']").getByRole('textbox').fill(fileName);

        await page.getByRole('link').filter({ hasText: /^$/ }).click();
        await expect(page.getByText(fileName)).toBeVisible();
        expect(await page.getByText(fileName).count()).toBe(1);
        await page.getByRole('textbox', { name: 'Search files' }).fill(fileName);
        await expect(page.getByText(fileName)).toBeVisible();
        expect(await page.getByText(fileName).count()).toBe(1);

        await page.locator("div[class^='styled__TableRowContainer']").getByRole('button').click();
        await page.getByRole('menu').getByText('Delete').click();
        await page.getByText('Yes, I\'m sure').click();
        console.log('File deleted: '+ fileName);
        await page.getByRole('textbox', { name: 'Search files' }).fill(fileName);
        await expect(page.getByText('No files')).toBeVisible();
        await page.getByRole('textbox', { name: 'Search files' }).clear();
        await expect(page.getByText(fileName)).not.toBeVisible();
    });

    // test('Test 3: Sort files', async ({ page, util, logger }) => {

    // });


    // test('Test 4: Add and delete text component', async ({ page, util, logger }) => {

    // });

    // test('Test 5: Search files', async ({ page, util, logger }) => {

    // });


});

