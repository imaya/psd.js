var AdditionalLayerInfo = require('../AdditionalLayerInfo');

/**
 * @constructor
 */
AdditionalLayerInfo['lspf'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {number} */
  this.flags;
  // TODO: flags のパースも行う
};

/**
 * @param {StreamReader} stream
 */
AdditionalLayerInfo['lspf'].prototype.parse = function(stream) {
  this.offset = stream.tell();
  this.flags = stream.readUint32();
  this.length = stream.tell() - this.offset;
};
