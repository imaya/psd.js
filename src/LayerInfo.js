var StreamReader = require('./StreamReader');
var LayerRecord = require('./LayerRecord');
var ChannelImageData = require('./ChannelImageData');

/**
 * @constructor
 */
var LayerInfo = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {number} */
  this.layerCount;
  /** @type {Array.<LayerRecord>} */
  this.layerRecord = [];
  /** @type {Array.<ChannelImageData>} */
  this.channelImageData = [];
};

/**
 * @param {StreamReader} stream
 * @param {Header} header
 */
LayerInfo.prototype.parse = function(stream, header) {
  /** @type {number} */
  var i;
  /** @type {number} */
  var il;
  /** @type {LayerRecord} */
  var layerRecord;
  /** @type {ChannelImageData} */
  var channelImageData;

  this.offset = stream.tell();
  this.length = stream.readUint32() + 4;

  this.layerCount = Math.abs(stream.readInt16());

  for (i = 0, il = this.layerCount; i < il; ++i) {
    layerRecord = new LayerRecord();
    layerRecord.parse(stream, header);
    this.layerRecord[i] = layerRecord;
  }

  // TODO: ChannelImageData の実装はまだないのでスキップする
  for (i = 0, il = this.layerCount; i < il; ++i) {
    channelImageData = new ChannelImageData();
    channelImageData.parse(stream, this.layerRecord[i]);
    this.channelImageData[i] = channelImageData;
  }
  stream.seek(this.offset + this.length, 0);
};

module.exports = LayerInfo;
