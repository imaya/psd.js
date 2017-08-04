var StreamReader = require('./StreamReader');
var ImageResourceBlock = require('./ImageResourceBlock');

/**
 * @constructor
 */
var ImageResources = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {ImageResourceBlock} */
  this.imageResource;
};

/**
 * @param {StreamReader} stream
 */
ImageResources.prototype.parse = function(stream) {
  /** @type {number} */
  var length;

  this.offset = stream.tell();
  length = stream.readUint32();
  this.length = length + 4;

  this.imageResources = [];
  while(stream.tell() < this.offset + this.length) {
    var imageResource = new ImageResourceBlock();
    imageResource.parse(stream)
    this.imageResources.push(imageResource);
  }

  stream.seek(this.offset + this.length, 0);
};

module.exports = ImageResources;
