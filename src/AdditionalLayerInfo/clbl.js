var AdditionalLayerInfo = require('../AdditionalLayerInfo');

/**
 * @constructor
 */
AdditionalLayerInfo['clbl'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {boolean} */
  this.blendClippedElements;
};

/**
 * @param {StreamReader} stream
 */
AdditionalLayerInfo['clbl'].prototype.parse = function(stream) {
  this.offset = stream.tell();

  this.blendClippedElements = !!stream.readUint8();

  // padding
  stream.seek(3);

  this.length = stream.tell() - this.offset;
};
