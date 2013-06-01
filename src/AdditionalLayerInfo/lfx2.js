var AdditionalLayerInfo = require('../AdditionalLayerInfo');
var Descriptor = require('../Descriptor');

/**
 * @constructor
 */
AdditionalLayerInfo['lfx2'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {number} */
  this.version;
  /** @type {number} */
  this.descriptorVersion;
};

/**
 * @param {StreamReader} stream
 */
AdditionalLayerInfo['lfx2'].prototype.parse = function(stream) {
  this.offset = stream.tell();

  this.version = stream.readUint32();
  this.descriptorVersion = stream.readUint32();
  this.descriptor = new Descriptor();
  this.descriptor.parse(stream);

  this.length = stream.tell() - this.offset;
};
