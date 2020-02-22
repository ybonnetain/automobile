# automobile

Gherkin based end-to-end automations for react-native iOS and Android

https://github.com/appium/appium/tree/master/sample-code/javascript-webdriverio

## Stack

- cucumber-js
- webdriverio
- Appium

## Installation

- Appium server `npm install appium -g`

- npm install

## Configuration

Two things

Ask `appium-doctor` to see what else you need with `npm run appium-doctor` on the instumentations proxy wise


DEVEL


```
brew install libimobiledevice --HEAD
brew install carthage
brew install node
npm install -g appium
npm install wd
npm install -g ios-deploy
gem install xcpretty  # optional
```
// dev
"protractor-cucumber-framework": "6.2.0",
        "selenium-webdriver": "^4.0.0-alpha.1",



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