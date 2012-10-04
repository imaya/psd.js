goog.provide('PSD.ImageRAW');

goog.require('PSD.StreamReader');
goog.require('PSD.Header');
goog.require('PSD.Image');

goog.scope(function() {

/**
 * @constructor
 * @extends {PSD.Image}
 */
PSD.ImageRAW = function() {
  goog.base(this);
};
goog.inherits(PSD.ImageRAW, PSD.Image);

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
  var size = width * height * (header.depth / 8);

  for (channelIndex = 0; channelIndex < channels; ++channelIndex) {
    channel[channelIndex] = stream.read(size);
  }
};

// end of scope
});
