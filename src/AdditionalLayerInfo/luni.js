var AdditionalLayerInfo = require('../AdditionalLayerInfo');

/**
 * @constructor
 */
AdditionalLayerInfo['luni'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {string} */
  this.layerName;
};

/**
 * @param {StreamReader} stream
 */
AdditionalLayerInfo['luni'].prototype.parse = function(stream) {
  /** @type {number} */
  var length;

  this.offset = stream.tell();
  length = stream.readUint32();
  this.layerName = stream.readWideString(length);

  // NOTE: length が奇数の時はパディングがはいる
  if ((length & 1) === 1) {
    stream.seek(2);
  }

  this.length = stream.tell() - this.offset;
};
