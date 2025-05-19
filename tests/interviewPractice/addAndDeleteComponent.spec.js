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

        // login to the application
        try{
            await login(page, email, password);
        }
        catch (error) {
            throw new Error('Error logging in: ' + error);
        }

        const fileName = 'test1747656370782';

        // wait for the page to load
        await page.getByText(fileName).waitFor({ state: 'visible' });

        // open the file
        await page.getByText(fileName).click();

        // click on DASHBOARD view
        await page.locator('div:nth-child(5) > svg').first().waitFor({ state: 'visible' });
        await page.locator('div:nth-child(5) > svg').first().click();

        // confirm that the dashboard is empty
        await expect(page.getByText('This dashboard is empty')).toBeVisible();

        // click on the Add component button
        await page.getByText('Add component').click();

        // wait for the component and target to be visible
        await page.locator("article[class^='Grid__GridContainer']").waitFor({ state: 'visible', timeout: 30000 });
        await page.locator('#Text').waitFor({ state: 'visible' });

        // Drag and drop the text component to the grid area
        await page.locator('#Text').hover();
        await page.locator('#Text').hover();
        await page.mouse.down({ button: 'left' });
        await page.mouse.down({ button: 'left' });
        await page.locator("article[class^='Grid__GridContainer']").hover();
        await page.locator("article[class^='Grid__GridContainer']").hover();
        await page.mouse.up({button: 'left'});
        await page.mouse.up({button: 'left'});


        // assert that the component is added
        await expect(page.locator("div[class^='GridBlock__ComponentName']")).toBeVisible();
        await expect(page.locator('section[draggable=true]')).toBeVisible();
        await expect(page.getByText('This dashboard is empty')).not.toBeVisible();


        // await page.getByRole('article').getByRole('button').click();
        // await page.getByRole('menu').getByText('Delete').click();

        // click on the more options button
        await page.locator("button[class^='DashboardComponentMoreOptions__MenuButton']").click();

        // click on the delete button
        await page.locator("div[class^='DashboardComponentMoreOptions__MenuItemWrapper']", { hasText: 'Delete' }).click();

        // assert that the component is deleted
        await expect(page.getByText('This dashboard is empty')).toBeVisible();
        await expect(page.locator("div[class^='GridBlock__ComponentName']")).not.toBeVisible();
        await expect(page.locator('section[draggable=true]')).not.toBeVisible();
    });
});

