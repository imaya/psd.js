var Descriptor = require('../Descriptor');

/**
 * @constructor
 */
Descriptor['UntF'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {string} */
  this.units;
  /** @type {!(Array.<number>|Uint8Array)} */
  this.value;
};

/**
 * @param {StreamReader} stream
 */
Descriptor['UntF'].prototype.parse = function(stream) {
  this.offset = stream.tell();
  this.units = stream.readString(4);
  this.value = stream.readFloat64();
  this.length = stream.tell() - this.offset;
};

Descriptor['UntF'].prototype.toObject = function() {
  return {value: this.value, units: this.units};
};
