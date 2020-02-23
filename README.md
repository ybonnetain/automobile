# automobile

Gherkin based end-to-end automations for react-native iOS and Android

![logo](https://github.com/ybonnetain/automobile/blob/master/static/logo.png)

Let's configure a project path, then crawl its sources looking for `feature` files

Then handle the specs with common steps definitions:

- Given that I start the app
- When I press element <element>
- Then I should have <element>

etc ..

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

## Configuration

Ask `appium-doctor` to see what else you need with `npm run appium-doctor` :)

Then write `.env` at project root

```
FEATURES_ROOT_PATH=<path to start looking recursively for feature test files>

IOS_PLATFORM_VERSION=13.0
IOS_DEVICE_NAME=iPhone 8
IOS_BUNDLE_ID=<bundle id>
IOS_DEVICE_UUID=<device or simulator uuid>
IOS_APP_PATH=<.app path>
IOS_LANGUAGE=en
IOS_LOCALE=en_EN
```

TODO: Android

## Features

Example of `feature` feeding the test runner

```gerkhin
Feature: Login
  As a user of the application
  I should be able to authenticate
  And should be presented with appropriate error messages

@android
Scenario: Trying to authenticate without login
  Given that I start the app
  When I press element "//android.widget.TextView[@text='LOG IN']"
  Then I should see the text "login is required" in the element "login_form_error"

@ios
Scenario: Trying to authenticate without login
  Given that I start the app
  When I press element "buttonLogin"
  Then I should see the text "login is required" in the element "login_form_error"
```

### iOS

- get sim / device UUID

`instruments -s devices` or `xcrun simctl list`


### Android


## Running

Run `appium`

Run `npm run ios`

Run `npm run android`

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
