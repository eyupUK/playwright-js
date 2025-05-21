import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://sheets.lido.app/login');
  await page.locator('[data-test-id="SignInEmail"]').fill('applejuicedrinker@protonmail.com');
  await page.locator('[data-test-id="SignInPassword"]').fill('Aa,1326395265');
  await page.getByRole('button', { name: 'Log in with email' }).click();

  await expect(page).toHaveURL("https://sheets.lido.app/")

  await expect(page.locator('div').filter({ hasText: /^Files$/ })).toBeVisible();

  await expect(page.getByText('New file')).toBeVisible();

  await expect(page.getByRole('link', { name: 'Settings' })).toBeVisible();



//   await page.getByText('New file').click();
});
