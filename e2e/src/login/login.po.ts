import { by, element, ElementFinder } from 'protractor';
import { BasePageObject } from '../../base.po';

export class LoginPage extends BasePageObject {
  get emailInput(): ElementFinder {
    return element(by.id('emailInputField')) as ElementFinder;
  }

  get passwordInput(): ElementFinder {
    return element(by.id('passwordInputField')) as ElementFinder;
  }

  get submitButton(): ElementFinder {
    return element(by.id('submitButton')) as ElementFinder;
  }

  get emailInvalidMessage(): ElementFinder {
    return element(by.id('emailErrorRequired')) as ElementFinder;
  }

  get passwordInvalidMessage(): ElementFinder {
    return element(by.id('passwordErrorRequired')) as ElementFinder;
  }

  get myAccountbutton(): ElementFinder {
    return element(by.id('accountButton')) as ElementFinder;
  }
}
