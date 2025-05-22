import { test, expect } from '@playwright/test';

test('log in with valid credentials', async ({ page }) => {

  // Go to https://sheets.lido.app/login
  await page.goto('https://sheets.lido.app/login');

  // fill password
  await page.locator('[data-test-id="SignInPassword"]').fill('Aa,1326395265');

  //fill email
  await page.locator('[data-test-id="SignInEmail"]').fill('applejuicedrinker@protonmail.com');

  //click on the log in button
  await page.getByRole('button', { name: 'Log in with email' }).click();

  // assert the url to be https://sheets.lido.app/
  await expect(page).toHaveURL("https://sheets.lido.app/");

  // assert the elements to be visible
  await expect (page.locator('div').filter({ hasText: /^Files$/ })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Connections' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Billing & Usage' })).toBeVisible();

});

test('log in with invalid credentials 1 (missing @)', async ({ page }) => {

    // Go to https://sheets.lido.app/login
    await page.goto('https://sheets.lido.app/login');
  
    // fill password
    await page.locator('[data-test-id="SignInPassword"]').fill('Aa,1326395265');
  
    //fill email
    await page.locator('[data-test-id="SignInEmail"]').fill('applejuicedrinkerprotonmail.com');
  
    //click on the log in button
    await page.getByRole('button', { name: 'Log in with email' }).click();
  
    // assert the url to be https://sheets.lido.app/
    await expect(page).toHaveURL("https://sheets.lido.app/login");

    // assert the error message to be visible
    await expect(page.getByText('Please enter a valid email address.')).toBeVisible();
  
    // assert the elements to be visible
    await expect (page.locator('div').filter({ hasText: /^Files$/ })).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'Connections' })).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'Billing & Usage' })).not.toBeVisible();
  
  });

  test('log in with invalid credentials 2(email or password incorrect)', async ({ page }) => {

    // Go to https://sheets.lido.app/login
    await page.goto('https://sheets.lido.app/login');
  
    // fill password
    await page.locator('[data-test-id="SignInPassword"]').fill('Aa,132639526');
  
    //fill email
    await page.locator('[data-test-id="SignInEmail"]').fill('applejuicedrinker@protonmail.com');
  
    //click on the log in button
    await page.getByRole('button', { name: 'Log in with email' }).click();
  
    // assert the url to be https://sheets.lido.app/
    await expect(page).toHaveURL("https://sheets.lido.app/login");

    // assert the error message to be visible
    await expect(page.getByText('Email or password incorrect.')).toBeVisible();
  
    // assert the elements to be visible
    await expect (page.locator('div').filter({ hasText: /^Files$/ })).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'Connections' })).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'Billing & Usage' })).not.toBeVisible();
  
  });

  test('log in with invalid credentials 3(empty password)', async ({ page }) => {

    // Go to https://sheets.lido.app/login
    await page.goto('https://sheets.lido.app/login');
  
    // fill password
    await page.locator('[data-test-id="SignInPassword"]').fill('');
  
    //fill email
    await page.locator('[data-test-id="SignInEmail"]').fill('applejuicedrinker@protonmail.com');
  
    //click on the log in button
    await page.getByRole('button', { name: 'Log in with email' }).click();
  
    // assert the url to be https://sheets.lido.app/
    await expect(page).toHaveURL("https://sheets.lido.app/login");

    // assert the error message to be visible
    await expect(page.getByText('Incorrect password')).toBeVisible();
  
    // assert the elements NOT to be visible
    await expect (page.locator('div').filter({ hasText: /^Files$/ })).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'Connections' })).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'Billing & Usage' })).not.toBeVisible();
  
  });

  test('log in with invalid credentials 4(empty email)', async ({ page }) => {

    // Go to https://sheets.lido.app/login
    await page.goto('https://sheets.lido.app/login');
  
    // fill password
    await page.locator('[data-test-id="SignInPassword"]').fill('Aa,1326395265');
  
    //fill email
    await page.locator('[data-test-id="SignInEmail"]').fill('');
  
    //click on the log in button
    await page.getByRole('button', { name: 'Log in with email' }).click();
  
    // assert the url to be https://sheets.lido.app/
    await expect(page).toHaveURL("https://sheets.lido.app/login");

    // assert the error message to be visible
    await expect(page.getByText('Please enter a valid email address.')).toBeVisible();
  
    // assert the elements NOT to be visible
    await expect (page.locator('div').filter({ hasText: /^Files$/ })).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'Connections' })).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'Billing & Usage' })).not.toBeVisible();
  
  });

  test('log in with invalid credentials 5(white space password)', async ({ page }) => {

    // Go to https://staging-sheets.lido.app/login
    await page.goto('https://sheets.lido.app/login');
  
    // fill password
    await page.locator('[data-test-id="SignInPassword"]').fill('Aa,1326395265');
  
    //fill email
    await page.locator('[data-test-id="SignInEmail"]').fill(' ');
  
    //click on the log in button
    await page.getByRole('button', { name: 'Log in with email' }).click();
  
    // assert the url to be https://sheets.lido.app/
    await expect(page).toHaveURL("https://sheets.lido.app/login");

    // assert the error message to be visible
    await expect(page.getByText('Please enter a valid email address.')).toBeVisible();
  
    // assert the elements NOT to be visible
    await expect (page.locator('div').filter({ hasText: /^Files$/ })).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'Connections' })).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'Billing & Usage' })).not.toBeVisible();
  
  });

  test('log in with invalid credentials 6 ( adding whitespace )', async ({ page }) => {

    // Go to https://sheets.lido.app/login
    await page.goto('https://sheets.lido.app/login');
  
    // fill password
    await page.locator('[data-test-id="SignInPassword"]').fill('Aa,1326395265');
  
    //fill email
    await page.locator('[data-test-id="SignInEmail"]').fill(' applejuicedrinker@protonmail.com');
  
    //click on the log in button
    await page.getByRole('button', { name: 'Log in with email' }).click();
  
    // assert the url to be https://sheets.lido.app/
    await expect(page).toHaveURL("https://sheets.lido.app/login");

    // assert the error message to be visible
    await expect(page.getByText('Please enter a valid email address.')).toBeVisible();
  
    // assert the elements NOT to be visible
    await expect (page.locator('div').filter({ hasText: /^Files$/ })).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'Connections' })).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'Billing & Usage' })).not.toBeVisible();
  
  });

  test('log in with invalid credentials 7 ( missing dot .)', async ({ page }) => {

    // Go to https://sheets.lido.app/login
    await page.goto('https://sheets.lido.app/login');
  
    // fill password
    await page.locator('[data-test-id="SignInPassword"]').fill('Aa,1326395265');
  
    //fill email
    await page.locator('[data-test-id="SignInEmail"]').fill('applejuicedrinker@protonmailcom');
  
    //click on the log in button
    await page.getByRole('button', { name: 'Log in with email' }).click();
  
    // assert the url to be https://sheets.lido.app/
    await expect(page).toHaveURL("https://sheets.lido.app/login");

    // assert the error message to be visible
    await expect(page.getByText('Please enter a valid email address.')).toBeVisible();
  
    // assert the elements NOT to be visible
    await expect (page.locator('div').filter({ hasText: /^Files$/ })).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'Connections' })).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'Billing & Usage' })).not.toBeVisible();
  
  });

  test('log in with invalid credentials 8 (missing extension com)', async ({ page }) => {

    // Go to https://sheets.lido.app/login
    await page.goto('https://sheets.lido.app/login');
  
    // fill password
    await page.locator('[data-test-id="SignInPassword"]').fill('Aa,1326395265');
  
    //fill email
    await page.locator('[data-test-id="SignInEmail"]').fill('applejuicedrinker@protonmail.');
  
    //click on the log in button
    await page.getByRole('button', { name: 'Log in with email' }).click();
  
    // assert the url to be https://sheets.lido.app/
    await expect(page).toHaveURL("https://sheets.lido.app/login");

    // assert the error message to be visible
    await expect(page.getByText('Please enter a valid email address.')).toBeVisible();
  
    // assert the elements NOT to be visible
    await expect (page.locator('div').filter({ hasText: /^Files$/ })).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'Connections' })).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'Billing & Usage' })).not.toBeVisible();
  
  });

  test('log in with invalid credentials 9 (missing extension .com)', async ({ page }) => {

    // Go to https://sheets.lido.app/login
    await page.goto('https://sheets.lido.app/login');
  
    // fill password
    await page.locator('[data-test-id="SignInPassword"]').fill('Aa,1326395265');
  
    //fill email
    await page.locator('[data-test-id="SignInEmail"]').fill('applejuicedrinker@protonmail');
  
    //click on the log in button
    await page.getByRole('button', { name: 'Log in with email' }).click();
  
    // assert the url to be https://sheets.lido.app/
    await expect(page).toHaveURL("https://sheets.lido.app/login");

    // assert the error message to be visible
    await expect(page.getByText('Please enter a valid email address.')).toBeVisible();
  
    // assert the elements NOT to be visible
    await expect (page.locator('div').filter({ hasText: /^Files$/ })).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'Connections' })).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'Billing & Usage' })).not.toBeVisible();
  
  });