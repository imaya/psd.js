goog.provide('PSD.AdditionalLayerInfo.knko');

goog.require('PSD.AdditionalLayerInfo');

goog.scope(function() {

/**
 * @constructor
 */
PSD.AdditionalLayerInfo['knko'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {boolean} */
  this.knockout;
};

/**
 * @param {PSD.StreamReader} stream
 */
PSD.AdditionalLayerInfo['knko'].prototype.parse = function(stream) {
  this.offset = stream.tell();

  this.knockout = !!stream.readUint8();

  // padding
  stream.seek(3);

  this.length = stream.tell() - this.offset;
};

// end of scope
});
