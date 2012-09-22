goog.provide('PSD.ChannelRAW');

goog.require('PSD.StreamReader');
goog.require('PSD.LayerRecord');

goog.scope(function() {

/**
 * @constructor
 */
PSD.ChannelRAW = function() {
  /** @type {!(Array.<number>|Uint8Array)} */
  this.channel;
};

/**
 * @param {PSD.StreamReader} stream
 * @param {PSD.LayerRecord} layerRecord
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
