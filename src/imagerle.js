goog.provide('PSD.ImageRLE');

goog.require('PSD.StreamReader');
goog.require('PSD.Header');
goog.require('PSD.Image');

goog.scope(function() {

/**
 * @constructor
 * @extends {PSD.Image}
 */
PSD.ImageRLE = function() {
  goog.base(this);

  /** @type {Array.<number>} */
  this.lineLength;
};
goog.inherits(PSD.ImageRLE, PSD.Image);

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
  /** @type {number} */
  var size;
  /** @type {number} */
  var pos;

  // line lengths
  for (i = 0; i < height * channels; ++i) {
    lineLength[i] = stream.readUint16();
  }

  // channel data
  for (channelIndex = 0; channelIndex < channels; ++channelIndex) {
    lines = [];
    size = 0;

    for (i = 0; i < height; ++i) {
      lines[i] = stream.readPackBits(lineLength[channelIndex * height + i] * (header.depth / 8));
      size += lines[i].length;
    }
    // concatenation
    if (USE_TYPEDARRAY) {
      channel[channelIndex] = new Uint8Array(size);
      for (i = 0, pos = 0, height = lines.length; i < height; ++i) {
        channel[channelIndex].set(lines[i], pos);
        pos += lines[i].length;
      }
    } else {
      channel[channelIndex] = Array.prototype.concat.apply([], lines);
    }
  }
};

  // end of scope
});
