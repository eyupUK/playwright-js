import { Page } from '@playwright/test';
import PlaywrightWrapper from '../helpers/PlaywrightWrapper';

export default class BasePage {

  /**
   * A wrapper instance of Playwright that provides utility methods
   * for interacting with the browser, pages, and elements.
   * This serves as the base for page-specific actions.
   */
  private base: PlaywrightWrapper;

  constructor(private page: Page) {
    this.base = new PlaywrightWrapper(page);
  }


  /**
   * A collection of locators for various elements on the page.
   * Some locators are defined using Playwright's locator API
   * Some locators are defined using XPath and role selectors
   * @property hackerNewsLink - XPath locator for the "Hacker News" link.
   * @property pastLink - Locator for the "past" link using Playwright's `locator` method.
   * @property newLink - Locator for the "new" link, identified by its role and exact name.
   * @property commentsLink - Locator for the "comments" link, identified by its role and exact name.
   * @property askLink - Locator for the "ask" link, identified by its role and name.
   * @property showLink - Locator for the "show" link, identified by its role and name.
   * @property jobsLink - Locator for the "jobs" link, identified by its role and name.
   * @property submitLink - Locator for the "submit" link, identified by its role and name.
   * @property loginLink - Locator for the "login" link, identified by its role and name.
   */
  private Elements = {
    hackerNewsLink: "//a[.='Hacker News']",
    pastLink: this.page.locator("//a[.='past']"),
    newLink: this.page.getByRole('link', { name: 'new', exact: true }),
    commentsLink: this.page.getByRole('link', { name: 'comments', exact: true }),
    askLink: this.page.getByRole('link', { name: 'ask' }),
    showLink: this.page.getByRole('link', { name: 'show' }),
    jobsLink: this.page.getByRole('link', { name: 'jobs' }),
    submitLink: this.page.getByRole('link', { name: 'submit' }),
    loginLink: this.page.getByRole('link', { name: 'login' })
  }

  /**
   * Navigates to a specific tab on the page by clicking on the tab link.
   *
   * @param tabName - The name of the tab to navigate to. This should match the text of the tab link exactly.
   * @returns A promise that resolves when the click action is completed.
   */
  async navigateToTab(tabName: string) {
    await this.page.locator("//span[@class='pagetop']//a[.='" + tabName + "']").click();
  }


  async goToHomePage() {
    await this.base.waitAndClickOnElementByOtherLocator(this.Elements.hackerNewsLink);
  }

  async goToLoginPage() {
    await this.base.waitAndClickOnElementByLocatorAPI(this.Elements.loginLink);
  }
};
