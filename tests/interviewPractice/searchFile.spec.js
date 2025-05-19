import { expect, test } from '../../fixture';


async function login(page, username, password) {
    await page.locator('[data-test-id="SignInEmail"]').fill(username);
    await page.locator('[data-test-id="SignInPassword"]').fill(password);
    await page.getByRole('button', { name: 'Log in with email' }).click();
}
test.describe('Search file', () => {
    test('Test 2: Search file', async ({ page, utils, logger }) => {
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

        const fileName = 'test1747656370782';

        // Filter the file by name
        await page.getByRole('textbox', { name: 'Search files' }).fill(fileName);

        // Assert that the file is created
        await expect(page.getByText(fileName)).toBeVisible();
        expect(await page.getByText(fileName).count()).toBe(1);
        await expect(page.getByText(fileName)).toHaveCount(1);
        await expect(page.getByText('No files')).not.toBeVisible();
    });
});

   