goog.provide('PSD.ImageRAW');

goog.require('PSD.StreamReader');
goog.require('PSD.Header');

goog.scope(function() {

/**
 * @constructor
 */
PSD.ImageRAW = function() {
  /** @type {Array} */
  this.channel;
};

/**
 * @param {PSD.StreamReader} stream
 * @param {PSD.Header} header
 */
PSD.ImageRAW.prototype.parse = function(stream, header) {
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
  var size = width * height;

  for (channelIndex = 0; channelIndex < channels; ++channelIndex) {
    channel[channelIndex] = stream.read(size);
  }
};

// end of scope
});
