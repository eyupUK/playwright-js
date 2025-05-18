import { Locator, Page } from "@playwright/test";

class PlaywrightWrapper {
  constructor(page) {
    this.page = page;
   }

  async goto(url) {
    await this.page.goto(url, {
      waitUntil: "domcontentloaded"
    });
  }

  async waitAndClickOnElementByOtherLocator(locator) {
    const element = this.page.locator(locator);
    await element.waitFor({
      state: "visible",
      timeout: 10000
    });
    await element.click();
  }

  async waitAndClickOnElementByLocatorAPI(locator) {
    const element = locator;
    await element.waitFor({
      state: "visible",
      timeout: 10000
    });
    await element.click();
  }

  async navigateTo(link) {
    await Promise.all([this.page.waitForURL(link), this.page.click(link)]);
  }

  async fillText(locator, text) {
    const element = this.page.locator(locator);
    await element.waitFor({
      state: "visible",
      timeout: 10000
    });
    await element.fill(text);
  }

  async fillTextByLocator(locator, text) {
    const element = locator;
    await element.waitFor({
      state: "visible",
      timeout: 10000
    });
    await element.fill(text);
  }

  async waitForIdle() {
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForLoadState("load");
    await this.page.waitForLoadState("networkidle");
  };

  async isElementVisible(locator) {
    return await this.page.locator(locator).first().isVisible();
  }

  async login(email, password) {
    await this.page.locator('[data-test-id="SignInEmail"]').fill(email);
    await this.page.locator('[data-test-id="SignInPassword"]').fill(password);
    const loginBtn = await this.page.getByRole('button', { name: 'Log in with email' });
    await this.waitAndClickOnElementByLocatorAPI(loginBtn);
  }
  async logout() {
    await this.waitAndClickOnElementByOtherLocator("div[class^='Navbar__IconContainer']");
    const LogOutBtn = await this.page.getByText('Log out');
    await this.waitAndClickOnElementByLocatorAPI(LogOutBtn);
  }



}

module.exports = PlaywrightWrapper;