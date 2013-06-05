var Descriptor = require('../Descriptor');

/**
 * @constructor
 */
Descriptor['type'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {string} */
  this.name;
  /** @type {string} */
  this.classId;
};

/**
 * @param {StreamReader} stream
 */
Descriptor['type'].prototype.parse = function(stream) {
  /** @type {number} */
  var length;
  this.offset = stream.tell();

  length = stream.readUint32();
  this.name = stream.readWideString(length);

  length = stream.readUint32() || 4;
  this.classId = stream.readString(length);

  this.length = stream.tell() - this.offset;
};

Descriptor['tdta'].prototype.toObject = function() {
  return { name: this.name, classId: this.classId };
}
