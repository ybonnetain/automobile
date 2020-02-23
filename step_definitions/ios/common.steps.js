const wdio = require('webdriverio');
const cucumber = require('cucumber')
const assert = require('chai').assert;

const {
  After,
  Before,
  Given,
  When,
  Then,
  setDefaultTimeout,
} = cucumber;

let client;

setDefaultTimeout(10000);

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

function sleep(ms) {
  return new Promise(resolve => setTimeout(() => resolve(true), ms));
}

Before({ timeout: 150 * 10000 } , async () => {
  client = await wdio.remote(opts);
});

// After(async () => {
//   await client.deleteSession();
// })

Given('that I start the app', async function () {
  const element = await client.findElement('class name', 'XCUIElementTypeApplication');
  await client.getElementAttribute(element.ELEMENT, 'name').then((attr) => {
    assert.equal(attr, 'Groupe Mutuel');
  });
  await sleep(7000);
});

When('I press element {string}', async function (arg1) {
  const element = await client.findElement('accessibility id', arg1);
  await client.elementClick(element.ELEMENT);
});

When('I fill element {string} with {string}', async function (arg1, arg2) {
  return 'pending';
});

Then('I should see the text {string} in the element {string} by testId', function (string, string2) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});