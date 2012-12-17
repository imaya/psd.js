goog.provide('PSD.AdditionalLayerInfo.lyvr');

goog.require('PSD.AdditionalLayerInfo');

goog.scope(function() {

/**
 * @constructor
 */
PSD.AdditionalLayerInfo['lyvr'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {number} */
  this.version;
};

/**
 * @param {PSD.StreamReader} stream
 */
PSD.AdditionalLayerInfo['lyvr'].prototype.parse = function(stream) {
  this.offset = stream.tell();

  this.version = stream.readUint32();

  this.length = stream.tell() - this.offset;
};

// end of scope
});
