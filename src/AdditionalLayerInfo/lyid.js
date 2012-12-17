goog.provide('PSD.AdditionalLayerInfo.lyid');

goog.require('PSD.AdditionalLayerInfo');

goog.scope(function() {

/**
 * @constructor
 */
PSD.AdditionalLayerInfo['lyid'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {number} */
  this.layerId;
};

/**
 * @param {PSD.StreamReader} stream
 */
PSD.AdditionalLayerInfo['lyid'].prototype.parse = function(stream) {
  this.offset = stream.tell();

  this.layerId = stream.readUint32();

  this.length = stream.tell() - this.offset;
};

// end of scope
});
