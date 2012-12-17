goog.provide('PSD.AdditionalLayerInfo.infx');

goog.require('PSD.AdditionalLayerInfo');

goog.scope(function() {

/**
 * @constructor
 */
PSD.AdditionalLayerInfo['infx'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {boolean} */
  this.blendInteriorElements;
};

/**
 * @param {PSD.StreamReader} stream
 */
PSD.AdditionalLayerInfo['infx'].prototype.parse = function(stream) {
  this.offset = stream.tell();

  this.blendInteriorElements = !!stream.readUint8();

  // padding
  stream.seek(3);

  this.length = stream.tell() - this.offset;
};

// end of scope
});
