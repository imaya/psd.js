goog.provide('PSD.Descriptor.type');

goog.require('PSD.Descriptor');

goog.scope(function() {

/**
 * @constructor
 */
PSD.Descriptor['type'] = function() {
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
 * @param {PSD.StreamReader} stream
 */
PSD.Descriptor['type'].prototype.parse = function(stream) {
  /** @type {number} */
  var length;
  this.offset = stream.tell();

  length = stream.readUint32();
  this.name = stream.readWideString(length);

  length = stream.readUint32() || 4;
  this.classId = stream.readString(length);

  this.length = stream.tell() - this.offset;
};


});