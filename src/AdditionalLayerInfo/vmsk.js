goog.provide('PSD.AdditionalLayerInfo.vmsk');

goog.require('PSD.AdditionalLayerInfo');

goog.scope(function() {

/**
 * @constructor
 */
PSD.AdditionalLayerInfo['vmsk'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {number} */
  this.version;
};

/**
 * @param {PSD.StreamReader} stream
 * @param {number} length
 */
PSD.AdditionalLayerInfo['vmsk'].prototype.parse = function(stream, length) {
  /** @type {number} */
  var limit = stream.tell() + length;

  this.offset = stream.tell();
  this.version = stream.readUint32();
  this.flags = stream.readUint32();

  while (stream.tell() + 26 <= limit) {
    this.path = new PSD.PathRecord();
    this.path.parse(stream);
  }

  this.length = stream.tell() - this.offset;
};

// end of scope
});
