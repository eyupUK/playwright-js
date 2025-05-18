import { expect, test } from '../fixture';

// get the credentials 
const VALID_EMAIL = process.env.USER_NAME;
const VALID_PASSWORD = process.env.PASSWORD;
const baseUrl = process.env.BASEURL;

// Store negative test cases in an array
// to use Data Driven Testing (DDT) approach
// to avoid code duplication
// and make the code more readable
// and maintainable
// and easier to add new test cases
// and easier to remove test cases
// and easier to modify test cases
// and easier to understand test cases
// and easier to debug test cases
// and easier to run test cases:
const invalidLogins = [
    {
        name: 'empty email',
        email: ' ',
        password: VALID_PASSWORD,
        errorText: 'Please enter a valid email',
    },
    {
        name: 'empty password',
        email: VALID_EMAIL,
        password: ' ',
        errorText: 'Incorrect password',
    },
    {
        name: 'both empty',
        email: ' ',
        password: ' ',
        errorText: 'Please enter a valid email',
    },
    {
        name: 'malformed email (missing @)',
        email: VALID_EMAIL.replace('@', ''),
        password: VALID_PASSWORD,
        errorText: 'Please enter a valid email',
    },
    {
        name: 'malformed email (missing domain)',
        email: VALID_EMAIL.replace('.com', ''),
        password: VALID_PASSWORD,
        errorText: 'Please enter a valid email',
    },
    {
        name: 'malformed email (missing username)',
        email: '@' + VALID_EMAIL.split('@')[1],
        password: VALID_PASSWORD,
        errorText: 'Please enter a valid email',
    },
    {
        name: 'malformed email (missing .)',
        email: VALID_EMAIL.replace('.', ''),
        password: VALID_PASSWORD,
        errorText: 'Please enter a valid email',
    },
];

test.describe('Invalid login cases with DDT', () => {
    test("Test: Invalid credentials", async ({ page, utils }) => {
        await utils.goto(baseUrl + '/login');
        for (const { name, email, password, errorText } of invalidLogins) {
            console.log(`Testing: ${name} with email: ${email} and password: ${password}`);
            await utils.login(email, password);
            await expect(page.getByText(errorText)).toBeVisible();
            await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Log in with email' })).toBeVisible();
            await expect(page).toHaveURL(/\/login$/);
            await expect(page.getByText('New file')).toBeHidden();
            await page.reload();
        }
    });
});


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

    // test('Test 1: Invalid credentials', async ({ page, utils, logger }) => {
    //     // set default timeout to 120 seconds
    //     page.setDefaultTimeout(120000);

    //     const email = process.env.USER_NAME;
    //     const password = process.env.PASSWORD;

    //     // empty email and valid password
    //     await utils.login(" ", password);

    //     // Check if the error message is visible
    //     // Check if the login button is visible
    //     // Check if the login with email button is visible
    //     // Check if the URL is correct
    //     // Check if the new file button is not visible
    //     await expect(async () => {
    //         await expect(page.getByText('Please enter a valid email')).toBeVisible();
    //         await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
    //         await expect(page.getByRole('button', { name: 'Log in with email' })).toBeVisible();
    //         await expect(page.url()).toBe("https://sheets.lido.app/login");
    //         await expect(page.getByText('New file')).not.toBeVisible();
    //     }).toPass();

    //     // wait until that exact error text is gone
    //     // await page
    //     //     .getByText('Please enter a valid email')
    //     //     .waitFor({ state: 'hidden' });

    //     // reload the page to clear the error message
    //     await page.reload();


    //     // empty password and valid email
    //     await utils.login(email, " ");

    //     // Check if the error message is visible
    //     // Check if the login button is visible
    //     // Check if the login with email button is visible
    //     // Check if the URL is correct
    //     // Check if the new file button is not visible
    //     await expect(async () => {
    //         await expect(page.getByText('Incorrect password')).toBeVisible();
    //         await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
    //         await expect(page.getByRole('button', { name: 'Log in with email' })).toBeVisible();
    //         await expect(page.url()).toBe("https://sheets.lido.app/login");
    //         await expect(page.getByText('New file')).not.toBeVisible();
    //     }).toPass();

    //     // plain selector version, same idea for waiting
    //     // wait until that exact error text is gone
    //     // await page.waitForSelector(
    //     //     'text=Incorrect password',
    //     //     { state: 'hidden' }
    //     // );

    //     // reload the page to clear the error message
    //     await page.reload();


    //     // both empty
    //     await utils.login(" ", " ");

    //     // Check if the error message is visible
    //     // Check if the login button is visible
    //     // Check if the login with email button is visible
    //     // Check if the URL is correct
    //     // Check if the new file button is not visible
    //     await expect(async () => {
    //         await expect(page.getByText('Please enter a valid email')).toBeVisible();
    //         await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
    //         await expect(page.getByRole('button', { name: 'Log in with email' })).toBeVisible();
    //         await expect(page.url()).toBe("https://sheets.lido.app/login");
    //         await expect(page.getByText('New file')).not.toBeVisible();
    //     }).toPass();

    //     // wait until that exact error text is gone
    //     // await page
    //     //     .getByText('Please enter a valid email')
    //     //     .waitFor({ state: 'hidden' });

    //     // reload the page to clear the error message
    //     await page.reload();


    //     // malformed email (missing @)
    //     await utils.login(email.replace('@', ''), password);

    //     // Check if the error message is visible
    //     // Check if the login button is visible
    //     // Check if the login with email button is visible
    //     // Check if the URL is correct
    //     // Check if the new file button is not visible
    //     await expect(async () => {
    //         await expect(page.getByText('Please enter a valid email')).toBeVisible();
    //         await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
    //         await expect(page.getByRole('button', { name: 'Log in with email' })).toBeVisible();
    //         await expect(page.url()).toBe("https://sheets.lido.app/login");
    //         await expect(page.getByText('New file')).not.toBeVisible();
    //     }).toPass();
    // });


    test('Test 2: Create and delete file', async ({ page, utils, logger }) => {
        // set default timeout to 120 seconds
        page.setDefaultTimeout(120000);

        const email = process.env.USER_NAME;
        const password = process.env.PASSWORD;
        if (!email || !password) {
            logger.error('EMAIL or PASSWORD is not defined in the environment variables');
            throw new Error('EMAIL or PASSWORD is not defined in the environment variables');
        }
        await utils.login(email, password);


        // Create a unique file name
        const fileName = 'test' + Date.now();
        console.log('File name:', fileName);

        // prevents flakiness 
        await expect(async () => {
            // Click on New file button
            await page.getByText('New file').click();

            // Wait for the file name input to be visible and fill it
            await page.waitForSelector("div[class^='styled__FileTitleInputContainer']");

            // Click on the file name input and fill the unique file name
            await page.locator("div[class^='styled__FileTitleInputContainer']").click();
            await page.locator("div[class^='styled__FileTitleInputContainer']").getByRole('textbox').clear();
            await page.locator("div[class^='styled__FileTitleInputContainer']").getByRole('textbox').fill(fileName);

            // Click on Logo to go to home page
            await page.getByRole('link').filter({ hasText: /^$/ }).click();
        }).toPass({ timeout: 60000 });


        // Assert that the file in the list is created
        await expect(page.getByText(fileName)).toBeVisible();
        expect(await page.getByText(fileName).count()).toBe(1);

        // Filter the file by name
        await page.getByRole('textbox', { name: 'Search files' }).fill(fileName);

        // Assert that the file is created
        await expect(page.getByText(fileName)).toBeVisible();
        expect(await page.getByText(fileName).count()).toBe(1);

        // Click on 3 dots and confirm deleting the file
        await page.locator("div[class^='styled__TableRowContainer']").getByRole('button').click();
        await page.getByRole('menu').getByText('Delete').click();
        await page.getByText('Yes, I\'m sure').click();
        console.log('File deleted: ' + fileName);

        // Filter the file by name
        await page.getByRole('textbox', { name: 'Search files' }).fill(fileName);

        // Assert that the file is deleted
        await expect(page.getByText('No files')).toBeVisible();

        // Unfilter
        await page.getByRole('textbox', { name: 'Search files' }).clear();

        // Assert that the file in the list is deleted
        await expect(page.getByText(fileName)).not.toBeVisible();
    });

    test('Test 3.1: Sort files by name', async ({ page, utils, logger }) => {
        const email = VALID_EMAIL;
        const password = VALID_PASSWORD;
        if (!email || !password) {
            logger.error('EMAIL or PASSWORD is not defined in the environment variables');
            throw new Error('EMAIL or PASSWORD is not defined in the environment variables');
        }
        await utils.login(email, password);

        // Wait for the header row and click to sort descending (Z→A)
        await page.waitForSelector("div[class^='styled__HeaderRowTitle']");
        const fileNameBtn = page.getByText('File name');
        await fileNameBtn.click();
        await page.waitForTimeout(1000);

        // Grab the UI file names as strings like "test1", "test2", etc.
        const fileNames = await page
            .locator("div[class*='styled__FileName']")
            .allInnerTexts();    // => Promise<string[]>


        // 2️⃣ build a sorted‐descending copy
        const sortedDesc = [...fileNames].sort((a, b) =>
            // for plain alphabetic (Z→A); or tweak for numeric parts
            a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
        );
        await page.waitForTimeout(1000);

        // 3️⃣ assert that the UI is already in descending order
        expect(fileNames).toEqual(sortedDesc);

        // Now click again to flip to ascending (A→Z)
        await fileNameBtn.click();

        await page.waitForTimeout(1000);

        // Grab the UI file names as strings like "test1", "test2", etc.
        const fileNamesAsc = await page
            .locator("div[class*='styled__FileName']")
            .allInnerTexts();    // => Promise<string[]>

        // 2️⃣ build a sorted‐ascending copy
        const sortedAsc = [...fileNamesAsc].sort((a, b) =>
            // for plain alphabetic (A→Z); or tweak for numeric parts
            b.localeCompare(a, undefined, { numeric: true, sensitivity: 'base' })
        );
        await page.waitForTimeout(1000);

        // 3️⃣ assert that the UI is already in ascending order
        expect(fileNamesAsc).toEqual(sortedAsc);

    });


    test('Test 3.2: Sort files by date', async ({ page, utils, logger }) => {
        const email = VALID_EMAIL;
        const password = VALID_PASSWORD;
        if (!email || !password) {
            logger.error('EMAIL or PASSWORD is not defined in the environment variables');
            throw new Error('EMAIL or PASSWORD is not defined in the environment variables');
        }
        await utils.login(email, password);

        // Wait for the header row and click to sort ascending (oldest first)
        await page.waitForSelector("div[class^='styled__HeaderRowTitle']");
        const lastUpdatedBtn = page.getByText('Last updated');
        await lastUpdatedBtn.click();

        // Grab the UI dates as strings like "May 20, 2025"
        const datesAsc = await page
            .locator("div[class*='styled__LastUpdatedDate']")
            .allInnerTexts();

        // Parse and sort *ascending* (oldest → newest)
        const sortedAsc = [...datesAsc].sort((a, b) =>
            Date.parse(a) - Date.parse(b)
        );

        // Assert UI is now oldest-first
        expect(datesAsc).toEqual(sortedAsc);

        // Now click again to flip to descending (newest first)
        await lastUpdatedBtn.click();

        // Grab the UI dates as strings like "May 20, 2025"
        const datesDesc = await page
            .locator("div[class*='styled__LastUpdatedDate']")
            .allInnerTexts();

        // Parse and sort *descending* (newest → oldest)
        const sortedDesc = [...datesDesc].sort((a, b) =>
            Date.parse(b) - Date.parse(a)
        );

        // Assert UI is already newest-first
        expect(datesDesc).toEqual(sortedDesc);
    });
    // test('Test 4: Add and delete text component', async ({ page, utils, logger }) => {

    // });

    // test('Test 5: Search files', async ({ page, utils, logger }) => {

    // });


});

