#!/bin/sh

export DEBUG="automobile:*"

bold=$(tput bold)
normal=$(tput sgr0)
yellow='\033[1;33m'
red='\033[0;31m'
nc='\033[0m'

echo "\n 🚗 \n"

APP_PATH=$(grep IOS_APP_PATH .env | cut -d '=' -f2)
APPIUM_PORT=$(grep APPIUM_PORT .env | cut -d '=' -f2)
DEVICE_UUID=$(grep IOS_DEVICE_UUID .env | cut -d '=' -f2)
FEATURES_ROOT_PATH=$(grep FEATURES_ROOT_PATH .env | cut -d '=' -f2)



# check config

if [ -d "$FEATURES_ROOT_PATH" ]; then
    printf "%-100s[ ${yellow}OK${nc} ]\n" " 🔹 test features exists"
else
    printf "%-100s[ ${red}KO${nc} ]\n" " 🔹 test features were not found"
    exit 1
fi

if [ -d "$APP_PATH" ]; then
    printf "%-100s[ ${yellow}OK${nc} ]\n" " 🔹 app binary exists"
else
    printf "%-100s[ ${red}KO${nc} ]\n" " 🔹 app binary was not found"
    exit 1
fi


echo "\n ✅ configuration seems ok\n"


# quit all simulator instances

printf "%-100s[ ${yellow}OK${nc} ]\n" " 🔹 osascript: tell app Simulator to quit"
osascript -e 'tell app "Simulator" to quit'


# boot simulator required instance

xcrun simctl boot $DEVICE_UUID
if [ $? -eq 0 ]; then
    printf "%-100s[ ${yellow}OK${nc} ]\n" " 🔹 xcrun simctl boot $DEVICE_UUID"
else
    printf "%-100s[ ${red}KO${nc} ]\n" " 🔹 xcrun simctl boot $DEVICE_UUID"
    exit 1
fi


# open GUI of current booted instance

open /Applications/Xcode.app/Contents/Developer/Applications/Simulator.app/
if [ $? -eq 0 ]; then
    printf "%-100s[ ${yellow}OK${nc} ]\n" " 🔹 open /Applications/Xcode.app/Contents/Developer/Applications/Simulator.app/"
else
    printf "%-100s[ ${red}KO${nc} ]\n" " 🔹 open /Applications/Xcode.app/Contents/Developer/Applications/Simulator.app/"
    exit 1
fi

echo "\n ✅ Execution env is booting\n"


# sleep while sim is booting

n=0
while [ "$n" -lt 15 ]; do
    sleep 1
    n=$(( n + 1 ))
    s=$(printf "%-${n}s" "#")
    echo " ${s// /#}\r\c"
done

echo " ✅ Woke up after 15s\n"


# restart Appium

APPIUM_PID=$(lsof -i 4tcp:$APPIUM_PORT | xargs | awk '{print $11}')
if [ $APPIUM_PID -eq ""]; then
    printf "%-100s[ ${yellow}OK${nc} ]\n" " 🔹 appium pid not running, move on"
else
    printf "%-100s[ ${yellow}OK${nc} ]\n" " 🔹 found Appium pid $APPIUM_PID"
    kill -9 $APPIUM_PID
    printf "%-100s[ ${yellow}OK${nc} ]\n" " 🔹 stopping Appium"
fi;

nohup appium > /dev/null 2>&1 &
if [ $? -eq 0 ]; then
    printf "%-100s[ ${yellow}OK${nc} ]\n" " 🔹 starting appium"
else
    printf "%-100s[ ${red}KO${nc} ]\n" " 🔹 starting appium"
    exit 1
fi

sleep 10


echo "\n ✅ appium proxy started\n"


# import feature from target project

node import-features.js
if [ $? -eq 0 ]; then
    echo "\n ✅ Test cases imported, sweet\n"
else
    echo "\n :( Failed to import test cases\n"
    exit 1
fi


# run test suites

node ./node_modules/.bin/cucumber-js \
     --tags @ios \
     ./features \
     -r ./step_definitions/ios/common.steps.js
