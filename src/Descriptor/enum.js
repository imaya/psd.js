goog.provide('PSD.Descriptor.Enum');

goog.require('PSD.Descriptor');

goog.scope(function() {

/**
 * @constructor
 */
PSD.Descriptor['enum'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {string} */
  this.type;
  /** @type {string} */
  this.enum;
};

/**
 * @param {PSD.StreamReader} stream
 */
PSD.Descriptor['enum'].prototype.parse = function(stream) {
  /** @type {number} */
  var length;

  this.offset = stream.tell();

  // type
  length = stream.readUint32();
  if (length === 0) {
    length = 4;
  }
  this.type = stream.readString(length);

  // enum
  length = stream.readUint32();
  if (length === 0) {
    length = 4;
  }
  this.enum = stream.readString(length);

  this.length = stream.tell() - this.offset;
};


});