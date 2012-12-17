goog.provide('PSD.LayerRecord');

goog.require('PSD.StreamReader');
goog.require('PSD.AdditionalLayerInfo');
goog.require('PSD.LayerMaskData');
goog.require('PSD.LayerBlendingRanges');

goog.scope(function() {

/**
 * @constructor
 */
PSD.LayerRecord = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {number} */
  this.top;
  /** @type {number} */
  this.left;
  /** @type {number} */
  this.bottom;
  /** @type {number} */
  this.right;
  /** @type {number} */
  this.channels;
  /** @type {Array.<{id: number, length: number}>} */
  this.info = [];
  /** @type {string} */
  this.blendMode;
  /** @type {number} */
  this.opacity;
  /** @type {number} */
  this.clipping;
  /** @type {number} */
  this.flags;
  /** @type {number} */
  this.filter;
  /** @type {string} */
  this.name;
  /** @type {PSD.LayerMaskData} */
  this.layerMaskData;
  /** @type {PSD.LayerBlendingRanges} */
  this.blendingRanges;
  /** @type {Array.<PSD.AdditionalLayerInfo>} */
  this.additionalLayerInfo;
};

/**
 * @param {PSD.StreamReader} stream
 * @param {PSD.Header} header
 */
PSD.LayerRecord.prototype.parse = function(stream, header) {
  /** @type {number} */
  var pos;
  /** @type {number} */
  var i;
  /** @type {number} */
  var il;
  /** @type {PSD.AdditionalLayerInfo} */
  var additionalLayerInfo;

  this.offset = stream.tell();

  // rectangle
  this.top = stream.readInt32();
  this.left = stream.readInt32();
  this.bottom = stream.readInt32();
  this.right = stream.readInt32();

  // channel information
  this.channels = stream.readUint16();
  for (i = 0, il = this.channels; i < il; ++i) {
    this.info[i] = {
      id: stream.readInt16(),
      length: stream.readUint32()
    };
  }
  // signature
  if (stream.readString(4) !== '8BIM') {
    throw new Error('invalid blend mode signature');
  }

  // blend mode
  this.blendMode = stream.readString(4);

  // opacity
  this.opacity = stream.readUint8();

  // clipping
  this.clipping = stream.readUint8();

  // flags
  this.flags = stream.readUint8();

  // filter
  this.filter = stream.readUint8();

  // extra field length
  this.extraLength = stream.readUint32();
  pos = stream.tell() + this.extraLength;

  // layer mask data
  this.layerMaskData = new PSD.LayerMaskData();
  this.layerMaskData.parse(stream);

  // layer blending ranges
  this.blendingRanges = new PSD.LayerBlendingRanges();
  this.blendingRanges.parse(stream);

  // name
  var stringLength = stream.readUint8();
  this.name = stream.readString(stringLength);
  stream.seek((4 - ((1 + stringLength) % 4)) % 4); // padding

  // additional information
  this.additionalLayerInfo = [];
  while (stream.tell() < pos) {
    additionalLayerInfo = new PSD.AdditionalLayerInfo();
    additionalLayerInfo.parse(stream, header);
    this.additionalLayerInfo.push(additionalLayerInfo);
  }

  this.length = stream.tell() - this.offset;
};

// end of scope
});
