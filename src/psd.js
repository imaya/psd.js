/**
 * PSD parser in JavaScript.
 * @author imaya <imaya.devel@gmail.com>
 */
goog.provide('PSD.Parser');

goog.require('USE_TYPEDARRAY');
goog.require('PSD.StreamReader');
goog.require('PSD.Header');
goog.require('PSD.ColorModeData');
goog.require('PSD.ImageResources');
goog.require('PSD.LayerAndMaskInformation');
goog.require('PSD.ImageData');

goog.scope(function() {

/**
 * PSD parser
 * @constructor
 * @param {!(Array.<number>|Uint8Array)} input input buffer.
 * @param {Object=} opt_param option parameters.
 */
PSD.Parser = function(input, opt_param) {
  if (!opt_param) {
    opt_param = {};
  }

  /** @type {PSD.StreamReader} */
  this.stream = new PSD.StreamReader(input, opt_param['inputPosition'] | 0);
  /** @type {PSD.Header} */
  this.header;
  /** @type {PSD.ColorModeData} */
  this.colorModeData;
  /** @type {PSD.ImageResources} */
  this.imageResources;
  /** @type {PSD.LayerAndMaskInformation} */
  this.layerAndMaskInformation;
  /** @type {PSD.ImageData} */
  this.imageData;
};

/**
 * parse psd.
 */
PSD.Parser.prototype.parse = function() {
  /** @type {PSD.StreamReader} */
  var stream = this.stream;

  // initialize
  this.header = new PSD.Header();
  this.colorModeData = new PSD.ColorModeData();
  this.imageResources = new PSD.ImageResources();
  this.layerAndMaskInformation = new PSD.LayerAndMaskInformation();
  this.imageData = new PSD.ImageData();

  // parse
  this.header.parse(stream);
  this.colorModeData.parse(stream, this.header);
  this.imageResources.parse(stream);
  this.layerAndMaskInformation.parse(stream);
  this.imageData.parse(stream, this.header);
};


// end of scope
});
