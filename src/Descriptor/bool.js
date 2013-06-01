var Descriptor = require('../Descriptor');

/**
 * @constructor
 */
Descriptor['bool'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {boolean} */
  this.value;
};

/**
 * @param {StreamReader} stream
 */
Descriptor['bool'].prototype.parse = function(stream) {
  this.offset = stream.tell();
  this.value = !!stream.readUint8();
  this.length = stream.tell() - this.offset;
};
