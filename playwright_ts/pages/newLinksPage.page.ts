import { Page } from "@playwright/test";
import PlaywrightWrapper from "../helpers/PlaywrightWrapper";

export default class NewLinksPage{

    private base: PlaywrightWrapper;

    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }


  private Elements = {
    moreLink: this.page.locator('a.morelink'),
    creationDates: this.page.locator('span.subline > span.age').all(),
  }



  /**
   * Fetches the creation dates of the first specified number of articles.
   *
   * This method retrieves the creation dates of articles as numeric timestamps.
   * It continues to load more articles by clicking the "more" link until the
   * desired number of rankings is reached.
   *
   * @param rankings - The number of articles for which to fetch creation dates.
   * @returns A promise that resolves to an array of numeric timestamps representing
   *          the creation dates of the articles.
   */
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

  /**
   * Extracts creation dates from a list of elements, converts them to numbers, 
   * and appends them to the provided `datesTimes` array until the specified 
   * `rankings` limit is reached.
   *
   * @param creationDates - An array of elements containing date information.
   * @param datesTimes - An array to store the parsed numeric date values.
   * @param rankings - The maximum number of dates to process.
   * @returns The updated `datesTimes` array containing the parsed numeric date values.
   */
  async getCreationDatesAsNumbers(creationDates: any[], datesTimes: number[], rankings: number) {
    for(const date of creationDates) {
      if (datesTimes.length === rankings) {
        break;
      }
      const dateText = await date.getAttribute('title');
      
      // title attribute contains the date and time in the format "2025-05-07T09:41:13 1746610873" and we need to extract the Unix timestamp, representing the number of seconds since January 1, 1970
      const cleanedDate = dateText.split(' ')[1]; // to split the Unix timestamp, alternatively use dateText.substring(dateText.indexOf(' '))
      datesTimes.push(parseInt(cleanedDate));
    }
    return datesTimes;
  }

  /**
   * Checks if an array of dates (represented as numbers) is sorted in descending order.
   *
   * @param datesArray - An array of dates represented as numbers (e.g., timestamps).
   * @returns `true` if the dates are sorted in descending order, otherwise `false`.
   */
  areDatesSortedDescending(datesArray: number[]): boolean {
    for (let i = 0; i < datesArray.length - 1; i++) {
      if (datesArray[i] < datesArray[i + 1]) {
        return false;
      }
    }
    return true;
  }

};
