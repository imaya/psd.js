var AdditionalLayerInfo = require('../AdditionalLayerInfo');

/**
 * @constructor
 */
AdditionalLayerInfo['lsct'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {number} */
  this.type;
  /** @type {string} */
  this.key;
};

/**
 * @param {StreamReader} stream
 * @param {number} length
 */
AdditionalLayerInfo['lsct'].prototype.parse = function(stream, length) {
  /** @type {string} */
  var signature;

  this.offset = stream.tell();
  this.type = stream.readUint32();

  if (length === 12) {
    signature = stream.readString(4);
    if (signature !== '8BIM') {
      throw new Error('invalid section divider setting signature:', signature);
    }

    this.key = stream.readString(4);
  }

  this.length = stream.tell() - this.offset;
};
