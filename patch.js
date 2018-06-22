/**
 * This file is patch to Angular 6 uncompatibility with
 * web3.js 1.0.0-beta.34.
 * 
 * This patch fixes 
 * Module not found: Error: Can't resolve 'crypto' by editing 
 * webpack.config.js
 * 
 * @Ref: https://gist.github.com/niespodd/1fa82da6f8c901d1c33d2fcbb762947d
 * 
 * @TODO: Remove patch once fix for this has been released
 */

const fs = require('fs');
const f = 'node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js';

fs.readFile(f, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/node: false/g, 'node: {crypto: true, stream: true}');

  fs.writeFile(f, result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});