goog.provide('PSD.Descriptor');

goog.scope(function() {

/**
 * @constructor
 */
PSD.Descriptor = function() {
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
 * @param {PSD.StreamReader} stream
 */
PSD.Descriptor.prototype.parse = function(stream) {
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
  /** @type {!{parse: function(PSD.StreamReader)}} */
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

    if (typeof PSD.Descriptor[type] !== 'function') {
      goog.global.console.warn('OSType Key not implemented:', type);
      //console.log(hoge, String.fromCharCode.apply(null, hoge));
      break;
    }

    data = new PSD.Descriptor[type]();
    data.parse(stream);

    this.item.push({key: key, data: data});
  }

  this.length = stream.tell() - this.offset;
};

// end of scope
});

