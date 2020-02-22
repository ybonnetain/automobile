// require("../framework/setup");

// var wd = require("wd"),
//     _ = require('underscore'),
//     config = require('../framework/appium.conf'),
//     driver;

// function World () {
//   driver = wd.promiseChainRemote(config.server);
//   require("../framework/logging").configure(driver);

//   this.getDriver = function () {
//     return driver;
//   };

//   this.initDriver = function (desiredCapability) {
//     driver.init(desiredCapability).setImplicitWaitTimeout(130000); // 13000 original
//   };

//   this.shutDownDriver = function () {
//     driver
//       .sleep(1000)
//       .quit()
//       .finally(function () {});
//   };
// }
// module.exports.World = World;