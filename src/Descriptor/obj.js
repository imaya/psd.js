goog.provide('PSD.Descriptor.obj');

goog.require('PSD.Descriptor');

goog.scope(function() {

/**
 * @constructor
 */
PSD.Descriptor['obj '] = function() {
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
 * @param {PSD.StreamReader} stream
 */
PSD.Descriptor['obj '].prototype.parse = function(stream) {
  /** @type {number} */
  var items;
  /** @type {string} */
  var key;
  /** @type {string} */
  var type;
  /** @type {!{parse: function(PSD.StreamReader)}} */
  var data;
  /** @type {number} */
  var i;

  this.offset = stream.tell();

  this.item = [];
  items = this.items = stream.readUint32();
  for (i = 0; i < items; ++i) {
    key = stream.readString(4);
    type = PSD.Descriptor['obj '].Table[key];

    if (typeof PSD.Descriptor[type] !== 'function') {
      goog.global.console.error('OSType Key not implemented:', type);
      return;
    }

    data = new (PSD.Descriptor[type])();
    data.parse(stream);

    this.item.push({key: key, data: data});
  }

  this.length = stream.tell() - this.offset;
};

PSD.Descriptor['obj '].Table = {
  'prop': 'prop',
  'Clss': 'type',
  'Enmr': 'enum',
  'rele': 'rele',
  'Idnt': 'long',
  'indx': 'long',
  'name': 'TEXT'
};

});