# automobile

Gherkin based end-to-end automations for iOS and Android

![logo](https://github.com/ybonnetain/automobile/blob/master/static/logo.png)

Let's configure a project path, then crawl its sources looking for `feature` files

Then handle the specs with common steps definitions:

- Given that I start the app
- When I press `element`
- When I fill `element` with `value`
- Then I should have `value` in `element`
- Then I should have alert `value`

## Stack

- cucumber-js + chai

https://github.com/cucumber/cucumber-js

- webdriverio

https://github.com/appium/appium/tree/master/sample-code/javascript-webdriverio

- Appium

https://github.com/appium/appium/blob/master/sample-code/javascript-webdriverio/test/basic/ios-basic-interactions.test.js

## Installation

- Appium server `npm install appium -g`

(Depending on our needs Appium Desktop might be a better choice)

- npm install

## Running

Run `appium` server

Then run `npm run <ios|android>`

TODO: Appium kill script `lsof -i 4tcp:4723` with package.json binding

## Configuration

Ask `appium-doctor` to see what else you need with `npm run appium-doctor` :)

Then write `.env` at project root

```
APPIUM_PORT=<default port=4723>
WD_LOG_LEVEL=<trace | debug | info | warn | error | silent>
FEATURES_ROOT_PATH=<path to start looking recursively for feature test files>
APP_DISPLAY_NAME=<My App, used for app boot test>

IOS_PLATFORM_VERSION=13.0
IOS_DEVICE_NAME=iPhone 8
IOS_BUNDLE_ID=<bundle id>
IOS_DEVICE_UUID=<device or simulator uuid>
# app path can also be a url
IOS_APP_PATH=<.app path>
IOS_LANGUAGE=en
IOS_LOCALE=en_EN
```

TODO: Android

### iOS

- get sim / device UUID

`instruments -s devices` or `xcrun simctl list`

- `driver:elementSendKeys(Element: e, String: keys)`

In order to work, disable `Simulator -> Hardware -> Keyboard -> Connect Hardware Keyboard`

### Android

## Features

Example of `feature` feeding the test runner in `./examples/`

```gerkhin
Feature: Login
  As a user of the application
  I should be able to authenticate
  And should be presented with appropriate error messages

@android
Scenario: Trying to authenticate without login
  Given that I start the app
  When I press element "//android.widget.TextView[@text='LOG IN']"
  Then I should have "login is required" in element "login_form_error"

@ios
Scenario: Trying to authenticate without login
  Given that I start the app
  When I press element "buttonLogin"
  Then I should have "login is required" in element "login_form_error"
```

## Reporting

TODO: `--format=json | tee outputs/android-report.json` ok that work but I would like to keep the console output with colors

## React Native Users

Appium's element finding algorithms operate on the UI Accessibility layer, and the designer of this React Native app has designated certain elements as important for accessibility, thus rendering many other elements un-important for accessibility.

Make sure not just to use the `testID` attribute on important components, but also to set the `accessibilityLabel` attribute to ensure that the element is always findable via Appium's `accessibility id` locator

[More info](https://appiumpro.com/editions/76)

The following function might help

```javascript
export function testProps (id) {
  return { testID: id, accessibilityLabel: id };
}

...

<Component {...testProps('foo')} />
```
