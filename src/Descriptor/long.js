goog.provide('PSD.Descriptor.Long');

goog.require('PSD.Descriptor');

goog.scope(function() {

/**
 * @constructor
 */
PSD.Descriptor['long'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {number} */
  this.value;
};

/**
 * @param {PSD.StreamReader} stream
 */
PSD.Descriptor['long'].prototype.parse = function(stream) {
  this.offset = stream.tell();
  this.value = stream.readInt32();
  this.length = stream.tell() - this.offset;
};

});