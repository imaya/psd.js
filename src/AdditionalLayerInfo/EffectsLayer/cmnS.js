goog.provide('PSD.AdditionalLayerInfo.EffectsLayer.cmnS');

goog.require('PSD.AdditionalLayerInfo.EffectsLayer');

goog.scope(function() {

/**
 * @constructor
 */
PSD.AdditionalLayerInfo.EffectsLayer['cmnS'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {number} */
  this.size;
  /** @type {number} */
  this.version;
  /** @type {boolean} */
  this.visible;
};

/**
 * @param {PSD.StreamReader} stream
 */
PSD.AdditionalLayerInfo.EffectsLayer['cmnS'].prototype.parse = function(stream) {
  this.offset = stream.tell();
  this.size = stream.readUint32();
  this.version = stream.readUint32();

  this.visible = !!stream.readUint8();

  // unused
  stream.seek(2);

  this.length = stream.tell() - this.offset;
};

// end of scope
});
