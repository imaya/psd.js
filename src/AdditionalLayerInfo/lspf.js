goog.provide('PSD.AdditionalLayerInfo.lspf');

goog.require('PSD.AdditionalLayerInfo');

goog.scope(function() {

/**
 * @constructor
 */
PSD.AdditionalLayerInfo['lspf'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {number} */
  this.flags;
  // TODO: flags のパースも行う
};

/**
 * @param {PSD.StreamReader} stream
 */
PSD.AdditionalLayerInfo['lspf'].prototype.parse = function(stream) {
  this.offset = stream.tell();
  this.flags = stream.readUint32();
  this.length = stream.tell() - this.offset;
};

// end of scope
});
