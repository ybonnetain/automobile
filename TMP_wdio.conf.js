exports.config = {
    services: ['appium'], // TODO upgrade dep from wdio-appium-service to @wdio/appium-service
    port: 4723,
    runner: 'local',
    specs: [
      './features/*.feature'
    ],
    // cucumberOpts: {

    // },
    capabilities: [{
        maxInstances: 1,
        browserName: '',
        appiumVersion: '1.13.0',
        platformName: 'iOS',
        platformVersion: '13.0',
        deviceName: 'iPhone 8',
        bundleId: 'com.konstruktor.GroupeMutuel',
        udid: 'EFF854A8-DE96-4B17-AA27-F04686F66A9B',
        // app can also take a url
        app: '/Users/ybonneta/Library/Developer/Xcode/DerivedData/GroupeMutuelFrontGateway-btynqfvmgjasjubinifgdsxqnlft/Build/Products/Debug-iphonesimulator/GroupeMutuelFrontGateway.app',
        //language: 'en',
        //locale: 'en_EN',
    }],
    
    logLevel: 'verbose',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    framework: 'cucumber',
    // reporters: ['spec'],
    mochaOpts: {
      ui: 'bdd',
      timeout: 60000
    }
  }