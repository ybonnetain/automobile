#!/bin/sh

f_import_features()
{
    node import-features.js
    if [ $? -eq 0 ]; then
        echo "\n ✅ Test cases imported\n"
    else
        echo "\n :( Failed to import test cases\n"
        exit 1
    fi
}


f_run_suites()
{
    node ./node_modules/.bin/cucumber-js \
         --tags @ios \
         ./features \
         -r ./step_definitions/ios/common.steps.js
}
