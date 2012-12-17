goog.provide('PSD.AdditionalLayerInfo.GdFl');

goog.require('PSD.AdditionalLayerInfo');
goog.require('PSD.Descriptor');

goog.scope(function() {

/**
 * @constructor
 */
PSD.AdditionalLayerInfo['GdFl'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {number} */
  this.version;
  /** @type {*} */
  this.descriptor;
};

/**
 * @param {PSD.StreamReader} stream
 */
PSD.AdditionalLayerInfo['GdFl'].prototype.parse = function(stream) {
  this.offset = stream.tell();

  this.version = stream.readUint32();
  this.descriptor = new PSD.Descriptor();
  this.descriptor.parse(stream);

  this.length = stream.tell() - this.offset;
};

// end of scope
});
