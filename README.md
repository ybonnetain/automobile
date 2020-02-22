# automobile

Gherkin based end-to-end automations for react-native iOS and Android

## Stack

- cucumber-js

https://github.com/cucumber/cucumber-js

- webdriverio

https://github.com/appium/appium/tree/master/sample-code/javascript-webdriverio

- Appium

https://appiumpro.com/editions/76

https://github.com/appium/appium/blob/master/sample-code/javascript-webdriverio/test/basic/ios-basic-interactions.test.js

## Installation

- Appium server `npm install appium -g`

- npm install

## Configuration

Ask `appium-doctor` to see what else you need with `npm run appium-doctor` :)

## Settings

`./framework/capabilities.js`

Must be edited with appropriate devices and simulators intended to run the test suites.

### iOS

- get sim / device UUID

`instruments -s devices` or `xcrun simctl list`

### Android


## Running

TODO: add ios .app path param

Run `appium`

Run `npm run ios`

Run `npm run android`