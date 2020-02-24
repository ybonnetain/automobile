require('dotenv').config();
const wdio = require('webdriverio');
const path = require('path');
const logWD = require('debug')('automobile:webdriverio');
const logCucumber = require('debug')('automobile:cucumber');

console.log(' ');
const featuresLocalDir = `${__dirname}${path.sep}features${path.sep}`;

logCucumber('Start Cucumber test suites');
logCucumber('features @ %o', featuresLocalDir);
logCucumber('iOS App @ %o', process.env.IOS_APP_PATH);
logCucumber('Android App @ %o', process.env.ANDROID_APP_PATH);

const getIosDriver = async () => {
  logWD('init connection to Appium');
  return wdio.remote({
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
};

const getAndroidDriver = async () => {
  logWD('init connection to Appium');
  // TODO
};

module.exports = { getIosDriver, getAndroidDriver };
