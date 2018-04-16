var Descriptor = require('../Descriptor');

/**
 * @constructor
 */
Descriptor['ObAr'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
};

/**
 * @param {StreamReader} stream
 */
Descriptor['ObAr'].prototype.parse = function(stream) {
  /** @type {number} */
  var length;
  /** @type {Array.<Descriptor>} */
  var item;
  /** @type {number} */
  var i;
  /** @type {number} */
  var il;

  this.offset = stream.tell();

  console.log('OSType key not implemented (undocumented): ObAr(ObjectArray?)');

  this.length = stream.tell() - this.offset;
};
