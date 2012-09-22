goog.provide('PSD.ImageResourceBlock');

goog.require('PSD.StreamReader');

goog.scope(function() {

  /**
   * @constructor
   */
  PSD.ImageResourceBlock = function() {
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
   * @param {PSD.StreamReader} stream
   */
  PSD.ImageResourceBlock.prototype.parse = function(stream) {
    this.offset = stream.tell();

    if (stream.readString(4) !== '8BIM') {
      throw new Error('invalid signature');
    }

    this.identifier = stream.readUint16();
    this.name = stream.readPascalString();
    this.dataSize = stream.readUint32();
    this.data = stream.read(this.dataSize);

    this.length = stream.tell() - this.offset;
  };

  // end of scope
});
