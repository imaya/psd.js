var StreamReader = require('./StreamReader');
var CompressionMethod = require('./CompressionMethod');
var ChannelRAW   = require('./ChannelRAW');
var ChannelRLE   = require('./ChannelRLE');

/**
 * @constructor
 */
var ChannelImageData = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {Array.<ChannelImage>} */
  this.channel;
};

/**
 * @param {StreamReader} stream
 * @param {LayerRecord} layerRecord
 */
ChannelImageData.prototype.parse = function(stream, layerRecord) {
  /** @type {Array.<ChannelImage>} */
  var channels = this.channel = [];
  /** @type {ChannelImage} */
  var channel;
  /** @type {CompressionMethod} */
  var compressionMethod;
  /** @type {number} */
  var i;
  /** @type {number} */
  var il;
  /** @type {number} */
  var pos;
  /** @type {Object} */
  var info;

  this.offset = stream.tell();

  for (i = 0, il = layerRecord.channels; i < il; ++i) {
    pos = stream.tell();
    info = layerRecord.info[i];

    compressionMethod =
      /** @type {CompressionMethod} */
      stream.readUint16();

    if (info.length === 2) {
      continue;
    }

    switch (compressionMethod) {
      case CompressionMethod.RAW:
        channel = new ChannelRAW();
        break;
      case CompressionMethod.RLE:
        channel = new ChannelRLE();
        break;
      default:
        throw new Error('unknown compression method: ' + compressionMethod);
    }
    channel.parse(stream, layerRecord, info.length - 2);

    channels[i] = channel;
    stream.seek(info.length + pos, 0);
  }

  this.length = stream.tell() - this.offset;
};

/**
 * @param {LayerRecord} layerRecord
 * @param {ColorModeData} colorModeData
 * @return {HTMLCanvasElement}
 */
ChannelImageData.prototype.createCanvas = function(header, colorModeData, layerRecord) {
  /** @type {HTMLCanvasElement} */
  var canvas =
    /** @type {HTMLCanvasElement} */
    document.createElement('canvas');
  /** @type {CanvasRenderingContext2D} */
  var ctx =
    /** @type {CanvasRenderingContext2D} */
    canvas.getContext('2d');
  /** @type {number} */
  var width = canvas.width = (layerRecord.right - layerRecord.left);
  /** @type {number} */
  var height = canvas.height = (layerRecord.bottom - layerRecord.top);
  /** @type {ImageData} */
  var imageData;
  /** @type {(Uint8ClampedArray|CanvasPixelArray)} */
  var pixelArray;
  /** @type {number} */
  var x;
  /** @type {number} */
  var y;
  /** @type {number} */
  var index;
  /** @type {Array.<(ChannelRAW|ChannelRLE)>} */
  var channels = this.channel;
  /** @type {Array} */
  var channel = [];
  /** @type {number} */
  var i;
  /** @type {number} */
  var il;
  /** @type {Array.<!(Array.<number>|Uint8Array)>} */
  var color;
  /** @type {!(Array.<number>|Uint8Array)} */
  var alpha;
  /** @type {!(Array.<number>|Uint8Array)} */
  var mask;


  if (width === 0 || height === 0) {
    return null;
  }

  imageData = ctx.createImageData(width, height);
  pixelArray = imageData.data;
  for (i = 0, il = channels.length; i < il; ++i) {
    switch (layerRecord.info[i].id) {
      case 0: // r c
      case 1: // g m
      case 2: // b y
      case 3: //   k
        channel[layerRecord.info[i].id] = channels[i].channel;
        break;
      case -1: // alpha
        alpha = channels[i].channel;
        break;
      case -2:
        mask = channels[i].channel;
        break;
      default:
        console.log("not supported channel id", layerRecord.info[i].id);
        continue;
    }
  }

  if (alpha) {
    channel.push(alpha);
  }
  color = new Color(header, colorModeData, channel).toRGBA();

  for (y = 0; y < height; ++y) {
    for (x = 0; x < width; ++x) {
      index = (y * width + x);
      pixelArray[index * 4 + 0] = color[0][index];
      pixelArray[index * 4 + 1] = color[1][index];
      pixelArray[index * 4 + 2] = color[2][index];
      if (mask) {
        pixelArray[index * 4 + 3] = (mask[index] / 255) * (color[3] ? color[3][index] : 255);
      } else {
        pixelArray[index * 4 + 3] = color[3] ? color[3][index] : 255;
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);

  return canvas;
};

module.exports = ChannelImageData;
