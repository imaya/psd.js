/**
 * @constructor
 */
var PathRecord = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {string} */
  this.name;
  /** @type {string} */
  this.classId;
  /** @type {number} */
  this.items;
  /** @type {Array} */
  this.item;
};

/**
 * @param {StreamReader} stream
 */
PathRecord.prototype.parse = function(stream) {
  /** @type {number} */
  var length;
  /** @type {string} */
  var key;
  /** @type {number} */
  var type;
  /** @type {number} */
  var i;
  /** @type {number} */
  var il;
  /** @type {!{parse: function(StreamReader)}} */
  var data;

  this.offset = stream.tell();

  type = this.type = stream.readInt16();
  //
  // Path の座標は 8-24 の固定小数点なので 1 << 24 で割ってやれば良い？
  //
  /*
  switch (type) {
    case 0: // closed subpath length record
    case 3: // open subpath length record
      console.log('record type: subpath length record, opened:', type === 0);
      console.log('path length:', stream.readInt16());
      stream.seek(22);
      break;
    case 1: // closed subpath bezier knot, linked
    case 2: // closed subpath bezier knot, unlinked
    case 4: // open subpath bezier knot, linked
    case 5: // open subpath bezier knot, unlinked
      // control point
      // anchor point
      // control point
      /*
      console.log(
        "\tCtrlPoint:",   stream.readInt32() / 0x1000000, stream.readInt32() / 0x1000000,
        "\nAnchorPoint:", stream.readInt32() / 0x1000000, stream.readInt32() / 0x1000000,
        "\nCtrlPoint:",   stream.readInt32() / 0x1000000, stream.readInt32() / 0x1000000
      );
      /
      console.log('record type: subpath bezier knot, opened:', (type === 4 || type === 5), ', linked:', (type === 1|| type === 4));
      break;
    case 6: // path fill rule record
      console.log('record type: path fill rule record');
      stream.seek(24);
      break;
    case 7: // clipboard record
      console.log('clipboard record');
      console.log(
        "\ttop:", stream.readInt32() / 0x1000000,
        "\nleft:", stream.readInt32() / 0x1000000,
        "\nbottom:", stream.readInt32() / 0x1000000,
        "\nright:", stream.readInt32() / 0x1000000,
        "\nresolution:", stream.readInt32() / 0x1000000
      );
      stream.seek(4);
      break;
    case 8: // initial fill rule record
      console.log('initial fill rule record');
      console.log("initial:", stream.readInt16());
      stream.seek(22);
      break;
    default: // unknown
      console.log('unknown path record type:', type);
      break;
  }
  */

  stream.seek(26, this.offset);

  this.length = stream.tell() - this.offset;
};

module.exports = PathRecord;
