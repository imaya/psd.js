goog.provide('PSD.Descriptor.UnFl');

goog.require('PSD.Descriptor');

goog.scope(function() {

/**
 * @constructor
 */
PSD.Descriptor['UnFl'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {Array.<number>} */
  this.value;
};

/**
 * @param {PSD.StreamReader} stream
 */
PSD.Descriptor['UnFl'].prototype.parse = function(stream) {
  /** @type {Array.<number>} */
  var value = this.value = [];
  /** @type {number} */
  var count;
  /** @type {number} */
  var i;

  this.offset = stream.tell();

  this.key = stream.readString(4);
  count = stream.readUint32();
  for (i = 0; i < count; ++i) {
    value[i] = stream.readFloat64();
  }

  this.length = stream.tell() - this.offset;
};

});
