var EffectsLayer = require('../EffectsLayer');

/**
 * @constructor
 */
AdditionalLayerInfo.EffectsLayer['cmnS'] = function() {
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
 * @param {StreamReader} stream
 */
AdditionalLayerInfo.EffectsLayer['cmnS'].prototype.parse = function(stream) {
  this.offset = stream.tell();
  this.size = stream.readUint32();
  this.version = stream.readUint32();

  this.visible = !!stream.readUint8();

  // unused
  stream.seek(2);

  this.length = stream.tell() - this.offset;
};
