# automobile

Gherkin based end-to-end automations for iOS and Android
## How does it work

Let's configure a project path, then crawl its sources looking for `feature` files
Then handle the specs with common steps definitions
Have a look at VS-Code snippets in `./share/feature.code-snippets`
## Stack

- [cucumber-js](https://github.com/cucumber/cucumber-js)
- [chaijs](https://www.chaijs.com/)
- [webdriver API](https://webdriver.io/docs/api/webdriver.html)
- [webdriver examples](https://github.com/appium/appium/tree/master/sample-code/javascript-webdriverio)
- [appium](https://github.com/appium/appium/blob/master/sample-code/javascript-webdriverio/test/basic/ios-basic-interactions.test.js)
## Installation

```shell
yarn
```
## Configuration

Edit `./.env`

With the help of `npm run appium-doctor` and the following commands
### iOS

- get sim / device UUID: `instruments -s devices` or `xcrun simctl list`
- In order to send key strokes: `Simulator -> Hardware -> Keyboard -> Connect Hardware Keyboard`

### Android

TODO

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

### Xcode

Here is how to find the `.app` built for sim

`~/Library/Developer/Xcode/DerivedData/<SCHEME>-<someUUID>/Build/Product/Debug-iphonesimulator/`

Here is how to find the current app path (runtime) running in the simulator
- Pause program execution
- run `po NSHomeDirectory()`

![logo](/static/docs/find-sim-build.png)

- [Gestures](https://webdriver.io/docs/api/element/touchAction.html) - Webdriver.io touch actions

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

## License

MIT

![logo](/static/logo.png)