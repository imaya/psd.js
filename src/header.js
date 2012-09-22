goog.provide('PSD.Header');

goog.require('PSD.StreamReader');

goog.scope(function() {

/**
 * @constructor
 */
PSD.Header = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {string} */
  this.signature;
  /** @type {number} */
  this.version;
  /** @type {!(Array.<number>|Uint8Array)} */
  this.reserved;
  /** @type {number} */
  this.channels;
  /** @type {number} */
  this.rows;
  /** @type {number} */
  this.columns;
  /** @type {number} */
  this.depth;
  /** @type {PSD.ColorMode} */
  this.colorMode;
};

/**
 * @param {PSD.StreamReader} stream
 */
PSD.Header.prototype.parse = function(stream) {
  this.offset = stream.tell();

  // signature
  this.signature = stream.readString(4);
  if (this.signature !== '8BPS') {
    throw new Error('invalid signature');
  }

  this.version = stream.readUint16();
  this.reserved = stream.read(6);
  this.channels = stream.readUint16();
  this.rows = stream.readUint32();
  this.columns = stream.readUint32();
  this.depth = stream.readUint16();
  this.colorMode =
    /** @type {PSD.ColorMode} */
    stream.readUint16();

  this.length = stream.tell() - this.offset;
};

// end of scope
});
