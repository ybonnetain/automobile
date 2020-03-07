#!/bin/sh

source ./scripts/config.sh
source ./scripts/suites-runner.sh
source ./scripts/appium-runner.sh

echo '\n Hello 🚗\n\n The current script will attempt to launch the testing stack\n and run test suites on required Apple simulator\n\n'


f_start_sim()
{
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
        printf "%-100s[ ${yellow}OK${nc} ]\n" " 🔹 start sim GUI"
    else
        printf "%-100s[ ${red}KO${nc} ]\n" " 🔹 start sim GUI"
        exit 1
    fi

    sleep 3

    # tell us which sim are booted

    booted=( $(xcrun simctl list | sed -n 's/.*(\(.*\)) (Booted)/\1/p') )
    if [ ${#booted[@]} != 0 ]; then
        for device in ${booted[@]}
        do
            printf "%-100s[ ${yellow}OK${nc} ]\n" " 🔹 sim $device booted"
        done
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
}


f_main() {
    f_check_config
    f_start_sim
    f_restart_appium
    f_import_features
    f_run_suites
}

f_main
