var DeviceServer = require('spark-protocol').DeviceServer;
var EventEmitter = require('events').EventEmitter;
var util = require('util');

var WrappedServer = module.exports = function(opts) {
  EventEmitter.call(this);
  opts = opts || {};
  var keys = opts.coreKeysDir || '.';
  this.server = new DeviceServer({
    coreKeysDir:keys
  });
  
  //No idea why they set a global. 
  global.server = this.server;
  this.discoveredCores = [];
};
util.inherits(WrappedServer, EventEmitter);

WrappedServer.prototype.search = function() {
  var self = this;
  this._interval = setInterval(function(){
    var cores = global.server.getAllCores();
    var myCoreIds = Object.keys(cores);
    if(myCoreIds.length) {
      myCoreIds.forEach(function(coreId) {
        if(self.discoveredCores.indexOf(coreId) === -1) {
          var myCore = cores[coreId];
          self.emit('device', myCore);
          self.discoveredCores.push(coreId);
        }
      });
    }
  }, 3000);
};

WrappedServer.prototype.stopSearch = function() {
  if(this._interval) {
    clearInterval(this._interval);
  }
};

WrappedServer.prototype.start = function() {
  server.start();
  this.search();
}
