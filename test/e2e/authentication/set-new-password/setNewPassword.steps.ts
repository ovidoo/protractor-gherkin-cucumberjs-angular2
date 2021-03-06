let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

import { binding, given, when, then } from "cucumber-tsflow";
import Callback = cucumber.CallbackStepDefinition;

import { SetNewPasswordPageObject } from './setNewPassword.page';

@binding()
class SetNewPasswordSteps {

  private setNewPasswordPageObject: SetNewPasswordPageObject = new SetNewPasswordPageObject();

  // the id & nonce in the set new password link
  private currentId: string;
  private currentNonce: string;

  @given(/^'(.*)' is the provided nonce in the email link$/)
  private givenNonce(nonce: string, callback: Callback): void {
    this.currentNonce = nonce;
    callback();
  };

  @given(/^'(.*)' is the id representing the user in the email link$/)
  private givenId(id: string, callback: Callback): void {
    this.currentId = id;
    callback();
  };

  @when(/^using the link to the set new password page$/)
  private whenGetPage(callback: Callback): void {
    this.setNewPasswordPageObject.getPage(this.currentId, this.currentNonce);
    callback();
  };

  @then(/^the set new password request is validated '(.*)'$/)
  private thenRequestIsValidated(valid: string, callback: Callback): void {
    let isValid = valid === 'true';
    this.currentId = undefined;
    this.currentNonce = undefined;
    expect(this.setNewPasswordPageObject.hasAlertMessages()).to.become(!isValid).and.notify(callback);
  };

  ///
  // ***
  ///

  @given(/^user clicks the valid set new password link$/)
  private givenUserClicksTheSetNewPasswordLink(callback: Callback): void {
    this.setNewPasswordPageObject.getPage('1', '123');
    expect(this.setNewPasswordPageObject.hasFormElements()).to.become(true).and.notify(callback);
    //callback();
  };

  @given(/^'(.*)' is the provided new password in the set new password form$/)
  private givenPassword(password: string, callback: Callback): void {
    this.setNewPasswordPageObject.setPassword(password);
    callback();
  };

  @given(/^'(.*)' is the repeated new password in the set new password form$/)
  private givenRepeatPassword(repeatPassword: string, callback: Callback): void {
    this.setNewPasswordPageObject.setRepeatPassword(repeatPassword);
    callback();
  };

  @when(/^submitting the set new password form$/)
  private whenSubmitForm(callback: Callback): void {
    this.setNewPasswordPageObject.submitForm();
    callback();
  };

  @then(/^the set new password form is validated '(.*)'$/)
  private thenNewPasswordFormIsValidated(valid: string, callback: Callback): void {
    let isValid = valid === 'true';
    expect(this.setNewPasswordPageObject.formIsValid()).to.become(isValid).and.notify(callback);
  };

}

export = SetNewPasswordSteps;
