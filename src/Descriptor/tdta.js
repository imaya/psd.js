goog.provide('PSD.Descriptor.tdta');

goog.require('PSD.Descriptor');

goog.scope(function() {

/**
 * @constructor
 */
PSD.Descriptor['tdta'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {!(Array.<number>|Uint8Array)} */
  this.value;
};

/**
 * @param {PSD.StreamReader} stream
 */
PSD.Descriptor['tdta'].prototype.parse = function(stream) {
  /** @type {number} */
  var length;

  this.offset = stream.tell();

  length = stream.readUint32();
  this.data = stream.read(length);

  this.length = stream.tell() - this.offset;
};


});