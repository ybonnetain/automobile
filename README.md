# automobile

Gherkin based end-to-end automations for react-native iOS and Android



https://github.com/appium/appium/tree/master/sample-code/javascript-webdriverio

## Stack

- cucumber-js
- web-driver / Selenium
- Appium
- node 10 (at this time node12+ has issues with `fibers`)

## Installation

- [Desktop Appium Server](https://github.com/appium/appium-desktop/releases/tag/v1.13.0)

- Or Appium standalone server -> `npm install appium -g` (more likely we want to install it on CI)

- npm i -g node-gyp

- npm install


## Configuration

Two things

Ask `appium-doctor` to see what else you need with `npm run appium-doctor` on the instumentations proxy wise

- Configure WD `npx wdio config`




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




# @ios
# Scenario: Trying to authenticate without login
#   Given that I start the iOS application as a disconnected user
#   When I press on iOS element "buttonLogin"
#   Then I should see the text "login is required" in the element "Login Form Error" by testId
        //






## Docs

- [cucumber timouts](https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/timeouts.md)

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