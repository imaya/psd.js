var Descriptor = require('../Descriptor');

/**
 * @constructor
 */
Descriptor['rele'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {string} */
  this.name;
  /** @type {string} */
  this.classId;
  /** @type {number} */
  this.value;
};

/**
 * @param {StreamReader} stream
 */
Descriptor['rele'].prototype.parse = function(stream) {
  /** @type {number} */
  var length;

  this.offset = stream.tell();

  length = stream.readUint32();
  this.name = stream.readWideString(length);

  length = stream.readUint32() || 4;
  this.classId = stream.readString(length);

  this.value = stream.readUint32();

  this.length = stream.tell() - this.offset;
};

Descriptor['rele'].prototype.toObject = function() {
  return { name: this.name, value: this.value, classId: this.classId };
}
