#!/bin/sh

# stable 1.20.2 (bottled), HEAD
brew install appium

# stable 4.4 (bottled), HEAD
brew install ffmpeg

cat <<EOF >./.env.template
APPIUM_PORT=<default port=4723>
WD_LOG_LEVEL=<trace | debug | info | warn | error | silent>
FEATURES_ROOT_PATH=<path to start looking recursively for feature test files>
APP_DISPLAY_NAME=<My App, used for app boot test>

IOS_PLATFORM_VERSION=14.4
IOS_DEVICE_NAME=iPhone 8
IOS_BUNDLE_ID=<bundle id>
IOS_DEVICE_UUID=<device or simulator uuid>
# app path can also be a url
IOS_APP_PATH=<.app path>
IOS_LANGUAGE=en
IOS_LOCALE=en_EN
EOF

echo "\nChoose a simulator from the next command and write .env (see .env.template)"
echo "IOS_PLATFORM_VERSION"
echo "IOS_DEVICE_UUID\n"

echo "type [ENTER] to run xcrun simctl list"
read whatever

xcrun simctl list