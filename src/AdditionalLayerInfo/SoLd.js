goog.provide('PSD.AdditionalLayerInfo.SoLd');

goog.require('PSD.AdditionalLayerInfo');

goog.scope(function() {

/**
 * @constructor
 */
PSD.AdditionalLayerInfo['SoLd'] = function() {
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
  /** @type {PSD.Descriptor} */
  this.descriptor;
};

/**
 * @param {PSD.StreamReader} stream
 */
PSD.AdditionalLayerInfo['SoLd'].prototype.parse = function(stream) {
  this.offset = stream.tell();

  this.identifier = stream.readString(4);
  if (this.identifier !== 'soLD') {
    throw new Error('invalid identifier:', this.identifier);
  }

  this.version = stream.readUint32();
  this.descriptorVersion = stream.readInt32();
  this.descriptor = new PSD.Descriptor();
  this.descriptor.parse(stream);

  this.length = stream.tell() - this.offset;
};

// end of scope
});
