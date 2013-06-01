var Descriptor = require('../Descriptor');

/**
 * @constructor
 */
Descriptor['long'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {number} */
  this.value;
};

/**
 * @param {StreamReader} stream
 */
Descriptor['long'].prototype.parse = function(stream) {
  this.offset = stream.tell();
  this.value = stream.readInt32();
  this.length = stream.tell() - this.offset;
};
