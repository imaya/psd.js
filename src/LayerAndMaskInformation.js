var StreamReader = require('./StreamReader');
var LayerInfo = require('./LayerInfo');
var GlobalLayerMaskInfo = require('./GlobalLayerMaskInfo');
var AdditionalLayerInfo = require('./AdditionalLayerInfo');

/**
 * @constructor
 */
var LayerAndMaskInformation = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {LayerInfo} */
  this.layerInfo;
  /** @type {GlobalLayerMaskInfo} */
  this.globalLayerMaskInfo;
  /** @type {AdditionalLayerInfo} */
  this.additionalLayerInfo;
};

/**
 * @param {StreamReader} stream
 * @param {Header} header
 */
LayerAndMaskInformation.prototype.parse = function(stream, header) {
  /** @type {number} */
  var length;

  this.offset = stream.tell();
  length = stream.readUint32();
  this.length = length + 4;

  if (length === 0) {
    console.log("skip: layer and mask information (empty body)");
  }

  var pos = stream.tell() + length;

  // initialize
  this.layerInfo = new LayerInfo();
  this.globalLayerMaskInfo = new GlobalLayerMaskInfo();
  this.additionalLayerInfo = new AdditionalLayerInfo();

  // parse
  this.layerInfo.parse(stream, header);
  this.globalLayerMaskInfo.parse(stream, header);
  this.additionalLayerInfo.parse(stream, header);

  // TODO: remove
  stream.seek(pos, 0);
};

module.exports = LayerAndMaskInformation;
