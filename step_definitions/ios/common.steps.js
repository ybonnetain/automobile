const wdio = require('webdriverio');
const cucumber = require('cucumber')
const assert = require('chai').assert;

const { After, Before, Given, When, Then, setDefaultTimeout } = cucumber;

let client;

function sleep(ms) {
  return new Promise(resolve => setTimeout(() => resolve(true), ms));
}

setDefaultTimeout(10000);

Before({ timeout: 150 * 10000 } , async () => {
  client = await wdio.remote({
    port: Number(process.env.APPIUM_PORT),
    logLevel: process.env.WD_LOG_LEVEL,
    capabilities: {
        browserName: '',
        platformName: 'iOS',
        platformVersion: process.env.IOS_PLATFORM_VERSION,
        deviceName: process.env.IOS_DEVICE_NAME,
        bundleId: process.env.IOS_BUNDLE_ID,
        udid: process.env.IOS_DEVICE_UUID,
        app: process.env.IOS_APP_PATH,
        language: process.env.IOS_LANGUAGE,
        locale: process.env.IOS_LOCALE
      },
    });
});

// After(async () => {
//   await client.deleteSession();
// })

Given('that I start the app', async () => {
  const element = await client.findElement('class name', 'XCUIElementTypeApplication');
  await client.getElementAttribute(element.ELEMENT, 'name').then((attr) => {
    assert.equal(attr, process.env.APP_DISPLAY_NAME);
  });
  await sleep(7000);
});

When('I press element {string}', async (arg1) => {
  const element = await client.findElement('accessibility id', arg1);
  await client.elementClick(element.ELEMENT);
});

When('I fill element {string} with {string}', async (arg1, arg2) => {
  return 'pending';
});

Then('I should have {string} in element {string}', async (string, string2) => {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});
