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

 // Wait for the New file button to be visible
 await page.waitForSelector("div[class^='pages__NewFileButton']");
 // Click on New file button
 await page.getByText('New file', { exact: true }).waitFor({ state: 'visible' })
 await page.getByText('New file', { exact: true }).click();

 // click on DASHBOARD
 await page.locator('div:nth-child(5) > svg').first().waitFor({ state: 'visible' });
 await page.locator('div:nth-child(5) > svg').first().click();
 await page.waitForTimeout(1000);
 await expect(page.getByText('This dashboard is empty')).toBeVisible();

 await page.getByText('Add component').click();

 await page.locator("article[class^='Grid__GridContainer']").waitFor({ state: 'visible', timeout: 30000 });
 await page.locator('#Text').waitFor({ state: 'visible' });

 // Drag and drop the text component to the dashboard
 await page.locator('#Text').hover();
 await page.mouse.down({button: 'left'});
 await page.locator("article[class^='Grid__GridContainer']").hover();
 // await page.locator("div[class^='DashboardUI__GridOuterContainer']").waitFor({ state: 'visible' });
 // await page.locator("div[class^='DashboardUI__GridOuterContainer']").hover();
 // await page.locator("section[class='ax cb cg ay az b0 b1 aq b2 b3 ao b4 b5 b6 b7 b8 at']").hover();
 await page.locator("section[class]").waitFor({ state: 'visible' });
 await page.locator("section[class]").hover();
 // await page.mouse.up({button: 'left'});


 // 2️⃣ Wait for the Components sidebar and canvas to be ready
 // await page.locator('#Text').waitFor({ state: 'visible' });
 // await page.locator('article[class*="Grid_GridContainer"]').waitFor({ state: 'visible' });
 // const textCard = await page.locator('#Text');
 // const canvas = await page.locator('article[class*="Grid_GridContainer"]');


 // 3️⃣ Drag & drop
 // await page.dragAndDrop(
 //     // source: the Text component in the sidebar
 //     textCard,
 //     // target: the empty grid container on the canvas
 //     canvas,
 //     { force: true }
 // );

 //await expect(page.locator("div[class^='GridBlock__ComponentName']")).toBeVisible();
 // await expect(page.locator('section[draggable=true]')).toBeVisible();
 await expect(page.getByText('This dashboard is empty')).not.toBeVisible();


 // await page.getByRole('article').getByRole('button').click();
 // await page.getByRole('menu').getByText('Delete').click();
 const threeDot = await page.locator("button[class^='DashboardComponentMoreOptions__MenuButton']");
 await threeDot.click();
 await page.locator("div[class^='DashboardComponentMoreOptions__MenuItemWrapper']", { hasText: 'Delete' }).click();

 await expect(page.getByText('This dashboard is empty')).toBeVisible();
 await expect(page.locator("div[class^='GridBlock__ComponentName']")).not.toBeVisible();
 await expect(page.locator('section[draggable=true]')).not.toBeVisible();
    });
});

