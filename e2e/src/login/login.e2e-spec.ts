import { LoginPage } from './login.po';
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

  it('should have an email input field', () => {
    loginPage.navigateTo('/login');
    expect(loginPage.emailInput).toBeTruthy;
  });

  it('should have a password input field', () => {
    loginPage.navigateTo('/login');
    expect(loginPage.passwordInput).toBeTruthy;
  });

  it('should have an email invalid field', () => {
    loginPage.navigateTo('/login');
    expect(loginPage.emailInvalidMessage).toBeTruthy;
  });

  it('should have a password invalid field', () => {
    loginPage.navigateTo('/login');
    expect(loginPage.passwordInvalidMessage).toBeTruthy;
  });

  it('should have a submit button', () => {
    loginPage.navigateTo('/login');
    expect(loginPage.submitButton).toBeTruthy;
  });

  it('should display an error message when no values are entered in inputs', () => {
    browser.waitForAngularEnabled(false);
    loginPage.navigateTo('/login');

    loginPage.emailInput.click();
    loginPage.passwordInput.click();

    // https://stackoverflow.com/a/52782814/3471923
    loginPage.emailInput.sendKeys(
      protractor.Key.chord(protractor.Key.CONTROL, 'a')
    );
    loginPage.emailInput.sendKeys(protractor.Key.BACK_SPACE);
    loginPage.passwordInput.sendKeys(
      protractor.Key.chord(protractor.Key.CONTROL, 'a')
    );
    loginPage.passwordInput.sendKeys(protractor.Key.BACK_SPACE);

    browser.driver.sleep(100);

    expect(loginPage.emailInvalidMessage).toBeTruthy();
    expect(loginPage.emailInvalidMessage.getText()).toContain(
      'Mail is required'
    );
    expect(loginPage.passwordInvalidMessage).toBeTruthy();
    expect(loginPage.passwordInvalidMessage.getText()).toContain(
      'Password is required'
    );
    expect(loginPage.submitButton.isEnabled()).toBe(false);
    expect(browser.getCurrentUrl()).toContain('localhost:4200/login');
  });

  it('should login', () => {
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
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
    browser.executeScript("window.localStorage.removeItem('jwtToken')");
  });
});
