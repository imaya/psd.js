var AdditionalLayerInfo = require('../AdditionalLayerInfo');

/**
 * @constructor
 */
AdditionalLayerInfo['lnsr'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {string} */
  this.id;
};

/**
 * @param {StreamReader} stream
 */
AdditionalLayerInfo['lnsr'].prototype.parse = function(stream) {
  this.offset = stream.tell();
  this.id = stream.readString(4);
  this.length = stream.tell() - this.offset;
};
