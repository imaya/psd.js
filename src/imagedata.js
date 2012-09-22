goog.provide('PSD.ImageData');

goog.require('PSD.StreamReader');
goog.require('PSD.Header');
goog.require('PSD.Enum');
goog.require('PSD.ImageRAW');
goog.require('PSD.ImageRLE');

goog.scope(function() {

/**
 * @constructor
 */
PSD.ImageData = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {PSD.CompressionMethod} */
  this.compressionMethod;
  /** @type {!(PSD.ImageRAW|PSD.ImageRLE)} */
  this.image;
  // TODO: (ImageRAW|ImageRLE) ではなく、継承を使う
};

/**
 * @param {PSD.StreamReader} stream
 * @param {PSD.Header} header
 */
PSD.ImageData.prototype.parse = function(stream, header) {
  this.offset = stream.tell();
  this.compressionMethod =
    /** @type {PSD.CompressionMethod} */
    stream.readUint16();

  switch (this.compressionMethod) {
    case PSD.CompressionMethod.RAW:
      this.image = new PSD.ImageRAW();
      break;
    case PSD.CompressionMethod.RLE:
      this.image = new PSD.ImageRLE();
      break;
    default:
      throw new Error('unknown compression method');
  }
  this.image.parse(stream, header);

  this.length = stream.tell() - this.offset;
};

/**
 * @param {PSD.Header} header
 * @return {HTMLCanvasElement}
 */
PSD.ImageData.prototype.createCanvas = function(header) {
  /** @type {HTMLCanvasElement} */
  var canvas =
    /** @type {HTMLCanvasElement} */
    document.createElement('canvas');
  /** @type {CanvasRenderingContext2D} */
  var ctx =
    /** @type {CanvasRenderingContext2D} */
    canvas.getContext('2d');
  /** @type {number} */
  var width = canvas.width = header.columns;
  /** @type {number} */
  var height = canvas.height = header.rows;
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
  /** @type {Array} */
  var channels = this.image.channel;

  if (width <= 0 || height <= 0) {
    return null;
  }

  imageData = ctx.createImageData(width, height);
  pixelArray = imageData.data;

  for (y = 0; y < height; ++y) {
    for (x = 0; x < width; ++x) {
      index = (y * width + x);
      pixelArray[index * 4    ] = channels[0] ? channels[0][index] : 255;
      pixelArray[index * 4 + 1] = channels[1] ? channels[1][index] : 255;
      pixelArray[index * 4 + 2] = channels[2] ? channels[2][index] : 255;
      pixelArray[index * 4 + 3] = channels[3] ? channels[3][index] : 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);

  return canvas;
};

/// end of scope
});
