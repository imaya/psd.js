var util = require('util');

var ChannelImage = require('./ChannelImage');
var StreamReader = require('./StreamReader');
var LayerRecord = require('./LayerRecord');


/**
 * @constructor
 * @extends {ChannelImage}
 */
var ChannelRLE = function() {
  //constructor.super_();

  /** @type {Array.<number>} */
  this.lineLength;
};

util.inherits(ChannelRLE, ChannelImage);

/**
 * @param {StreamReader} stream
 * @param {LayerRecord} layerRecord
 * @param {number} length
 */
ChannelRLE.prototype.parse = function(stream, layerRecord, length) {
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

module.exports = ChannelRLE;
