#!/bin/sh

f_restart_appium()
{
    APPIUM_PID=$(lsof -i 4tcp:$APPIUM_PORT | xargs | awk '{print $11}')
    if [ $APPIUM_PID -eq ""]; then
        printf "%-100s[ ${yellow}OK${nc} ]\n" " 🔹 Appium pid not running, move on"
    else
        printf "%-100s[ ${yellow}OK${nc} ]\n" " 🔹 found Appium pid $APPIUM_PID"
        kill -9 $APPIUM_PID
        printf "%-100s[ ${yellow}OK${nc} ]\n" " 🔹 stopping Appium"
    fi;

    nohup appium > ./var/appium.log 2>&1 &
    if [ $? -eq 0 ]; then
        printf "%-100s[ ${yellow}OK${nc} ]\n" " 🔹 starting Appium"
    else
        printf "%-100s[ ${red}KO${nc} ]\n" " 🔹 starting Appium"
        exit 1
    fi

    printf "%-100s[ ${yellow}OK${nc} ]\n" " 🔹 log file: ./var/appium.log"
    sleep 10

    echo "\n ✅ Appium proxy started\n"
}
