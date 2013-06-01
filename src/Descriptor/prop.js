var Descriptor = require('../Descriptor');

/**
 * @constructor
 */
Descriptor['prop'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {string} */
  this.name;
  /** @type {string} */
  this.classId;
  /** @type {string} */
  this.keyId;
};

/**
 * @param {StreamReader} stream
 */
Descriptor['prop'].prototype.parse = function(stream) {
  /** @type {number} */
  var length;

  this.offset = stream.tell();

  length = stream.readUint32();
  this.name = stream.readWideString(length);

  length = stream.readUint32() || 4;
  this.classId = stream.readString(length);

  length = stream.readUint32() || 4;
  this.keyId = stream.readString(length);

  this.length = stream.tell() - this.offset;
};
