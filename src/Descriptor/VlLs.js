goog.provide('PSD.Descriptor.VlLs');

goog.require('PSD.Descriptor');

goog.scope(function() {

/**
 * @constructor
 */
PSD.Descriptor['VlLs'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {Array} */
  this.item;
};

/**
 * @param {PSD.StreamReader} stream
 */
PSD.Descriptor['VlLs'].prototype.parse = function(stream) {
  /** @type {number} */
  var items;
  /** @type {number} */
  var i;
  /** @type {string} */
  var type;
  /** @type {!{parse: function(PSD.StreamReader)}} */
  var data;

  this.offset = stream.tell();

  this.item = [];
  items = stream.readUint32();
  for (i = 0; i < items; ++i) {
    type = stream.readString(4);
    if (typeof PSD.Descriptor[type] !== 'function') {
      goog.global.console.error('OSType Key not implemented:', type);
      return;
    }

    data = new PSD.Descriptor[type]();
    data.parse(stream);

    this.item.push({
      type: type,
      data: data
    });
  }

  this.length = stream.tell() - this.offset;
};


});