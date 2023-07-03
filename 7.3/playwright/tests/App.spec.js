const { test, expect } = require("@playwright/test");

const user = require('../user.js');

test("valid auth", async ({ page }) => {
  // Go to sign_in
  await page.goto("https://netology.ru/?modal=sign_in");

  // Click and fill Email
  await page.locator('[placeholder="Email"]').click();
  await page.locator('[placeholder="Email"]').fill(user.email);

  // Click and fill Password
  await page.locator('[placeholder="Пароль"]').click();
  await page.locator('[placeholder="Пароль"]').fill(user.password);

  // Click submit
  await page.locator('[data-testid="login-submit-btn"]').click();

  // expect: correct auth
  await expect(page).toHaveURL('https://netology.ru/profile');  
  await expect(page.locator('h2')).toHaveText('Мои курсы и профессии');
});

test("invalid auth", async ({ page }) => {
  // Go to sign_in
  await page.goto("https://netology.ru/?modal=sign_in");

  // Click and fill Email
  await page.locator('[placeholder="Email"]').click();
  await page.locator('[placeholder="Email"]').fill(user.email);

  // Click and fill invalid Password
  await page.locator('[placeholder="Пароль"]').click();
  await page.locator('[placeholder="Пароль"]').fill(user.invalidPassword);
  
  // Click submit
  await page.locator('[data-testid="login-submit-btn"]').click();
  
  await expect(page.locator('[data-testid="login-error-hint"]')).toHaveText('Вы ввели неправильно логин или пароль');
});
