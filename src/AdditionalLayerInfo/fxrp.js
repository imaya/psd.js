var AdditionalLayerInfo = require('../AdditionalLayerInfo');

/**
 * @constructor
 */
AdditionalLayerInfo['fxrp'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {Array.<*>} */
  this.referencePoint;
};

/**
 * @param {StreamReader} stream
 */
AdditionalLayerInfo['fxrp'].prototype.parse = function(stream) {
  this.offset = stream.tell();

  // TODO: decode double
  this.referencePoint = [
    stream.readFloat64(),
    stream.readFloat64()
  ];

  this.length = stream.tell() - this.offset;
};
