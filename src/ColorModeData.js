var StreamReader = require('./StreamReader');
var Header = require('./Header');
var ColorMode = require('./ColorMode');

/**
 * @constructor
 */
var ColorModeData = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {!(Array.<number>|Uint8Array)} */
  this.data;
};

/**
 * @param {StreamReader} stream
 * @param {Header} header
 */
ColorModeData.prototype.parse = function(stream, header) {
  /** @type {number} */
  var length;

  this.offset = stream.tell();

  length = stream.readUint32();
  this.length = length + 4;

  if (header.colorMode === ColorMode.INDEXED_COLOR && length !== 768) {
    throw new Error('invalid color mode data');
  }

  this.data = stream.read(length);
};

module.exports = ColorModeData;
