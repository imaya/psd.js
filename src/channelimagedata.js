goog.provide('PSD.ChannelImageData');

goog.require('PSD.StreamReader');
goog.require('PSD.Enum');
goog.require('PSD.ChannelRAW');
goog.require('PSD.ChannelRLE');

goog.scope(function() {

/**
 * @constructor
 */
PSD.ChannelImageData = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {Array.<(PSD.ChannelRAW|PSD.ChannelRLE)>} */
  this.channel;
  // TODO: ベースプロトタイプを作り継承する
};

/**
 * @param {PSD.StreamReader} stream
 * @param {PSD.LayerRecord} layerRecord
 */
PSD.ChannelImageData.prototype.parse = function(stream, layerRecord) {
  /** @type {Array.<(PSD.ChannelRAW|PSD.ChannelRLE)>} */
  var channels = this.channel = [];
  /** @type {!(PSD.ChannelRAW|PSD.ChannelRLE)} */
  var channel
  /** @type {PSD.CompressionMethod} */
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
      /** @type {PSD.CompressionMethod} */
      stream.readUint16();

    if (info.length === 2) {
      continue;
    }

    switch (compressionMethod) {
      case PSD.CompressionMethod.RAW:
        channel = new PSD.ChannelRAW();
        break;
      case PSD.CompressionMethod.RLE:
        channel = new PSD.ChannelRLE();
        break;
      default:
        throw new Error('unknown compression method: ' + compressionMethod);
    }
    channel.parse(stream, layerRecord, info.length - 2);

    channels[i] = channel;
    //window.console.log("channel[" + i + '/' + (il - 1) + "]", channel, layerRecord.info[i].length, stream.tell() - pos);
    stream.seek(info.length + pos, 0);
  }

  this.length = stream.tell() - this.offset;
};
  /**
   * @param {PSD.LayerRecord} layerRecord
   * @return {HTMLCanvasElement}
   */
PSD.ChannelImageData.prototype.createCanvas = function(layerRecord) {
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
  /** @type {Array.<(PSD.ChannelRAW|PSD.ChannelRLE)>} */
  var channels = this.channel;
  /** @type {number} */
  var channel;
  /** @type {number} */
  var i;
  /** @type {number} */
  var il;

  if (width === 0 || height === 0) {
    return null;
  }

  imageData = ctx.createImageData(width, height);
  pixelArray = imageData.data;

  for (i = 0, il = channels.length; i < il; ++i) {
    switch (layerRecord.info[i].id) {
      case 0: // red
      case 1: // green
      case 2: // blue
        channel = layerRecord.info[i].id;
        break;
      case -1: // alpha
        channel = 3;
        break;
      case -2:
      default:
        window.console.warn("not supported channel id", layerRecord.info[i].id);
        continue;
    }
    for (y = 0; y < height; ++y) {
      for (x = 0; x < width; ++x) {
        index = (y * width + x);
        pixelArray[index * 4 + channel] = channels[i].channel[index];
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);

  return canvas;
};

// end of scope
});
