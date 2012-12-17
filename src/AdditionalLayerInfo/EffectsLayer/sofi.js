goog.provide('PSD.AdditionalLayerInfo.EffectsLayer.sofi');

goog.require('PSD.AdditionalLayerInfo.EffectsLayer');

goog.scope(function() {

/**
 * @constructor
 */
PSD.AdditionalLayerInfo.EffectsLayer['sofi'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {number} */
  this.size;
  /** @type {number} */
  this.version;
  /** @type {string} */
  this.blend;
  /** @type {Array} */
  this.color;
  /** @type {number} */
  this.opacity;
  /** @type {boolean} */
  this.enabled;
  /** @type {Array} */
  this.nativeColor;
};

/**
 * @param {PSD.StreamReader} stream
 */
PSD.AdditionalLayerInfo.EffectsLayer['sofi'].prototype.parse = function(stream) {
  /** @type {string} */
  var signature;

  this.offset = stream.tell();
  this.size = stream.readUint32();
  this.version = stream.readUint32();

  signature = stream.readString(4);
  if (signature !== '8BIM') {
    throw new Error('invalid signature:', signature);
  }

  this.blend = stream.readString(4);

  // ARGB
  stream.seek(2);
  this.color = [
    stream.readUint16() >> 8,
    stream.readUint16() >> 8,
    stream.readUint16() >> 8,
    stream.readUint16() >> 8
  ];

  this.opacity = stream.readUint8();
  this.enabled = !!stream.readUint8();

  // ARGB
  stream.seek(2);
  this.nativeColor = [
    stream.readInt16() >> 8,
    stream.readInt16() >> 8,
    stream.readInt16() >> 8,
    stream.readInt16() >> 8
  ];

  this.length = stream.tell() - this.offset;
};

// end of scope
});
