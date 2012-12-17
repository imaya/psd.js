goog.provide('PSD.AdditionalLayerInfo.clbl');

goog.require('PSD.AdditionalLayerInfo');

goog.scope(function() {

/**
 * @constructor
 */
PSD.AdditionalLayerInfo['clbl'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {boolean} */
  this.blendClippedElements;
};

/**
 * @param {PSD.StreamReader} stream
 */
PSD.AdditionalLayerInfo['clbl'].prototype.parse = function(stream) {
  this.offset = stream.tell();

  this.blendClippedElements = !!stream.readUint8();

  // padding
  stream.seek(3);

  this.length = stream.tell() - this.offset;
};

// end of scope
});
