goog.provide('PSD.ImageResources');

goog.require('PSD.StreamReader');
goog.require('PSD.ImageResourceBlock');

goog.scope(function() {

/**
 * @constructor
 */
PSD.ImageResources = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {PSD.ImageResourceBlock} */
  this.imageResource;
};

/**
 * @param {PSD.StreamReader} stream
 */
PSD.ImageResources.prototype.parse = function(stream) {
  /** @type {number} */
  var length;

  this.offset = stream.tell();
  length = stream.readUint32();
  this.length = length + 4;

  this.imageResource = new PSD.ImageResourceBlock();
  this.imageResource.parse(stream);

  stream.seek(this.offset + this.length, 0);
};

// end of scope
});
