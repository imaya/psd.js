goog.provide('PSD.AdditionalLayerInfo.EffectsLayer.bevl');

goog.require('PSD.AdditionalLayerInfo.EffectsLayer');

goog.scope(function() {

/**
 * @constructor
 */
PSD.AdditionalLayerInfo.EffectsLayer['bevl'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {number} */
  this.size;
  /** @type {number} */
  this.version;
  /** @type {number} */
  this.angle;
  /** @type {number} */
  this.strength;
  /** @type {number} */
  this.blur;
  /** @type {string} */
  this.highlightBlendModeSignature;
  /** @type {string} */
  this.highlightBlendModeKey;
  /** @type {string} */
  this.shadowBlendModeSignature;
  /** @type {string} */
  this.shadowBlendModeKey;
  /** @type {Array} */
  this.highlightColor;
  /** @type {number} */
  this.bevelStyle;
  /** @type {number} */
  this.highlightOpacity;
  /** @type {number} */
  this.shadowOpacity;
  /** @type {boolean} */
  this.enabled;
  /** @type {boolean} */
  this.use;
  /** @type {boolean} */
  this.up;
  /** @type {Array} */
  this.readHighlightColor;
  /** @type {Array} */
  this.readShadowColor;
};

/**
 * @param {PSD.StreamReader} stream
 */
PSD.AdditionalLayerInfo.EffectsLayer['bevl'].prototype.parse = function(stream) {
  this.offset = stream.tell();
  this.size = stream.readUint32();
  this.version = stream.readUint32();

  this.angle = stream.readInt32();
  this.strength = stream.readInt32();
  this.blur = stream.readInt32();

  this.highlightBlendModeSignature = stream.readString(4);
  this.highlightBlendModeKey = stream.readString(4);
  this.shadowBlendModeSignature = stream.readString(4);
  this.shadowBlendModeKey = stream.readString(4);

  stream.seek(2);
  this.highlightColor = [
    stream.readUint32(),
    stream.readUint32()
  ];
  stream.seek(2);
  this.shadowColor = [
    stream.readUint32(),
    stream.readUint32()
  ];

  this.bevelStyle = stream.readUint8();

  this.highlightOpacity = stream.readUint8();
  this.shadowOpacity = stream.readUint8();

  this.enabled = !!stream.readUint8();
  this.use = !!stream.readUint8();
  this.up = !!stream.readUint8();

  // version 2 only
  if (this.version === 2) {
    stream.seek(2);
    this.readHighlightColor = [
      stream.readUint32(),
      stream.readUint32()
    ];

    stream.seek(2);
    this.readShadowColor = [
      stream.readUint32(),
      stream.readUint32()
    ];
  }

  this.length = stream.tell() - this.offset;
};

// end of scope
});
