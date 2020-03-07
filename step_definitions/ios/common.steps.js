const cucumber = require('cucumber');
const spawnSync = require('child_process').spawnSync;
const assert = require('chai').assert;
const expect = require('chai').expect;
const getDriver = require('../../bootstrap.js').getIosDriver;

const {
  Before,
  Given,
  When,
  Then,
  setDefaultTimeout,
} = cucumber;

let client = null;

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(() => resolve(true), ms));
};

setDefaultTimeout(10000);

Before({ timeout: 150 * 10000 } , async () => {
  if (!client) {
    client = await getDriver();
  }
});

Given('that I start the app', async () => {
  const element = await client.findElement('class name', 'XCUIElementTypeApplication');
  await client.getElementAttribute(element.ELEMENT, 'name').then((attr) => {
    assert.equal(attr, process.env.APP_DISPLAY_NAME);
  });
  await sleep(5000);
});

Given('that I have completed previous step', async () => {
  await sleep(200);
});

When('I wait for {int} ms', async (arg1) => {
  await sleep(arg1);
});

When('I dismiss the keyboard', () => {
  client.hideKeyboard();
});

When('I press element {string}', async (arg1) => {
  const element = await client.findElement('accessibility id', arg1);
  await client.elementClick(element.ELEMENT);
});

When('I fill element {string} with {string}', async (arg1, arg2) => {
  // In order to work on sim we must uncheck:
  // `Simulator -> Hardware -> Keyboard -> Connect Hardware Keyboard`
  const element = await client.findElement('accessibility id', arg1);
  client.elementSendKeys(element.ELEMENT, arg2);
});

When('I clear {string}', async (arg1) => {
  const element = await client.findElement('accessibility id', arg1);
  // canot make clearValue() work :(
  // however, it seems that sending an 'empty key stroke' does the job :/
  client.elementSendKeys(element.ELEMENT,'');
});

When('I capture screen as {string}', (arg1) => {
  spawnSync(
    'xcrun',
    ['simctl', 'io', 'booted', 'screenshot', `./var/screenshots/${arg1}`],
    { stdio: 'inherit' },
  );
});

Then('It should match reference capture {string}', (arg1) => {
  //
});

Then('I should have {string} in element {string}', async (arg1, arg2) => {
  const element = await client.findElement('accessibility id', arg2);
  await client.getElementAttribute(element.ELEMENT, 'value').then((attr) => {
    assert.equal(attr, arg1);
  });
});

Then('I should have alert {string}', async (arg1) => {
  expect(await client.getAlertText()).to.include(arg1);
  await sleep(200);
  await client.acceptAlert();
});
