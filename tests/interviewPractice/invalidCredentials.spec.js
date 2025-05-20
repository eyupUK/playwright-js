import { expect, test } from '../../fixture';

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
async function login(page, username, password) {
    await page.locator('[data-test-id="SignInEmail"]').fill(username);
    await page.locator('[data-test-id="SignInPassword"]').fill(password);
    await page.getByRole('button', { name: 'Log in with email' }).click();
}
test.describe('Invalid login cases with DDT', () => {
    test("Test 3: Invalid credentials", async ({ page, utils }) => {
        await utils.goto(baseUrl + '/login');
        for (const { name, email, password, errorText } of invalidLogins) {
            console.log(`Testing: ${name} with email: ${email} and password: ${password}`);
            await login(page, email, password);
            await expect(page.getByText(errorText)).toBeVisible();
            await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Log in with email' })).toBeVisible();
            await expect(page).toHaveURL(/\/login$/);
            await expect(page.getByText('New file')).not.toBeVisible();;
            await page.reload();
        }
    });
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
