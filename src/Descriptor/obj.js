var Descriptor = require('../Descriptor');

/**
 * @constructor
 */
Descriptor['obj '] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {number} */
  this.items;
  /** @type {Array} */
  this.item;
};

/**
 * @param {StreamReader} stream
 */
Descriptor['obj '].prototype.parse = function(stream) {
  /** @type {number} */
  var items;
  /** @type {string} */
  var key;
  /** @type {string} */
  var type;
  /** @type {!{parse: function(StreamReader)}} */
  var data;
  /** @type {number} */
  var i;

  this.offset = stream.tell();

  this.item = [];
  items = this.items = stream.readUint32();
  for (i = 0; i < items; ++i) {
    key = stream.readString(4);
    type = Descriptor['obj '].Table[key];

    if (typeof Descriptor[type] !== 'function') {
      console.log('OSType Key not implemented:', type);
      return;
    }

    data = new (Descriptor[type])();
    data.parse(stream);

    this.item.push({key: key, data: data});
  }

  this.length = stream.tell() - this.offset;
};

Descriptor['obj '].Table = {
  'prop': 'prop',
  'Clss': 'type',
  'Enmr': 'enum',
  'rele': 'rele',
  'Idnt': 'long',
  'indx': 'long',
  'name': 'TEXT'
};

Descriptor['obj '].prototype.toObject = function() {
  return this.item.map(function(item) {
    return this.item.data.toObject ? this.item.data.toObject() : this.item.data
  });
};
