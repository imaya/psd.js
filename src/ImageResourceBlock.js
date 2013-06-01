var StreamReader = require('./StreamReader');

/**
 * @constructor
 */
var ImageResourceBlock = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {number} */
  this.identifier;
  /** @type {string} */
  this.name;
  /** @type {number} */
  this.dataSize;
  /** @type {!(Array.<number>|Uint8Array)} */
  this.data;
};

/**
 * @param {StreamReader} stream
 */
ImageResourceBlock.prototype.parse = function(stream) {
  this.offset = stream.tell();

  var signature = stream.readString(4);
  if (signature !== '8BIM') {
    throw new Error('invalid signature: "' + signature + '"');
  }

  this.identifier = stream.readUint16();
  this.name = stream.readPascalString();
  if(!this.name.length) { stream.readUint8(); }
  this.dataSize = stream.readUint32();
  this.data = stream.read(this.dataSize);

  if(stream.readUint8() != 0) {
    stream.seek(stream.tell() - 1, 0);
  }

  this.length = stream.tell() - this.offset;
};

module.exports = ImageResourceBlock;
