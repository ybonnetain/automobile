require('dotenv').config();
const fs = require('fs');
const path = require('path');
const logFeatures = require('debug')('automobile:features');

console.log(' ');
const featuresLocalDir = `${__dirname}${path.sep}features${path.sep}`;

logFeatures('features @ %o', featuresLocalDir);

// recursively crawl a directory

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

// find features in given target project

const getFeatures = () => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(process.env.FEATURES_ROOT_PATH)) {
      logFeatures('Features path %o does not exists', process.env.FEATURES_ROOT_PATH);
      reject(`cannot find directory ${process.env.FEATURES_ROOT_PATH}`);
      return;
    }
    walk(process.env.FEATURES_ROOT_PATH, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      data.sort();
      data.forEach(file => {
        if (file.includes('.feature')) {
          const filename = file.split('/').pop();
          logFeatures('Copy %o to scenario sources', filename);
          fs.copyFileSync(file, `${featuresLocalDir}${filename}`);
        }
      });
      resolve(true);
    });
  });
};

const main = async () => {
  try {
    await getFeatures();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
