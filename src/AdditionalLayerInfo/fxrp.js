goog.provide('PSD.AdditionalLayerInfo.fxrp');

goog.require('PSD.AdditionalLayerInfo');

goog.scope(function() {

/**
 * @constructor
 */
PSD.AdditionalLayerInfo['fxrp'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {Array.<*>} */
  this.referencePoint;
};

/**
 * @param {PSD.StreamReader} stream
 */
PSD.AdditionalLayerInfo['fxrp'].prototype.parse = function(stream) {
  this.offset = stream.tell();

  // TODO: decode double
  this.referencePoint = [
    stream.readFloat64(),
    stream.readFloat64()
  ];

  this.length = stream.tell() - this.offset;
};

// end of scope
});
