import { Locator, Page } from "@playwright/test";

export default class PlaywrightWrapper {
  constructor(private page: Page) { }

  async goto(url: string) {
    await this.page.goto(url, {
      waitUntil: "domcontentloaded"
    });
  }

  async waitAndClickOnElementByOtherLocator(locator: string) {
    const element = this.page.locator(locator);
    await element.waitFor({
      state: "visible",
      timeout: 10000
    });
    await element.click();
  }

  async waitAndClickOnElementByLocatorAPI(locator: Locator) {
    const element = locator;
    await element.waitFor({
      state: "visible",
      timeout: 10000
    });
    await element.click();
  }

  async navigateTo(link: string) {
    await Promise.all([this.page.waitForURL(link), this.page.click(link)]);
  }

  async fillText(locator: string, text: string) {
    const element = this.page.locator(locator);
    await element.waitFor({
      state: "visible",
      timeout: 10000
    });
    await element.fill(text);
  }

  async fillTextByLocator(locator: Locator, text: string) {
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

  async isElementVisible(locator: string) {
    return await this.page.locator(locator).first().isVisible();
  }

}