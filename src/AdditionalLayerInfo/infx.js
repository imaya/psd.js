var AdditionalLayerInfo = require('../AdditionalLayerInfo');

/**
 * @constructor
 */
AdditionalLayerInfo['infx'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {boolean} */
  this.blendInteriorElements;
};

/**
 * @param {StreamReader} stream
 */
AdditionalLayerInfo['infx'].prototype.parse = function(stream) {
  this.offset = stream.tell();

  this.blendInteriorElements = !!stream.readUint8();

  // padding
  stream.seek(3);

  this.length = stream.tell() - this.offset;
};
