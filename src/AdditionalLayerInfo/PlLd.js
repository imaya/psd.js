var AdditionalLayerInfo = require('../AdditionalLayerInfo');
var Descriptor = require('../Descriptor');

/**
 * @constructor
 */
AdditionalLayerInfo['PlLd'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {string} */
  this.type;
  /** @type {number} */
  this.version;
  /** @type {string} */
  this.id;
  /** @type {number} */
  this.page;
  /** @type {number} */
  this.totalPage;
  /** @type {number} */
  this.antiAlias;
  /** @type {number} */
  this.placedLayerType;
  /** @type {Array.<number>} */
  this.transform;
  /** @type {number} */
  this.warpVersion;
  /** @type {number} */
  this.warpDescriptorVersion;
  /** @type {Descriptor} */
  this.descriptor;
};

/**
 * @param {StreamReader} stream
 */
AdditionalLayerInfo['PlLd'].prototype.parse = function(stream) {
  this.offset = stream.tell();

  this.type = stream.readString(4);
  if (this.type !== 'plcL') {
    throw new Error('invalid type:', this.type);
  }

  this.version = stream.readUint32();
  this.id = stream.readPascalString();
  this.page = stream.readInt32();
  this.totalPage = stream.readInt32();
  this.antiAlias = stream.readInt32();
  this.placedLayerType = stream.readInt32();
  this.transform = [
    stream.readFloat64(), stream.readFloat64(),
    stream.readFloat64(), stream.readFloat64(),
    stream.readFloat64(), stream.readFloat64(),
    stream.readFloat64(), stream.readFloat64()
  ];
  this.warpVersion = stream.readInt32();
  this.warpDescriptorVersion = stream.readInt32();
  this.descriptor = new Descriptor();
  this.descriptor.parse(stream);

  this.length = stream.tell() - this.offset;
};
