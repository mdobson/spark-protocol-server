var Server = require('../');

var CoreServer = new Server({coreKeysDir: process.cwd()});

CoreServer.on('device', function(device) {
  console.log('Device online in user space');
  device.onApiMessage('matt', { cmd: 'Ping' });
  device.on('matt', function(sender, args) {
    console.log(args);
  });
});

CoreServer.start();
