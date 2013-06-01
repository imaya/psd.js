var util = require('util');

var ChannelImage = require('./ChannelImage');
var StreamReader = require('./StreamReader');
var LayerRecord = require('./LayerRecord');

/**
 * @Constructor
 * @extends {ChannelImage}
 */
var ChannelRAW = function() {
  this.super_();
};
util.inherits(ChannelRAW, ChannelImage);

/**
 * @param {StreamReader} stream
 * @param {LayerRecord} layerRecord
 * @param {number} length
 */
ChannelRAW.prototype.parse = function(stream, layerRecord, length) {
  /** @type {number} */
  var width = layerRecord.right - layerRecord.left;
  /** @type {number} */
  var height = layerRecord.bottom - layerRecord.top;

  //this.channel = stream.read(width * height);
  this.channel = stream.read(length);
};

module.exports = ChannelRAW;
