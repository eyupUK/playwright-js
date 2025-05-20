import { expect, test } from '../../fixture';


async function login(page, username, password) {
    await page.locator('[data-test-id="SignInEmail"]').fill(username);
    await page.locator('[data-test-id="SignInPassword"]').fill(password);
    await page.getByRole('button', { name: 'Log in with email' }).click();
}
test.describe('Create and delete file', () => {
    test('Test 2: Create and delete file', async ({ page, utils, logger }) => {
        // set default timeout to 120 seconds
        page.setDefaultTimeout(120000);

        const baseUrl = process.env.BASEURL;
        // navigate to the login page
        await page.goto(baseUrl + '/login');

        const email = process.env.USER_NAME;
        const password = process.env.PASSWORD;
        if (!email || !password) {
            logger.error('EMAIL or PASSWORD is not defined in the environment variables');
            throw new Error('EMAIL or PASSWORD is not defined in the environment variables');
        }
        await login(page, email, password);

        // Wait for the New file button to be visible
        await page.waitForSelector("div[class^='pages__NewFileButton']");

        // Click on New file button
        await page.getByText('New file', { exact: true }).waitFor({ state: 'visible', timeout: 5000 });
        await page.getByText('New file', { exact: true }).click();

        // Wait for the file name input to be visible and fill it
        await page.waitForSelector("div[class^='styled__FileTitleInputContainer']");

        // Create a unique file name
        const fileName = 'test' + Date.now();
        console.log('File name:', fileName);

        // Click on the file name input and fill the unique file name
        await page.locator("div[class^='styled__FileTitleInputContainer']").click();
        await page.locator("div[class^='styled__FileTitleInputContainer']").getByRole('textbox').waitFor({ state: 'visible' });
        await page.locator("div[class^='styled__FileTitleInputContainer']").getByRole('textbox').fill(fileName);

        // Click on Logo to go to home page
        await page.getByRole('link').filter({ hasText: /^$/ }).click();

        // Wait for the New file button to be visible
        await page.waitForSelector("div[class^='pages__NewFileButton']");

        // Assert that the file in the list is created
        await expect(page.getByText(fileName)).toBeVisible();
        expect(await page.getByText(fileName).count()).toBe(1);

        // Filter the file by name
        await page.getByRole('textbox', { name: 'Search files' }).fill(fileName);

        // Assert that the file is created
        await expect(page.getByText(fileName)).toBeVisible();
        expect(await page.getByText(fileName).count()).toBe(1);

        // Wait for the New file button to be visible
        await page.waitForSelector("div[class^='pages__NewFileButton']");

        // Click on 3 dots and confirm deleting the file
        await page.locator("div[class^='styled__TableRowContainer']").getByRole('button').click();
        await page.getByRole('menu').getByText('Delete').click();
        await page.getByText('Yes, I\'m sure').click();
        console.log('File deleted: ' + fileName);

        // Filter the file by name
        await page.getByRole('textbox', { name: 'Search files' }).fill(fileName);

        // Assert that the file is deleted
        await expect(page.getByText('No files')).toBeVisible();

        // Unfilter files
        await page.getByRole('textbox', { name: 'Search files' }).clear();

        // Assert that the file in the list is deleted
        await expect(page.getByText(fileName)).not.toBeVisible();
    });
});

