/**
 * @constructor
 */
LayerMaskData = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {number} */
  this.top;
  /** @type {number} */
  this.left;
  /** @type {number} */
  this.bottom;
  /** @type {number} */
  this.right;
  /** @type {number} */
  this.defaultColor;
  /** @type {number} */
  this.flags;
  /** @type {number} */
  this.padding;
  /** @type {number} */
  this.realFlags;
  /** @type {number} */
  this.realBackground;
  /** @type {number} */
  this.top2;
  /** @type {number} */
  this.left2;
  /** @type {number} */
  this.bottom2;
  /** @type {number} */
  this.right2;
};

/**
 * @param {StreamReader} stream stream reader.
 */
LayerMaskData.prototype.parse = function(stream) {
  /** @type {number} */
  var length;

  this.offset = stream.tell();
  length = stream.readUint32();
  this.length = length + 4;

  if (length === 0) {
    console.log("skip: layer mask data (empty body)");
    return;
  }

  // rectangle enclosing layer mask
  this.top = stream.readInt32();
  this.left = stream.readInt32();
  this.bottom = stream.readInt32();
  this.right = stream.readInt32();

  // default color
  this.defaultColor = stream.readUint8();

  // flags
  this.flags = stream.readUint8();

  // length: 20
  if (length === 20) {
    // padding
    this.padding = stream.readUint16();
  // length: 36
  } else {
    // real flags
    this.realFlags = stream.readUint8();

    // real user mask background
    this.realBackground = stream.readUint8();

    // rectangle enclosing layer mask
    this.top2 = stream.readInt32();
    this.left2 = stream.readInt32();
    this.bottom2 = stream.readInt32();
    this.right2 = stream.readInt32();
  }
};

module.exports = LayerMaskData;
