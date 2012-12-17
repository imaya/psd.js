goog.provide('PSD.Descriptor.doub');

goog.require('PSD.Descriptor');

goog.scope(function() {

/**
 * @constructor
 */
PSD.Descriptor['doub'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {!(Array.<number>|Uint8Array)} */
  this.value;
};

/**
 * @param {PSD.StreamReader} stream
 */
PSD.Descriptor['doub'].prototype.parse = function(stream) {
  this.offset = stream.tell();
  this.value = stream.readFloat64();
  this.length = stream.tell() - this.offset;
};


});