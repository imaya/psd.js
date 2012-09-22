goog.provide('PSD.ChannelRLE');

goog.require('PSD.StreamReader');
goog.require('PSD.LayerRecord');

goog.scope(function() {

/**
 * @constructor
 */
PSD.ChannelRLE= function() {
  /** @type {Array} */
  this.channel;
  /** @type {Array.<number>} */
  this.lineLength;
};

/**
 * @param {PSD.StreamReader} stream
 * @param {PSD.LayerRecord} layerRecord
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

  // line lengths
  for (i = 0; i < height; ++i) {
    lineLength[i] = stream.readUint16();
  }

  // channel data
  for (i = 0; i < height; ++i) {
    lines[i] = stream.readPackBits(lineLength[i]);
    // TODO: avoid invalid height
    if (stream.tell() >= limit) {
      break;
    }
  }
  this.channel = Array.prototype.concat.apply([], lines);
};

  // end of scope
});
