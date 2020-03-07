# automobile

Gherkin based end-to-end automations for iOS and Android

including inflow graphical regression test support

TODO: there is still a lot to do on Android

TODO: gestures -> https://webdriver.io/docs/api/element/touchAction.html

![logo](https://github.com/ybonnetain/automobile/blob/master/static/logo.png)

Let's configure a project path, then crawl its sources looking for `feature` files

Then handle the specs with common steps definitions:

Have a look at VS-Code snippets in `./share/feature.code-snippets`

## Stack

- cucumber-js + chai

https://github.com/cucumber/cucumber-js

- webdriverio

https://webdriver.io/docs/api/webdriver.html

https://github.com/appium/appium/tree/master/sample-code/javascript-webdriverio

- Appium

https://github.com/appium/appium/blob/master/sample-code/javascript-webdriverio/test/basic/ios-basic-interactions.test.js

## Installation

- Appium server `npm install appium -g` (tested with v1.16.0)

(Depending on our needs Appium Desktop might be a better choice)

- `brew install ffmpeg`

- `yarn install`

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

- `driver:elementSendKeys(el: Element, keys: string)`

In order to work, disable `Simulator -> Hardware -> Keyboard -> Connect Hardware Keyboard`

### Android

## Running

### Devel mode

Mode used while writing the `feature` files

- Appium must be started

- Required device must be booted

- Then run tests suites with `npm run <ios|android>`

### CI mode

Mount the stack and run all suites from a CI script

- iOS simulator run with `./run-ios-with-sim.sh`

- Android emulator TODO

## Features

Example of `feature` feeding the test runner in `./examples/`

Also see VS-Code snippets in `./share/feature.code-snippets`

And `step_definitions/**/common.steps.js` for the exhaustive list.

## Graphical regression testing

As part of the common steps we can include screen captures and reference capture matcher assertions

```gerkhin
When I capture screen as "auth_screen.screenshot.png"
Then It should match reference capture "auth_screen.screenshot.png"
```

If the matcher is invoked then the file must exists in the project being tested as `[name].screenshot.png`

On iOS use `xcrun simctl io booted screenshot example.screenshot.png` on the same sim that will run the test suites (save the file where you like inside `FEATURE_ROOT_PATH`)

On Android, TODO

## Reporting

TODO: `--format=json | tee outputs/android-report.json` ok that work but I would like to keep the console output with colors

## Trouble Shooting

### simctl

If `Unable to boot device in current state: Booted` while running `./run-ios` this might just mean we need to open GUI (then restart the runner script)

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
