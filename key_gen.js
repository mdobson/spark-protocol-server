#!/usr/bin/env node

var ursa = require('ursa');
var keyName = 'default_key.pem';


if(!fs.existsSync(keyName)) {
  console.log('creating new server key...');
  var keys = ursa.generatePrivateKey();

  var extensionIndex = keyName.lastIndexOf('.');
  var derFilename = keyName.substring(0, extensionIndex) + '.der';
  var pubPemFilename = keyName.substring(0, extensionIndex) + '.pub.pem';
  fs.writeFileSync(keyName, keys.toPrivatePem('binary'));
  fs.writeFileSync(pubPemFilename, keys.toPublicPem('binary'));
}



