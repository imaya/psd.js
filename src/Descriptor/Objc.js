var Descriptor = require('../Descriptor');

/**
 * @constructor
 */
Descriptor['Objc'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {Descriptor} */
  this.value;
};

/**
 * @param {StreamReader} stream
 */
Descriptor['Objc'].prototype.parse = function(stream) {
  this.offset = stream.tell();
  this.value = new Descriptor();
  this.value.parse(stream);
  this.length = stream.tell() - this.offset;
};
