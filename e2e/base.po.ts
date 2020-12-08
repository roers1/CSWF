import { browser } from 'protractor';

export class BasePageObject {
  //
  navigateTo(path: string = ''): Promise<any> {
    return browser.get(browser.baseUrl + path) as Promise<any>;
  }
}
