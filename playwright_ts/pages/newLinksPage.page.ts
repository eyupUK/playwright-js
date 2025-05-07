import { Page } from "@playwright/test";
import PlaywrightWrapper from "../helpers/PlaywrightWrapper";

export default class NewLinksPage{

    private base: PlaywrightWrapper;

    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    
  private Elements = {
    newsRowLocator: 'tr.athing',
    moreLink: this.page.locator('a.morelink'),
    newsRanks: this.page.locator('tr.athing  td .rank').all(),
    creationDates: this.page.locator('span.subline > span.age').all(),
  }



  async fetchDatesOfTheFirstNumberOfArticles(rankings: number) {
    const creationDates = await this.Elements.creationDates;
    let datesTimes: number[] = [];
    datesTimes = await this.getCreationDatesAsNumbers(creationDates, datesTimes, rankings);
    while (datesTimes.length < rankings) {
      await this.Elements.moreLink.click();
      const tempCreations = await this.Elements.creationDates;
      datesTimes = await this.getCreationDatesAsNumbers(tempCreations, datesTimes, rankings);
    }
    return datesTimes;
  }

  async getCreationDatesAsNumbers(creationDates: any[], datesTimes: number[], rankings: number) {
    for(const date of creationDates) {
      if (datesTimes.length === rankings) {
        break;
      }
      const dateText = await date.getAttribute('title');
      const cleanedDate = dateText.substring(dateText.indexOf(' '));
      datesTimes.push(parseInt(cleanedDate));
    }
    return datesTimes;
  }

  areDatesSortedDescending(datesArray: number[]) {
    for (let i = 0; i < datesArray.length - 1; i++) {
      if (datesArray[i] < datesArray[i + 1]) {
        return false;
      }
    }
    return true;
  }

};
