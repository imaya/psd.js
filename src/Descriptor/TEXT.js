goog.provide('PSD.Descriptor.TEXT');

goog.require('PSD.Descriptor');

goog.scope(function() {

/**
 * @constructor
 */
PSD.Descriptor['TEXT'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {string} */
  this.string;
};

/**
 * @param {PSD.StreamReader} stream
 */
PSD.Descriptor['TEXT'].prototype.parse = function(stream) {
  /** @type {number} */
  var length;

  this.offset = stream.tell();

  length = stream.readUint32();
  this.string = stream.readWideString(length);

  this.length = stream.tell() - this.offset;
};


});