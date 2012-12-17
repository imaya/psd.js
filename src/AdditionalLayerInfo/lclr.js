goog.provide('PSD.AdditionalLayerInfo.lclr');

goog.require('PSD.AdditionalLayerInfo');

goog.scope(function() {

/**
 * @constructor
 */
PSD.AdditionalLayerInfo['lclr'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {Array.<number>} */
  this.color;
  // TODO: flags のパースも行う
};

/**
 * @param {PSD.StreamReader} stream
 */
PSD.AdditionalLayerInfo['lclr'].prototype.parse = function(stream) {
  this.offset = stream.tell();
  this.color = [
    stream.readUint32(),
    stream.readUint32()
  ];
  this.length = stream.tell() - this.offset;
};

// end of scope
});
