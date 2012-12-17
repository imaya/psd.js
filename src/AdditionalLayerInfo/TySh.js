goog.provide('PSD.AdditionalLayerInfo.TySh');

goog.require('PSD.AdditionalLayerInfo');

goog.scope(function() {

/**
 * @constructor
 */
PSD.AdditionalLayerInfo['TySh'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {number} */
  this.version;
  /** @type {Array.<number>} */
  this.transform;
  /** @type {number} */
  this.textVersion;
  /** @type {number}*/
  this.textDescriptorVersion;
  /** @type {PSD.Descriptor} */
  this.textData;
  /** @type {number} */
  this.warpVersion;
  /** @type {number} */
  this.warpDescriptorVersion;
  /** @type {PSD.Descriptor} */
  this.warpData;
  /** @type {!(Array.<number>|Uint8Array)} */
  this.left;
  /** @type {!(Array.<number>|Uint8Array)} */
  this.top;
  /** @type {!(Array.<number>|Uint8Array)} */
  this.right;
  /** @type {!(Array.<number>|Uint8Array)} */
  this.bottom;
};

/**
 * @param {PSD.StreamReader} stream
 */
PSD.AdditionalLayerInfo['TySh'].prototype.parse = function(stream) {
  this.offset = stream.tell();

  this.version = stream.readInt16();
  this.transform = [
    stream.readFloat64(), // xx
    stream.readFloat64(), // xy
    stream.readFloat64(), // yx
    stream.readFloat64(), // yy
    stream.readFloat64(), // tx
    stream.readFloat64()  // ty
  ];

  this.textVersion = stream.readInt16();
  this.textDescriptorVersion = stream.readInt32();
  this.textData = new PSD.Descriptor();
  this.textData.parse(stream);

  // parse failure
  if (this.textData.items !== this.textData.item.length) {
    goog.global.console.error('Descriptor parsing failed');
    return;
  }

  this.warpVersion = stream.readInt16();
  this.warpDescriptorVersion = stream.readInt32();
  this.warpData = new PSD.Descriptor();
  this.warpData.parse(stream);


  // TODO: 4 Byte * 4?
  goog.global.console.log('TySh implementation is incomplete');
  this.left = stream.readInt32();
  this.top = stream.readInt32();
  this.right = stream.readInt32();
  this.bottom = stream.readInt32();

  /*
  this.left = stream.readFloat64();
  this.top = stream.readFloat64();
  this.right = stream.readFloat64();
  this.bottom = stream.readFloat64();

  stream.seek(-32);
  goog.global.console.log('64 or 32:',
    this.left,
    this.top,
    this.right,
    this.bottom,
    stream.readInt32(),
    stream.readInt32(),
    stream.readInt32(),
    stream.readInt32()
  );
   */

  this.length = stream.tell() - this.offset;
};

// end of scope
});
