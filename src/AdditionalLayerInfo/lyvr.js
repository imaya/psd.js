var AdditionalLayerInfo = require('../AdditionalLayerInfo')

/**
 * @constructor
 */
AdditionalLayerInfo['lyvr'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {number} */
  this.version;
};

/**
 * @param {StreamReader} stream
 */
AdditionalLayerInfo['lyvr'].prototype.parse = function(stream) {
  this.offset = stream.tell();

  this.version = stream.readUint32();

  this.length = stream.tell() - this.offset;
};
