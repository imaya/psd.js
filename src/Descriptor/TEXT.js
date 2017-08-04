var Descriptor = require('../Descriptor');

/**
 * @constructor
 */
Descriptor['TEXT'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {string} */
  this.string;
};

/**
 * @param {StreamReader} stream
 */
Descriptor['TEXT'].prototype.parse = function(stream) {
  /** @type {number} */
  var length;

  this.offset = stream.tell();

  length = stream.readUint32();
  this.string = stream.readWideString(length);

  this.length = stream.tell() - this.offset;
};

Descriptor['TEXT'].prototype.toObject = function() {
  return this.string.slice(0, this.string.length - 1);
}
