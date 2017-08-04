/**
 * PSD parser in JavaScript.
 * @author imaya <imaya.devel@gmail.com>
 */

global.USE_TYPEDARRAY = true;
global.COMPILED = true;

var StreamReader = require('./StreamReader');
var Header = require('./Header');
var ColorModeData = require('./ColorModeData');
var ImageResources = require('./ImageResources');
var LayerAndMaskInformation = require('./LayerAndMaskInformation');
var ImageData = require('./ImageData');

/**
 * PSD parser
 * @constructor
 * @param {!(Array.<number>|Uint8Array)} input input buffer.
 * @param {Object=} opt_param option parameters.
 */
var Parser = function(input, opt_param) {
  if (!opt_param) {
    opt_param = {};
  }

  /** @type {StreamReader} */
  this.stream = new StreamReader(input, opt_param['inputPosition'] | 0);
  /** @type {Header} */
  this.header;
  /** @type {ColorModeData} */
  this.colorModeData;
  /** @type {ImageResources} */
  this.imageResources;
  /** @type {LayerAndMaskInformation} */
  this.layerAndMaskInformation;
  /** @type {ImageData} */
  this.imageData;
};

/**
 * parse psd.
 */
Parser.prototype.parse = function() {
  /** @type {StreamReader} */
  var stream = this.stream;

  // initialize
  this.header = new Header();
  this.colorModeData = new ColorModeData();
  this.imageResources = new ImageResources();
  this.layerAndMaskInformation = new LayerAndMaskInformation();
  this.imageData = new ImageData();

  // parse
  this.header.parse(stream);
  this.colorModeData.parse(stream, this.header);
  this.imageResources.parse(stream);
  this.layerAndMaskInformation.parse(stream, this.header);
  this.imageData.parse(stream, this.header);

  this.stream.input = null;
};

Parser.prototype.toPng = function(){
  var height = this.header.rows;
  var width = this.header.columns;

  //create empty array to get pixel data
  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  var context = canvas.getContext('2d');
  var imageData = context.createImageData(width, height);
  var pixelData = imageData.data;

  //copy in colors
  var colors = this.imageData.createColor(this.header, this.colorModeData);
  for(var y = 0; y < height; ++y) {
    for(var x = 0; x < width; ++x) {
      var index = (y * width + x);
      pixelData[index * 4    ] = colors[0][index];
      pixelData[index * 4 + 1] = colors[1][index];
      pixelData[index * 4 + 2] = colors[2][index];
      pixelData[index * 4 + 3] = 255;
    }
  }
  context.putImageData(imageData, 0, 0, 0, 0, width, height);
  return canvas.toDataURL('image/png');
}

module.exports = Parser;
