import { LoginPage } from '../login/login.po';
import {
  browser,
  by,
  element,
  ElementFinder,
  logging,
  protractor,
} from 'protractor';

describe('Create a location test', () => {
  let loginPage: LoginPage;

  beforeEach(() => {
    loginPage = new LoginPage();
  });

  it('should get location', () => {
    browser.waitForAngularEnabled(false);
    loginPage.navigateTo('/login');

    loginPage.emailInput.sendKeys('test@test.com');
    loginPage.passwordInput.sendKeys('secret');
    expect(loginPage.submitButton.isEnabled()).toBe(true);

    loginPage.submitButton.click();

    browser.driver.sleep(500);
    expect(browser.getCurrentUrl()).toContain('/home');

    const jwtToken = "return window.localStorage.getItem('jwtToken');";
    browser.executeScript(jwtToken).then((token) => {
      expect(token).toBeTruthy();
    });

    expect(element(by.id('adminButton'))).toBeTruthy();

    element(by.id('adminButton')).click();

    expect(element(by.id('locationsButton'))).toBeTruthy();

    element(by.id('locationsButton')).click();

    expect(browser.getCurrentUrl()).toContain('/locations');

    browser.driver.sleep(100);

    expect(element(by.id('locationName'))).toBeTruthy();
  });

  it('should update account', () => {
    browser.waitForAngularEnabled(false);
    loginPage.navigateTo('/login');

    loginPage.emailInput.sendKeys('test@test.com');
    loginPage.passwordInput.sendKeys('secret');
    expect(loginPage.submitButton.isEnabled()).toBe(true);

    loginPage.submitButton.click();

    browser.driver.sleep(500);
    expect(browser.getCurrentUrl()).toContain('/home');

    const jwtToken = "return window.localStorage.getItem('jwtToken');";
    browser.executeScript(jwtToken).then((token) => {
      console.log(token);
      expect(token).toBeTruthy();
    });

    expect(element(by.id('accountButton'))).toBeTruthy();

    element(by.id('accountButton')).click();

    expect(browser.getCurrentUrl()).toContain('/account');

    var firstNameField = element(by.id('firstName')) as ElementFinder;
    expect(firstNameField).toBeTruthy();

    var lastNameField = element(by.id('lastName')) as ElementFinder;
    expect(lastNameField).toBeTruthy();

    lastNameField.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a'));
    lastNameField.sendKeys(protractor.Key.BACK_SPACE);
    let submitAccountButton = element(
      by.id('submitAccountButton')
    ) as ElementFinder;
    expect(submitAccountButton.isEnabled()).toBe(false);

    var lastNameError = element(by.id('lastNameError')) as ElementFinder;
    expect(lastNameError).toBeTruthy();
    expect(lastNameError.getText()).toContain('Lastname is required');

    lastNameField.sendKeys('van Avans');

    submitAccountButton = element(
      by.id('submitAccountButton')
    ) as ElementFinder;
    expect(submitAccountButton).toBeTruthy();
    expect(submitAccountButton.isEnabled()).toBe(true);
  });

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
    browser.executeScript("window.localStorage.removeItem('jwtToken')");
  });
});
