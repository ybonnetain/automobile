require('dotenv').config();
const fs = require('fs');
const path = require('path');

const featuresLocalDir = `${__dirname}${path.sep}features${path.sep}`;

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

// data.sort();

  data.forEach(file => {
    if (file.includes('.feature')) {
      console.log('cp', file);
      const filename = file.split('/').pop();
      fs.copyFileSync(file, `${featuresLocalDir}${filename}`);
    }
  });
});