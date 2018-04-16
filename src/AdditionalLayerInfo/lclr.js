var AdditionalLayerInfo = require('../AdditionalLayerInfo');

/**
 * @constructor
 */
AdditionalLayerInfo['lclr'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {Array.<number>} */
  this.color;
  // TODO: flags のパースも行う
};

/**
 * @param {StreamReader} stream
 */
AdditionalLayerInfo['lclr'].prototype.parse = function(stream) {
  this.offset = stream.tell();
  this.color = [
    stream.readUint32(),
    stream.readUint32()
  ];
  this.length = stream.tell() - this.offset;
};
