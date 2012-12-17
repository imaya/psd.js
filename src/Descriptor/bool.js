goog.provide('PSD.Descriptor.bool');

goog.require('PSD.Descriptor');

goog.scope(function() {

/**
 * @constructor
 */
PSD.Descriptor['bool'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {boolean} */
  this.value;
};

/**
 * @param {PSD.StreamReader} stream
 */
PSD.Descriptor['bool'].prototype.parse = function(stream) {
  this.offset = stream.tell();
  this.value = !!stream.readUint8();
  this.length = stream.tell() - this.offset;
};


});