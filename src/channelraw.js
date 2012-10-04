goog.provide('PSD.ChannelRAW');

goog.require('PSD.ChannelImage');
goog.require('PSD.StreamReader');
goog.require('PSD.LayerRecord');

goog.scope(function() {

/**
 * @constructor
 * @extends {PSD.ChannelImage}
 */
PSD.ChannelRAW = function() {
  goog.base(this);
};
goog.inherits(PSD.ChannelRAW, PSD.ChannelImage);

/**
 * @param {PSD.StreamReader} stream
 * @param {PSD.LayerRecord} layerRecord
 * @param {number} length
 */
PSD.ChannelRAW.prototype.parse = function(stream, layerRecord, length) {
  /** @type {number} */
  var width = layerRecord.right - layerRecord.left;
  /** @type {number} */
  var height = layerRecord.bottom - layerRecord.top;

  //this.channel = stream.read(width * height);
  this.channel = stream.read(length);
};

// end of scope
});
