goog.provide('PSD.AdditionalLayerInfo.lnsr');

goog.require('PSD.AdditionalLayerInfo');

goog.scope(function() {

/**
 * @constructor
 */
PSD.AdditionalLayerInfo['lnsr'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {string} */
  this.id;
};

/**
 * @param {PSD.StreamReader} stream
 */
PSD.AdditionalLayerInfo['lnsr'].prototype.parse = function(stream) {
  this.offset = stream.tell();
  this.id = stream.readString(4);
  this.length = stream.tell() - this.offset;
};


});