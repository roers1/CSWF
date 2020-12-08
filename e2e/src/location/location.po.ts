import { by, element, ElementFinder } from 'protractor';
import { BasePageObject } from '../../base.po';

export class HomePage extends BasePageObject {
  get adminButton(): ElementFinder {
    return element(by.id('adminButton')) as ElementFinder;
  }

  get locationButton(): ElementFinder {
    return element(by.id('locationsButton')) as ElementFinder;
  }
}
