goog.provide('PSD.GlobalLayerMaskInfo');

goog.require('PSD.StreamReader');

goog.scope(function() {

/**
 * @constructor
 */
PSD.GlobalLayerMaskInfo = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {number} */
  this.overlayColorSpace;
  /** @type {Array.<number>} */
  this.colorComponents;
  /** @type {number} */
  this.opacity;
  /** @type {number} */
  this.kind;
  /** @type {!(Array.<number>|Uint8Array)} */
  this.filter;
};

/**
 * @param {PSD.StreamReader} stream
 */
PSD.GlobalLayerMaskInfo.prototype.parse = function(stream) {
  /** @type {number} */
  var length;

  this.offset = stream.tell();
  length = stream.readUint32();
  this.length = length + 4;

  this.overlayColorSpace = stream.readUint16();
  this.colorComponents = [
    stream.readUint16(), stream.readUint16(),
    stream.readUint16(), stream.readUint16()
  ];
  this.opacity = stream.readUint16();
  this.kind = stream.readUint8();
  this.filter = stream.read(this.offset + this.length - stream.tell());

  stream.seek(this.offset + this.length, 0);
};

// end of scope
});
