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

}

module.exports = PlaywrightWrapper;