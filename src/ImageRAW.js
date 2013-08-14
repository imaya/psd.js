var util = require('util');

var StreamReader = require('./StreamReader');
var Header = require('./Header');
var Image = require('./Image');

/**
 * @constructor
 * @extends {Image}
 */
var ImageRAW = function() {
  Image.call(this);
};
util.inherits(ImageRAW, Image);

/**
 * @param {StreamReader} stream
 * @param {Header} header
 */
ImageRAW.prototype.parse = function(stream, header) {
  /** @type {Array} */
  var channel = this.channel = [];
  /** @type {number} */
  var channelIndex;
  /** @type {number} */
  var width = header.columns;
  /** @type {number} */
  var height = header.rows;
  /** @type {number} */
  var channels = header.channels;
  /** @type {number} */
  var size = width * height * (header.depth / 8);

  for (channelIndex = 0; channelIndex < channels; ++channelIndex) {
    channel[channelIndex] = stream.read(size);
  }
};

module.exports = ImageRAW;
