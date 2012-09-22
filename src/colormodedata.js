goog.provide('PSD.ColorModeData');

goog.require('PSD.StreamReader');
goog.require('PSD.Header');
goog.require('PSD.Enum');

goog.scope(function() {

/**
 * @constructor
 */
PSD.ColorModeData = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {!(Array.<number>|Uint8Array)} */
  this.data;
};

/**
 * @param {PSD.StreamReader} stream
 * @param {PSD.Header} header
 */
PSD.ColorModeData.prototype.parse = function(stream, header) {
  /** @type {number} */
  var length;

  this.offset = stream.tell();

  length = stream.readUint32();
  this.length = length + 4;

  if (header.colorMode === PSD.ColorMode.INDEXED_COLOR && length !== 768) {
    throw new Error('invalid color mode data');
  }

  this.data = stream.read(length);
};

// end of scope
});
