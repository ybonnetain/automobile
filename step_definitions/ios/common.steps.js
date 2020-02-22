const wd = require('wd'),
  chai = require('chai'),
  cucumber = require('cucumber')
  capability = require('../../framework/capabilities').ios,
  appiumConf = require('../../framework/appium.conf').appiumConf;

const { Before, Given, Then, When, setDefaultTimeout } = cucumber;


const driver = wd.promiseChainRemote(appiumConf);
driver.init(capability).setImplicitWaitTimeout(130000); 

setDefaultTimeout(10000);

// Before({ timeout: 150 * 10000 } , () => {
//   console.log('BeforeAll hook');
//   driver.init(capability).setImplicitWaitTimeout(300000); 
// });

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

Given('that I start the iOS application as a disconnected user', function () {
  // Write code here that turns the phrase above into concrete actions
  // return 'pending';
  return driver.sleep(5000);
});

When('I press on iOS element {string}', function (arg1) {
  // Write code here that turns the phrase above into concrete actions
  // return 'pending';
  console.log(driver.elementById(arg1))
  return driver.elementById(arg1);
      // .sendKeys(arg2)
      // .hideKeyboard();
});

Then('I should see the text {string} in the element {string} by testId', function (string, string2) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});