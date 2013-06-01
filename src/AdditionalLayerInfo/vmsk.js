var AdditionalLayerInfo = require('../AdditionalLayerInfo');
var PathRecord = require('../PathRecord');

/**
 * @constructor
 */
AdditionalLayerInfo['vmsk'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {number} */
  this.version;
};

/**
 * @param {StreamReader} stream
 * @param {number} length
 */
AdditionalLayerInfo['vmsk'].prototype.parse = function(stream, length) {
  /** @type {number} */
  var limit = stream.tell() + length;

  this.offset = stream.tell();
  this.version = stream.readUint32();
  this.flags = stream.readUint32();

  while (stream.tell() + 26 <= limit) {
    this.path = new PathRecord();
    this.path.parse(stream);
  }

  this.length = stream.tell() - this.offset;
};
