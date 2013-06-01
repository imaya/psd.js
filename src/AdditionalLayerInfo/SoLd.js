var AdditionalLayerInfo = require('../AdditionalLayerInfo');
var Descriptor = require('../Descriptor');

/**
 * @constructor
 */
AdditionalLayerInfo['SoLd'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {string} */
  this.identifier;
  /** @type {number} */
  this.version;
  /** @type {number} */
  this.descriptorVersion;
  /** @type {Descriptor} */
  this.descriptor;
};

/**
 * @param {StreamReader} stream
 */
AdditionalLayerInfo['SoLd'].prototype.parse = function(stream) {
  this.offset = stream.tell();

  this.identifier = stream.readString(4);
  if (this.identifier !== 'soLD') {
    throw new Error('invalid identifier:', this.identifier);
  }

  this.version = stream.readUint32();
  this.descriptorVersion = stream.readInt32();
  this.descriptor = new Descriptor();
  this.descriptor.parse(stream);

  this.length = stream.tell() - this.offset;
};

// end of scope
});
