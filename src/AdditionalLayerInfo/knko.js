var AdditionalLayerInfo = require('../AdditionalLayerInfo');

/**
 * @constructor
 */
AdditionalLayerInfo['knko'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {boolean} */
  this.knockout;
};

/**
 * @param {StreamReader} stream
 */
AdditionalLayerInfo['knko'].prototype.parse = function(stream) {
  this.offset = stream.tell();

  this.knockout = !!stream.readUint8();

  // padding
  stream.seek(3);

  this.length = stream.tell() - this.offset;
};
