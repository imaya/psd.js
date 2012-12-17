goog.provide('PSD.Descriptor.alis');

goog.require('PSD.Descriptor');

goog.scope(function() {

/**
 * @constructor
 */
PSD.Descriptor['alis'] = function() {
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
PSD.Descriptor['alis'].prototype.parse = function(stream) {
  /** @type {number} */
  var length;
  this.offset = stream.tell();

  length = stream.readUint32();
  // TODO: きちんと parse する
  this.value = stream.read(length);

  this.length = stream.tell() - this.offset;
};


});