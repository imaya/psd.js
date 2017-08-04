var Descriptor = require('../Descriptor');

/**
 * @constructor
 */
Descriptor['tdta'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {!(Array.<number>|Uint8Array)} */
  this.value;
};

/**
 * @param {StreamReader} stream
 */
Descriptor['tdta'].prototype.parse = function(stream) {
  /** @type {number} */
  var length;

  this.offset = stream.tell();

  length = stream.readUint32();
  this.data = stream.read(length);

  this.length = stream.tell() - this.offset;
};

Descriptor['tdta'].prototype.toObject = function() {
  return this.data;
}
