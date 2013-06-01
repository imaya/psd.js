var Descriptor = require('../Descriptor');

/**
 * @constructor
 */
Descriptor['VlLs'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {Array} */
  this.item;
};

/**
 * @param {StreamReader} stream
 */
Descriptor['VlLs'].prototype.parse = function(stream) {
  /** @type {number} */
  var items;
  /** @type {number} */
  var i;
  /** @type {string} */
  var type;
  /** @type {!{parse: function(StreamReader)}} */
  var data;

  this.offset = stream.tell();

  this.item = [];
  items = stream.readUint32();
  for (i = 0; i < items; ++i) {
    type = stream.readString(4);
    if (typeof Descriptor[type] !== 'function') {
      console.log('OSType Key not implemented:', type);
      return;
    }

    data = new Descriptor[type]();
    data.parse(stream);

    this.item.push({
      type: type,
      data: data
    });
  }

  this.length = stream.tell() - this.offset;
};
