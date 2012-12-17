goog.provide('PSD.Descriptor.ObAr');

goog.require('PSD.Descriptor');

goog.scope(function() {

/**
 * @constructor
 */
PSD.Descriptor['ObAr'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
};

/**
 * @param {PSD.StreamReader} stream
 */
PSD.Descriptor['ObAr'].prototype.parse = function(stream) {
  /** @type {number} */
  var length;
  /** @type {Array.<PSD.Descriptor>} */
  var item;
  /** @type {number} */
  var i;
  /** @type {number} */
  var il;

  this.offset = stream.tell();

  goog.global.console.warn('OSType key not implemented (undocumented): ObAr(ObjectArray?)');

  this.length = stream.tell() - this.offset;
};


});