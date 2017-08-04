var StreamReader = require('./StreamReader');
var Header = require('./Header');
var ImageRAW = require('./ImageRAW');
var ImageRLE = require('./ImageRLE');
var Color = require('./Color');
var CompressionMethod = require('./CompressionMethod');

/**
 * @constructor
 */
var ImageData = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {CompressionMethod} */
  this.compressionMethod;
  /** @type {!Image} */
  this.image;
};

/**
 * @param {StreamReader} stream
 * @param {Header} header
 */
ImageData.prototype.parse = function(stream, header) {
  this.offset = stream.tell();
  this.compressionMethod =
    /** @type {CompressionMethod} */
    stream.readUint16();

  switch (this.compressionMethod) {
    case CompressionMethod.RAW:
      this.image = new ImageRAW();
      break;
    case CompressionMethod.RLE:
      this.image = new ImageRLE();
      break;
    default:
      throw new Error('unknown compression method');
  }
  this.image.parse(stream, header);

  this.length = stream.tell() - this.offset;
};

/**
 * @param {Header} header
 * @param {ColorModeData} colorModeData
 * @return {HTMLCanvasElement}
 */
ImageData.prototype.createCanvas = function(header, colorModeData) {
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
  /** @type {Array.<!(Array.<number>|Uint8Array)>} */
  var color = new Color(header, colorModeData, this.image.channel).toRGB();

  if (width <= 0 || height <= 0) {
    return null;
  }

  imageData = ctx.createImageData(width, height);
  pixelArray = imageData.data;

  for (y = 0; y < height; ++y) {
    for (x = 0; x < width; ++x) {
      index = (y * width + x);
      pixelArray[index * 4    ] = color[0][index];
      pixelArray[index * 4 + 1] = color[1][index];
      pixelArray[index * 4 + 2] = color[2][index];
      pixelArray[index * 4 + 3] = 255;
      //pixelArray[index * 4 + 3] = channels[3] ? channels[3][index] : 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);

  return canvas;
};

ImageData.prototype.createColor = function(header, colorModeData) {
  return new Color(header, colorModeData, this.image.channel).toRGB();
};

module.exports = ImageData;
