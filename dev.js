const wdio = require('webdriverio');
const assert = require('chai').assert;

const opts = {
    port: 4723,
    capabilities: {
        browserName: '',
        platformName: 'iOS',
        platformVersion: '13.0',
        deviceName: 'iPhone 8',
        bundleId: 'com.konstruktor.GroupeMutuel',
        udid: 'EFF854A8-DE96-4B17-AA27-F04686F66A9B',
        // app can also take a url
        app: '/Users/ybonneta/Library/Developer/Xcode/DerivedData/GroupeMutuelFrontGateway-btynqfvmgjasjubinifgdsxqnlft/Build/Products/Debug-iphonesimulator/GroupeMutuelFrontGateway.app',
        //language: 'en',
        //locale: 'en_EN',
      }
  };
  
  async function main () {
    const client = await wdio.remote(opts);
    
    // const element = await client.findElement('class name', 'XCUIElementTypeApplication');
    // await client.getElementAttribute(element.ELEMENT, 'name').then((attr) => {
    //   assert.equal(attr, 'Groupe Mutuel');
    // });

    setTimeout(async () => {
        const element = await client.findElement('accessibility id', 'password_forgotten');
        await client.elementClick(element.ELEMENT);
    }, 5000);


  

    // await client.deleteSession();
  }
  
  main();