#!/bin/sh

export DEBUG="automobile:*"

bold=$(tput bold)
normal=$(tput sgr0)
yellow='\033[1;33m'
red='\033[0;31m'
nc='\033[0m'

APP_PATH=$(grep IOS_APP_PATH .env | cut -d '=' -f2)
APPIUM_PORT=$(grep APPIUM_PORT .env | cut -d '=' -f2)
DEVICE_UUID=$(grep IOS_DEVICE_UUID .env | cut -d '=' -f2)
FEATURES_ROOT_PATH=$(grep FEATURES_ROOT_PATH .env | cut -d '=' -f2)

f_check_config ()
{
    # verify that the project to test
    # and where we will lokk for feature files does exist

    if [ -d "$FEATURES_ROOT_PATH" ]; then
        printf "%-100s[ ${yellow}OK${nc} ]\n" " 🔹 test features exists"
    else
        printf "%-100s[ ${red}KO${nc} ]\n" " 🔹 test features were not found"
        exit 1
    fi

    # verify that that app exists
    # TODO build here ?

    if [ -d "$APP_PATH" ]; then
        printf "%-100s[ ${yellow}OK${nc} ]\n" " 🔹 app binary exists"
    else
        printf "%-100s[ ${red}KO${nc} ]\n" " 🔹 app binary was not found"
        exit 1
    fi

    echo "\n ✅ configuration seems ok\n"
}
