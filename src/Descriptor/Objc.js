goog.provide('PSD.Descriptor.Objc');

goog.require('PSD.Descriptor');

goog.scope(function() {

/**
 * @constructor
 */
PSD.Descriptor['Objc'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {PSD.Descriptor} */
  this.value;
};

/**
 * @param {PSD.StreamReader} stream
 */
PSD.Descriptor['Objc'].prototype.parse = function(stream) {
  this.offset = stream.tell();
  this.value = new PSD.Descriptor();
  this.value.parse(stream);
  this.length = stream.tell() - this.offset;
};


});