goog.provide('PSD.ImageRLE');

goog.require('PSD.StreamReader');
goog.require('PSD.Header');

goog.scope(function() {

/**
 * @constructor
 */
PSD.ImageRLE = function() {
  /** @type {Array} */
  this.channel;
  /** @type {Array.<number>} */
  this.lineLength;
};

/**
 * @param {PSD.StreamReader} stream
 * @param {PSD.Header} header
 */
PSD.ImageRLE.prototype.parse = function(stream, header) {
  /** @type {number} */
  var i;
  /** @type {Array} */
  var channel = this.channel = [];
  /** @type {Array.<number>} */
  var lineLength = this.lineLength = [];
  /** @type {number} */
  var channelIndex;
  /** @type {Array} */
  var lines;
  /** @type {number} */
  var height = header.rows;
  /** @type {number} */
  var channels = header.channels;

  // line lengths
  for (i = 0; i < height * channels; ++i) {
    lineLength[i] = stream.readUint16();
  }

  // channel data
  for (channelIndex = 0; channelIndex < channels; ++channelIndex) {
    lines = [];
    for (i = 0; i < height; ++i) {
      lines[i] = stream.readPackBits(lineLength[channelIndex * height + i]);
    }
    channel[channelIndex] = Array.prototype.concat.apply([], lines);
  }
};

  // end of scope
});
