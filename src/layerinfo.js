goog.provide('PSD.LayerInfo');

goog.require('PSD.StreamReader');
goog.require('PSD.LayerRecord');
goog.require('PSD.ChannelImageData');

goog.scope(function() {

/**
 * @constructor
 */
PSD.LayerInfo = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {number} */
  this.layerCount;
  /** @type {Array.<PSD.LayerRecord>} */
  this.layerRecord = [];
  /** @type {Array.<PSD.ChannelImageData>} */
  this.channelImageData = [];
};

/**
 * @param {PSD.StreamReader} stream
 */
PSD.LayerInfo.prototype.parse = function(stream) {
  /** @type {number} */
  var i;
  /** @type {number} */
  var il;
  /** @type {PSD.LayerRecord} */
  var layerRecord;
  /** @type {PSD.ChannelImageData} */
  var channelImageData;

  this.offset = stream.tell();
  this.length = stream.readUint32() + 4;

  /** @type {number} */
  this.layerCount = Math.abs(stream.readInt16());

  for (i = 0, il = this.layerCount; i < il; ++i) {
    layerRecord = new PSD.LayerRecord();
    layerRecord.parse(stream);
    this.layerRecord[i] = layerRecord;
  }

  // TODO: ChannelImageData の実装はまだないのでスキップする
  for (i = 0, il = this.layerCount; i < il; ++i) {
    channelImageData = new PSD.ChannelImageData();
    channelImageData.parse(stream, this.layerRecord[i]);
    this.channelImageData[i] = channelImageData;
  }
  stream.seek(this.offset + this.length, 0);
};

// end of scope
});
