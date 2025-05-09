import { faker } from '@faker-js/faker';
import { Page } from '@playwright/test';
import PlaywrightWrapper from '../helpers/PlaywrightWrapper';

export default class LoginPage {
  private base: PlaywrightWrapper;

  constructor(private page: Page) {
    this.base = new PlaywrightWrapper(page);
  }

  private Elements = {
    loginUsernameInput: this.page.locator('form').filter({ hasText: 'username:password: login' }).locator('input[name="acct"]'),
    loginPasswordInput: this.page.locator('form').filter({ hasText: 'username:password: login' }).locator('input[name="pw"]'),
    loginBtn: this.page.getByRole('button', { name: 'login' }),
    createAccountUsernameInput: this.page.locator('form').filter({ hasText: 'username:password: create' }).locator('input[name="acct"]'),
    createAccountPasswordInput: this.page.locator('form').filter({ hasText: 'username:password: create' }).locator('input[name="pw"]'),
    createAccountBtn: this.page.getByRole('button', { name: 'create account' }),
    errorMessage: this.page.locator('//body'),
    captcha: this.page.frameLocator('[title="reCAPTCHA"]').locator('#rc-anchor-container'),
    userName: this.page.locator('#me'),
    logOutLink: this.page.locator('#logout')
  }

  async isCaptchaVisible(): Promise<boolean> {
    try {
      await this.Elements.captcha.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async login(username: string, password: string) {
    await this.base.fillTextByLocator(this.Elements.loginUsernameInput, username);
    await this.base.fillTextByLocator(this.Elements.loginPasswordInput, password);
    await this.Elements.loginBtn.click();
  }


  async registerARandomUser() {
    const randomUsername: string = this.createValidUsername();
    const randomPassword: string = faker.internet.password();
    await this.Elements.createAccountUsernameInput.fill(randomUsername);
    await this.Elements.createAccountPasswordInput.fill(randomPassword);
    await this.Elements.createAccountBtn.click();
    return randomUsername;
  }


  async verifyUserSuccessfullyLoggedIn(username: string) {
    await this.page.waitForTimeout(1000);
    if (!(await this.Elements.userName.isVisible())) {
      throw new Error('User name element is not visible on the dashboard.');
    }
    const userNameText = await this.Elements.userName.innerText();
    return userNameText === username;
  }

  /**
   * Generates a sanitized username.
   *
   * This method creates a username using the `faker` library and ensures it is sanitized
   * by removing any characters that are not alphanumeric, underscores, or hyphens.
   * If the sanitized username is less than 2 characters long, it appends a random
   * two-digit number to ensure a minimum length. The final username is truncated
   * to a maximum of 15 characters.
   *
   * @returns {string} A sanitized and truncated username.
   */
  createValidUsername() {
    let rawUsername = faker.internet.username();
    let sanitized = rawUsername.replace(/[^a-zA-Z0-9_-]/g, '');
    if (sanitized.length < 2) {
      sanitized = sanitized + faker.number.int({ min: 10, max: 99 }); // pad
    }
    return sanitized.substring(0, 15)
  }

  async logOutUser() {
    await this.Elements.logOutLink.click();
  }


};
