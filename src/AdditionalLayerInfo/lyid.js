var AdditionalLayerInfo = require('../AdditionalLayerInfo');

/**
 * @constructor
 */
AdditionalLayerInfo['lyid'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {number} */
  this.layerId;
};

/**
 * @param {StreamReader} stream
 */
AdditionalLayerInfo['lyid'].prototype.parse = function(stream) {
  this.offset = stream.tell();

  this.layerId = stream.readUint32();

  this.length = stream.tell() - this.offset;
};
