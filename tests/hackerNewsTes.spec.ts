import NewLinksPage from '../pages/newLinksPage.page';
import LoginPage from '../pages/loginPage.page';
import BasePage from '../pages/basePage.page';
import PlaywrightWrapper from "../helpers/PlaywrightWrapper";
import { expect, test } from '../fixture';
import APIUtils from '../helpers/apiUtils';


let newLinksPage: NewLinksPage;
let loginPage: LoginPage;
let basePage: BasePage;
let base: PlaywrightWrapper;

test.describe('HackerNews Page Tests', () => {

  // setup 
  test.beforeEach(async ({ page, logger }, testInfo) => {
    base = new PlaywrightWrapper(page);
    logger.info(`🚀 🚀 🚀 ${testInfo.title} 🚀 🚀 🚀 TEST STARTED 🚀 🚀 🚀`);
    const baseUrl = process.env.BASE_URL;
    if (!baseUrl) {
      logger.error('BASE_URL is not defined in the environment variables');
      throw new Error('BASE_URL is not defined in the environment variables');
    }
    try {
      await page.goto('/newest');
      logger.info(`🚀 Navigated to ${baseUrl} by playwright.config.js`);
    } catch (error) {
      logger.error('Error of navigating to the page:', error);
      await base.navigateTo(baseUrl + '/newest');
      logger.info(`🚀 Navigated to ${baseUrl} by .env`);
    }

    loginPage = new LoginPage(page);
    newLinksPage = new NewLinksPage(page);
    basePage = new BasePage(page);
  });


  // teardown
  test.afterEach(async ({ page, logger }, testInfo) => {
    logger.info(`🏁 🏁 🏁  ${testInfo.title} 🏁 🏁 🏁 TEST FINISHED 🏁 🏁 🏁 `);
    if (testInfo.status === 'failed') {
      logger.fail('Test Failed: ' + testInfo.title);
    }
    else if (testInfo.status === 'passed') {
      logger.pass('Test Result: ' + testInfo.status.toUpperCase());
    }
    else {
      logger.debug('Test Result: ' + testInfo.status.toUpperCase());
    }
    logger.info('Closing the page...');
  });



  test('Task 1: Verify the first 100 articles are sorted by the descendant date and time', async ({ page, logger }) => {
    logger.info('Extracting dates and times of the first 100 articles');
    let datesTimes: number[] = [];
    try {
      datesTimes = await newLinksPage.fetchDatesOfTheFirstNumberOfArticles(100);
    } catch (error) {
      logger.error('An error occurred while fetching the dates and times: ' + error);
      throw error;
    }
    logger.info('Asserting the dates and times are sorted in descending order');
    try {
      expect(newLinksPage.areDatesSortedDescending(datesTimes)).toBe(true);
    } catch (error) {
      logger.error('An error occurred while fetching the dates and times: ' + error);
      throw error;
    }
  });

  test('Sample Captcha Handling: Register a new random user test', async ({ page, logger }) => {
    await basePage.goToLoginPage();
    const randomUsername = await loginPage.registerARandomUser();
    await page.waitForTimeout(1000);
    try {
      logger.info('Attempting to verify if user is logged in successfully...');
      const isLoggedIn = await loginPage.verifyUserSuccessfullyLoggedIn(randomUsername);
      expect(isLoggedIn).toBeTruthy();
      logger.info('A Random user is registered successfully');
      await loginPage.logOutUser();
    } catch (error) {
      const isCaptchaVisible = await loginPage.isCaptchaVisible();
      if (isCaptchaVisible) {
        expect(await loginPage.isCaptchaVisible()).toBeTruthy();
        logger.info('Captcha Screen is displayed. Please try again later');
      }
      else {
        logger.error('An unexpected error occurred: ' + error);
        throw error;
      }
    }
  });

  test('Sample Login Test: Verify the user logs in with valid credentials successfully', async ({ page, logger }) => {
    await basePage.goToLoginPage();
    const username = require('../credentials.json').username;
    const password = require('../credentials.json').password;

    if (!username || !password) {
      logger.error('USERNAME or PASSWORD is not defined in credentials.json');
      throw new Error('USERNAME or PASSWORD is not defined in credentials.json');
    }
    try {
      await loginPage.login(username, password);
      await page.waitForTimeout(1000);
    } catch (error) {
      logger.error('An unexpected error occurred: ' + error);
      throw error;
    }
    try {
      logger.info('Attempting to verify if user is logged in successfully...');
      const isLoggedIn = await loginPage.verifyUserSuccessfullyLoggedIn(username);
      expect(isLoggedIn).toBeTruthy();
    } catch (error) {
      logger.error('An unexpected error occurred: ' + error);
      throw error;
    }
  });




  test('Sample Dynamic XPath: Verify the top navigation bar tabs take to the relevant pages', async ({ page, logger }) => {
    const tabs = ['new', 'past', 'comments', 'ask', 'show', 'jobs', 'submit'];
    try {
      for (let i = 0; i < tabs.length; i++) {
        logger.info(`Clicking on ${tabs[i]} tab...`);
        await basePage.navigateToTab(tabs[i]);
        if (tabs[i] === 'submit') {
          expect(page.url()).toContain(tabs[i]);
        }
        else if (tabs[i] === 'past') {
          expect((await page.title()).toLowerCase()).toContain('front');
        } else {
          expect((await page.title()).toLowerCase()).toContain(tabs[i]);
        }
      }
    } catch (error) {
      logger.error(`An error occurred while verifying the tabs: ${error}`);
      throw error;
    }
  });

});

test.describe('HackerNews API Tests', () => {

  // API setup 
  test.beforeEach(async ({ logger }, testInfo) => {
    logger.info(`🚀 🚀 🚀 ${testInfo.title} 🚀 🚀 🚀 TEST STARTED 🚀 🚀 🚀`);
    // setup API client or any other necessary setup
  });


  // API teardown
  test.afterEach(async ({ logger }, testInfo) => {
    logger.info(`🏁 🏁 🏁  ${testInfo.title} 🏁 🏁 🏁 TEST FINISHED 🏁 🏁 🏁 `);
    if (testInfo.status === 'failed') {
      logger.fail('Test Failed: ' + testInfo.title);
    }
    else if (testInfo.status === 'passed') {
      logger.pass('Test Result: ' + testInfo.status.toUpperCase());
    }
    else {
      logger.debug('Test Result: ' + testInfo.status.toUpperCase());
    }
  });


  test('API Test Case: Verify the API correctly displays the detail of the user account pre-registered by Create Accout on UI', async ({ logger }) => {
    // This test is based on the documentation in https://github.com/HackerNews/API
    const username = require('../credentials.json').username;
    const response = await APIUtils.sendRequest(`https://hacker-news.firebaseio.com/v0/user/${username}.json?print=pretty`, "get", "")
    const responseData = await response.data;
    expect(response.status).toBe(200);
    expect(responseData).toBeDefined();
    expect(responseData.created).toBe(1746693891);
    expect(responseData.karma).toBe(1);
    expect(responseData.id).toBe("eyuptesting");
    logger.info(`User account details: ${JSON.stringify(responseData)}`);
  });
});
