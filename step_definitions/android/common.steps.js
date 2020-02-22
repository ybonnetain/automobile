const _ = require('underscore');
const capability = _.clone(require("../../framework/capabilities").android);

module.exports = function() {

  this.setDefaultTimeout(60 * 1000);
  this.World = require('../../support/world').World;

  this.Given(/^that I start the Android application as a disconnected user$/, function () {
    this.initDriver(capability);
    return this.getDriver().sleep(10000);
  });

  this.When(/^I access the element "([^"]*)" by accessibilityId and fill it with "([^"]*)"$/, function (arg1, arg2) {
    return this.getDriver()
      .elementByAccessibilityId(arg1)
      .sendKeys(arg2)
      .hideKeyboard();
  });

  this.When(/^I tap\/click on Android element "([^"]*)"$/, function (arg1) {
    return this.getDriver()
      .elementByXPath(arg1)
      .click();
  });

  this.Then(/^I should see the text "([^"]*)" in the element "([^"]*)" by accessibilityId$/, function (arg1, arg2) {
    return this.getDriver()
      .elementByAccessibilityId(arg2)
      .then(function (el) {
        return el.text().should.become(arg1);
      });

    this.shutDownDriver();
  });
};