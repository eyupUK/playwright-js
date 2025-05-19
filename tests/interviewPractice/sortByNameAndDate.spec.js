import { expect, test } from '../../fixture';


async function login(page, username, password) {
    await page.locator('[data-test-id="SignInEmail"]').fill(username);
    await page.locator('[data-test-id="SignInPassword"]').fill(password);
    await page.getByRole('button', { name: 'Log in with email' }).click();
}
test.describe('Sort by Name and Date in Descending Order', () => {
    test('Test 2: Sort by Name and Date in Descending Order', async ({ page, utils, logger }) => {
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

        // Wait for the header row and click on row header to sort by descending (Z→A)
        await page.waitForSelector("div[class^='styled__HeaderRowTitle']");
        await page.getByText('File name').dblclick();
        await page.waitForTimeout(1000);

        // Grab the UI file names as strings like "test1", "test2", etc.
        const fileNamesDesc = await page
            .locator("div[class*='styled__FileName']")
            .allInnerTexts();    // => Promise<string[]>

        console.log("fileNamesDesc:", fileNamesDesc);

        // build a sorted‐descending copy
        const sortedNamesDesc = [...fileNamesDesc].sort((a, b) =>
            // for plain alphabetic (Z→A); or tweak for numeric parts
            b.localeCompare(a, undefined, { numeric: true, sensitivity: 'base' })
        );
        await page.waitForTimeout(1000);

        // 3️⃣ assert that the UI is already in descending order
        expect(fileNamesDesc).toEqual(sortedNamesDesc);

        //===================Sort by Date=========================

        // Now click on row header to sort by descending (newest first)
        await page.getByText('Last updated').dblclick();

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
});

