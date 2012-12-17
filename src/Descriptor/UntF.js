goog.provide('PSD.Descriptor.UntF');

goog.require('PSD.Descriptor');

goog.scope(function() {

/**
 * @constructor
 */
PSD.Descriptor['UntF'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {string} */
  this.units;
  /** @type {!(Array.<number>|Uint8Array)} */
  this.value;
};

/**
 * @param {PSD.StreamReader} stream
 */
PSD.Descriptor['UntF'].prototype.parse = function(stream) {
  this.offset = stream.tell();
  this.units = stream.readString(4);
  this.value = stream.readFloat64();
  this.length = stream.tell() - this.offset;
};


});