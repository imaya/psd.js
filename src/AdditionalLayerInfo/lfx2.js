goog.provide('PSD.AdditionalLayerInfo.lfx2');

goog.require('PSD.AdditionalLayerInfo');

goog.scope(function() {

/**
 * @constructor
 */
PSD.AdditionalLayerInfo['lfx2'] = function() {
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
 * @param {PSD.StreamReader} stream
 */
PSD.AdditionalLayerInfo['lfx2'].prototype.parse = function(stream) {
  this.offset = stream.tell();

  this.version = stream.readUint32();
  this.descriptorVersion = stream.readUint32();
  this.descriptor = new PSD.Descriptor();
  this.descriptor.parse(stream);

  this.length = stream.tell() - this.offset;
};

// end of scope
});
