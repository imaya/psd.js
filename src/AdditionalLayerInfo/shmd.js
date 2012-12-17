goog.provide('PSD.AdditionalLayerInfo.shmd');

goog.require('PSD.AdditionalLayerInfo');

goog.scope(function() {

/**
 * @constructor
 */
PSD.AdditionalLayerInfo['shmd'] = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {number} */
  this.items;
  /** @type {Array.<Object>} */
  this.metadata;
};

/**
 * @param {PSD.StreamReader} stream
 */
PSD.AdditionalLayerInfo['shmd'].prototype.parse = function(stream) {
  /** @type {string} */
  var signature;
  /** @type {string} */
  var key;
  /** @type {number} */
  var copy;
  /** @type {number} */
  var length;
  /** @type {!(Array.<number>|Uint8Array)} */
  var data;
  /** @type {Array.<Object>} */
  var metadata = this.metadata = [];
  /** @type {number} */
  var i;
  /** @type {number} */
  var il;

  this.offset = stream.tell();

  this.items = stream.readUint32();

  for (i = 0, il = this.items; i < il; ++i) {
    signature = stream.readString(4);
    key = stream.readString(4);
    copy = stream.readUint8();
    stream.seek(3); // padding
    length = stream.readUint32();
    data = stream.read(length);

    // TODO: オブジェクトではなく型をつくる
    metadata[i] = {
      signature: signature,
      key: key,
      copy: copy,
      data: data
    };
  }

  this.length = stream.tell() - this.offset;
};

// end of scope
});
