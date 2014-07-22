var util = require('util');

// extends origin module util
var utils = module.exports = Object.create(util);
utils.encodeFrame = require('./encode.js');
utils.decodeFrame = require('./decode.js');
utils.genMasking_key = require('./genmask.js');
utils.typeOf = require('./typeOf.js');
utils.coolLogo = require('./coolLogo.js');
// make magic str readonly
Object.defineProperty(utils, 'MAGIC_STRING', {
  value: '258EAFA5-E914-47DA-95CA-C5AB0DC85B11',
  writable: false,
  configurable: false
});