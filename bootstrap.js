require('dotenv').config();
const fs = require('fs');
const path = require('path');
const debug = require('debug')('automobile:boostrap');

console.log(' ');
const featuresLocalDir = `${__dirname}${path.sep}features${path.sep}`;

debug('features @ %o', featuresLocalDir);
debug('iOS App @ %o', process.env.IOS_APP_PATH);
debug('Android App @ %o', process.env.ANDROID_APP_PATH);

// check feature sources exist

if (!fs.existsSync(process.env.FEATURES_ROOT_PATH)) {
  debug('Features path %o does not exists', process.env.FEATURES_ROOT_PATH);
  process.exit(1);
}

const walk = (dir, done) => {
  let results = [];
  fs.readdir(dir, (err, list) => {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
      list.forEach(file => {
        file = path.resolve(dir, file);
        fs.stat(file, (err, stat) => {
          if (err) return done(err);
          if (stat && stat.isDirectory()) {
            results.push(file);
            walk(file, (err, res) => {
              if (err) return done(err);
              results = results.concat(res);
              if (!--pending) done(null, results);
            });
          } else {
            results.push(file);
            if (!--pending) done(null, results);
          }
        });
      });
  });
};

walk(process.env.FEATURES_ROOT_PATH, (err, data) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  data.forEach(file => {
    if (file.includes('.feature')) {
      const filename = file.split('/').pop();
      debug('Copy %o to features', filename);
      fs.copyFileSync(file, `${featuresLocalDir}${filename}`);
    }
  });
  debug('Start Cucumber test suites');
});
