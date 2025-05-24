import { test, expect } from '@playwright/test';

test('Create file', async ({ page }) => {

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

  // click on the New file button
  await page.getByText('New file').click();

  // click on the untitled file
  await page.locator('div').filter({ hasText: /^untitled$/ }).first().click();

  // fill the name of the file
  await page.locator('div').filter({ hasText: /^untitled$/ }).getByRole('textbox').fill('test12345yfdsddf');

  // go to home page by clicking on the logo
  await page.getByRole('link').click();

  // assert the file name to be test12345yfdsddf
  await expect(page.getByText('test12345yfdsddf', { exact: true })).toBeVisible();

});

test('Create file with a unique name', async ({ page }) => {

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
  
    // click on the New file button
    await page.getByText('New file').click();

    // click on the untitled file
    await page.getByText('untitled').first().click();

    // fill the name of the file
    await page.locator('div').filter({ hasText: /^untitled$/ }).getByRole('textbox').fill('abcde123');

    // go to home page by clicking on the logo
    await page.getByRole('link').click();

    // assert the file name to be test12345yfdsddf
    await expect(page.getByText('abcde123', { exact: true })).toBeVisible();


  });

  test('create file 1', async ({ page }) => {

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
  
    // click on the New file button
    await page.getByText('New file').click();

    // click on the untitled file
    await page.getByText('untitled').first().click();

    // fill the name of the file
    await page.locator('div').filter({ hasText: /^untitled$/ }).getByRole('textbox').fill('abcde123rr');

    // go to home page by clicking on the logo
    await page.getByRole('link').click();

    // assert the file name to be test12345yfdsddf
    await expect(page.getByText('abcde123rr', { exact: true })).toBeVisible();

  });

  test('create file dynamically', async ({ page }) => {

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
  
    // click on the New file button
    await page.getByText('New file').click();

    // click on the untitled file
    await page.getByText('untitled').first().click();

    // create a unique file name dynamically
    const uniqueFileName = `test-${Date.now()}`;
    console.log("filename:", uniqueFileName);

    // fill the name of the file
    await page.locator('div').filter({ hasText: /^untitled$/ }).getByRole('textbox').fill(uniqueFileName);

    // go to home page by clicking on the logo
    await page.getByRole('link').click();

    // assert the file name to be test12345yfdsddf
    await expect(page.getByText(uniqueFileName, { exact: true })).toBeVisible();

  });
  

  test('create and delete file dynamically', async ({ page }) => {

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
  
    // click on the New file button
    await page.getByText('New file').click();

    // click on the untitled file
    await page.getByText('untitled').first().click();

    // create a unique file name dynamically
    const uniqueFileName = `test-${Date.now()}`;
    console.log("filename:", uniqueFileName);

    // fill the name of the file
    await page.locator('div').filter({ hasText: /^untitled$/ }).getByRole('textbox').fill(uniqueFileName);

    // go to home page by clicking on the logo
    await page.getByRole('link').click();

    // assert the file name to be test12345yfdsddf
    await expect(page.getByText(uniqueFileName, { exact: true })).toBeVisible();

    // ==== Delete the file ====

    // search the file by its name
    await page.getByRole('textbox', { name: 'Search files' }).fill(uniqueFileName);

    // click on 3 dots next to the file name
    await page.locator('div').filter({ hasText: uniqueFileName }).getByRole('button').nth(1).click();

    // click on the delete button
    await page.getByRole('menu').getByText('Delete').click();

    // confirm the deletion
    await page.getByText('Yes, I\'m sure').click();

    // assert the file is deleted
    await expect(page.getByText(uniqueFileName, { exact: true })).not.toBeVisible();

    // unfilter the file by its name
    await page.getByRole('textbox', { name: 'Search files' }).clear();

    // assert the file is deleted in the whole file list
    await expect(page.getByText(uniqueFileName, { exact: true })).not.toBeVisible();

  });

  test('create and delete file dynamically 2', async ({ page }) => {

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
  
    // click on the New file button
    await page.getByText('New file').click();

    // click on the untitled file
    await page.getByText('untitled').first().click();

    // create a unique file name dynamically
    const uniqueFileName = `test-${Date.now()}`;
    console.log("filename:", uniqueFileName);

    // fill the name of the file
    await page.locator('div').filter({ hasText: /^untitled$/ }).getByRole('textbox').fill(uniqueFileName);

    // go to home page by clicking on the logo
    await page.getByRole('link').click();

    // assert the file name to be test12345yfdsddf
    await expect(page.getByText(uniqueFileName, { exact: true })).toBeVisible();

    // ==== Delete the file ====

    // search the file by its name
    await page.getByRole('textbox', { name: 'Search files' }).fill(uniqueFileName);

    // click on 3 dots next to the file name
    await page.locator('div').filter({ hasText: uniqueFileName }).getByRole('button').nth(1).click();

    // click on the delete button
    await page.getByRole('menu').getByText('Delete').click();

    // confirm the deletion
    await page.getByText('Yes, I\'m sure').click();

    // assert the file is deleted
    await expect(page.getByText(uniqueFileName, { exact: true })).not.toBeVisible();

    // unfilter the file by its name
    await page.getByRole('textbox', { name: 'Search files' }).clear();

    // assert the file is deleted in the whole file list
    await expect(page.getByText(uniqueFileName, { exact: true })).not.toBeVisible();

  });

  test('create and delete file dynamically 3', async ({ page }) => {

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
  
    // click on the New file button
    await page.getByText('New file').click();

    // click on the untitled file
    await page.getByText('untitled').first().click();

    // create a unique file name dynamically
    const uniqueFileName = `test-${Date.now()}`;
    console.log("filename:", uniqueFileName);

    // fill the name of the file
    await page.locator('div').filter({ hasText: /^untitled$/ }).getByRole('textbox').fill(uniqueFileName);

    // go to home page by clicking on the logo
    await page.getByRole('link').click();

    // assert the file name to be test12345yfdsddf
    await expect(page.getByText(uniqueFileName, { exact: true })).toBeVisible();

    // ==== Delete the file ====

    // search the file by its name
    await page.getByRole('textbox', { name: 'Search files' }).fill(uniqueFileName);

    // click on 3 dots next to the file name
    await page.locator('div').filter({ hasText: uniqueFileName }).getByRole('button').nth(1).click();

    // click on the delete button
    await page.getByRole('menu').getByText('Delete').click();

    // confirm the deletion
    await page.getByText('Yes, I\'m sure').click();

    // assert the file is deleted
    await expect(page.getByText(uniqueFileName, { exact: true })).not.toBeVisible();

    // unfilter the file by its name
    await page.getByRole('textbox', { name: 'Search files' }).clear();

    // assert the file is deleted in the whole file list
    await expect(page.getByText(uniqueFileName, { exact: true })).not.toBeVisible();

  });

  test('create and delete file dynamically 5', async ({ page }) => {

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
  
    // click on the New file button
    await page.getByText('New file').click();

    // click on the untitled file
    await page.getByText('untitled').first().click();

    // create a unique file name dynamically
    const uniqueFileName = `test-${Date.now()}`;
    console.log("created file name:", uniqueFileName);

    // fill the name of the file
    await page.locator('div').filter({ hasText: /^untitled$/ }).getByRole('textbox').fill(uniqueFileName);

    // go to home page by clicking on the logo
    await page.getByRole('link').click();

    // assert the file name to be test12345yfdsddf
    await expect(page.getByText(uniqueFileName, { exact: true })).toBeVisible();

    // ==== Delete the file ====

    // search the file by its name
    await page.getByRole('textbox', { name: 'Search files' }).fill(uniqueFileName);
   
    // click on 3 dots next to the file name
    await page.locator('div').filter({ hasText: uniqueFileName }).getByRole('button').nth(1).click();

    // click on the delete button
    await page.getByText('Delete').click();

    // confirm the deletion
    await page.getByText('Yes, I\'m sure').click();
    
    // assert the file is deleted
    await expect(page.getByText('No files')).toBeVisible();
    
    // unfilter the file by its name
    await page.getByRole('textbox', { name: 'Search files' }).clear();
    

    // assert the file is deleted in the whole file list
    await expect(page.getByText(uniqueFileName)).not.toBeVisible()

    

  });
  

  


  