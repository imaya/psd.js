goog.provide('PSD.ChannelRLE');

goog.require('PSD.ChannelImage');
goog.require('PSD.StreamReader');
goog.require('PSD.LayerRecord');

goog.scope(function() {

/**
 * @constructor
 * @extends {PSD.ChannelImage}
 */
PSD.ChannelRLE = function() {
  goog.base(this);

  /** @type {Array.<number>} */
  this.lineLength;
};
goog.inherits(PSD.ChannelRLE, PSD.ChannelImage);

/**
 * @param {PSD.StreamReader} stream
 * @param {PSD.LayerRecord} layerRecord
 * @param {number} length
 */
PSD.ChannelRLE.prototype.parse = function(stream, layerRecord, length) {
  /** @type {number} */
  var i;
  /** @type {Array.<number>} */
  var lineLength = this.lineLength = [];
  /** @type {Array} */
  var lines = [];
  /** @type {number} */
  var height = layerRecord.bottom - layerRecord.top;
  /** @type {number} */
  var limit = stream.tell() + length;
  /** @type {number} */
  var size = 0;
  /** @type {number} */
  var pos;

  // line lengths
  for (i = 0; i < height; ++i) {
    lineLength[i] = stream.readUint16();
  }

  // channel data
  for (i = 0; i < height; ++i) {
    lines[i] = stream.readPackBits(lineLength[i]);
    size += lines[i].length;
    // TODO: avoid invalid height
    if (stream.tell() >= limit) {
      break;
    }
  }

  // concatenation
  if (USE_TYPEDARRAY) {
    this.channel = new Uint8Array(size);
    for (i = 0, pos = 0, height = lines.length; i < height; ++i) {
      this.channel.set(lines[i], pos);
      pos += lines[i].length;
    }
  } else {
    this.channel = Array.prototype.concat.apply([], lines);
  }
};

// end of scope
});
