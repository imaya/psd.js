var Descriptor = require('../Descriptor');

/**
 * @constructor
 */
Descriptor['doub'] = function() {
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
Descriptor['doub'].prototype.parse = function(stream) {
  this.offset = stream.tell();
  this.value = stream.readFloat64();
  this.length = stream.tell() - this.offset;
};
