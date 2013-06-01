
/**
 * @constructor
 */
var Descriptor = function() {
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
Descriptor.prototype.parse = function(stream) {
  /** @type {number} */
  var length;
  /** @type {string} */
  var key;
  /** @type {string} */
  var type;
  /** @type {number} */
  var i;
  /** @type {number} */
  var il;
  /** @type {!{parse: function(StreamReader)}} */
  var data;

  this.offset = stream.tell();

  length = stream.readUint32();
  this.name = stream.readWideString(length);

  length = stream.readUint32() || 4;
  this.classId = stream.readString(length);

  this.items = stream.readUint32();
  this.item = [];

  for (i = 0, il = this.items; i < il; ++i) {
    length = stream.readUint32() || 4;
    key = stream.readString(length);
    type = stream.readString(4);

    if (typeof Descriptor[type] !== 'function') {
      console.log('OSType Key not implemented:', type);
      //console.log(hoge, String.fromCharCode.apply(null, hoge));
      break;
    }

    data = new Descriptor[type]();
    data.parse(stream);

    this.item.push({key: key, data: data});
  }

  this.length = stream.tell() - this.offset;
};

module.exports = Descripter;
