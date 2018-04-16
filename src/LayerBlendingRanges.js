/**
 * @constructor
 */
var LayerBlendingRanges = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {Array.<Array>} */
  this.channel = [];
  /** @type {number} */
  this.black;
  /** @type {number} */
  this.white;
  /** @type {number} */
  this.destRange;
};

/**
 * @param {StreamReader} stream
 */
LayerBlendingRanges.prototype.parse = function(stream) {
  /** @type {number} */
  var next;

  this.offset = stream.tell();
  this.length = stream.readUint32() + 4;

  if (this.length === 4) {
    console.log("skip: layer blending ranges(empty body)");
    return;
  }

  next = this.offset + this.length;

  this.black = stream.readUint16();
  this.white = stream.readUint16();

  this.destRange = stream.readUint32();

  while (stream.tell() < next) {
    // TODO: 専用のオブジェクトを作る
    this.channel.push([
      /* source range      */ stream.readUint32(),
      /* destination range */ stream.readUint32()
    ]);
  }
};

module.exports = LayerBlendingRanges;
