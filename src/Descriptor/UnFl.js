var Descriptor = require('../Descriptor');

/**
 * @constructor
 */
Descriptor['UnFl'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {Array.<number>} */
  this.value;
};

/**
 * @param {StreamReader} stream
 */
Descriptor['UnFl'].prototype.parse = function(stream) {
  /** @type {Array.<number>} */
  var value = this.value = [];
  /** @type {number} */
  var count;
  /** @type {number} */
  var i;

  this.offset = stream.tell();

  this.key = stream.readString(4);
  count = stream.readUint32();
  for (i = 0; i < count; ++i) {
    value[i] = stream.readFloat64();
  }

  this.length = stream.tell() - this.offset;
};

Descriptor['UnFl'].prototype.toObject = function() {
  var obj = {};
  obj[this.key] = this.value;
  return obj;
};
