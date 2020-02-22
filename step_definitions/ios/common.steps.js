const wdio = require('webdriverio');
const cucumber = require('cucumber')
const assert = require('chai').assert;

const { Before, Given, Then, When, setDefaultTimeout } = cucumber;

const opts = {
  port: 4723,
  capabilities: {
      browserName: '',
      platformName: 'iOS',
      platformVersion: '13.0',
      deviceName: 'iPhone 8',
      bundleId: 'com.konstruktor.GroupeMutuel',
      udid: 'EFF854A8-DE96-4B17-AA27-F04686F66A9B',
      // app can also take a url
      app: '/Users/ybonneta/Library/Developer/Xcode/DerivedData/GroupeMutuelFrontGateway-btynqfvmgjasjubinifgdsxqnlft/Build/Products/Debug-iphonesimulator/GroupeMutuelFrontGateway.app',
      //language: 'en',
      //locale: 'en_EN',
    }
};

setDefaultTimeout(10000);

let client;

Before({ timeout: 150 * 10000 } , async () => {
  client = await wdio.remote(opts);
});

Given('that I start the iOS application as a disconnected user', async function () {
  // setTimeout(async () => {
  //   const element = await client.findElement('class name', 'XCUIElementTypeApplication');
  //   await client.getElementAttribute(element.ELEMENT, 'name').then((attr) => {
  //     assert.equal(attr, 'Groupe Mutuel');
  //   });
  // }, 5000);
  const element = await client.findElement('class name', 'XCUIElementTypeApplication');
  await client.getElementAttribute(element.ELEMENT, 'name').then((attr) => {
    assert.equal(attr, 'Groupe Mutuel');
  });
});

When('I press on iOS element {string}', function (arg1) {
  setTimeout(async () => {
    const element = await client.findElement('accessibility id', 'password_forgotten');
    await client.elementClick(element.ELEMENT);
  }, 5000);
  // const element = await client.findElement('accessibility id', 'password_forgotten');
  // await client.elementClick(element.ELEMENT);
});

Then('I should see the text {string} in the element {string} by testId', function (string, string2) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});