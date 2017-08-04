var AdditionalLayerInfo = require('../AdditionalLayerInfo');

/**
 * @constructor
 */
AdditionalLayerInfo['iOpa'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {number} TODO: 公式の仕様？ */
  this.opacity;
};

/**
 * @param {StreamReader} stream
 */
AdditionalLayerInfo['iOpa'].prototype.parse = function(stream) {
  this.offset = stream.tell();

  // TODO: おそらく 1 Byte で Opacity を表していて残りはパディングだと思われる
  // console.log('iOpa:', stream.fetch(stream.tell(), stream.tell()+4));
  this.opacity= stream.readUint8();
  stream.seek(3);

  this.length = stream.tell() - this.offset;
};
