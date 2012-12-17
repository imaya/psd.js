goog.provide('PSD.AdditionalLayerInfo');

goog.scope(function() {

/**
 * @constructor
 */
PSD.AdditionalLayerInfo = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {string} */
  this.signature;
  /** @type {string} */
  this.key;
  /** @type {!(Array.<number>|Uint8Array)} */
  this.data;
  /** @type {{parse: function(PSD.StreamReader, number, PSD.Header)}} */
  this.info;
};

/**
 * @param {PSD.StreamReader} stream
 * @param {PSD.Header} header
 */
PSD.AdditionalLayerInfo.prototype.parse = function(stream, header) {
  /** @type {number} */
  var length;

  this.offset = stream.tell();
  this.signature = stream.readString(4);
  this.key = stream.readString(4);
  length = stream.readUint32();
  this.length = length + 12;

  // 実装されている key の場合はパースを行う
  // 各 key の実装は AdditionaLayerInfo ディレクトリにある
  if (typeof PSD.AdditionalLayerInfo[this.key] === 'function') {
    this.info = new (PSD.AdditionalLayerInfo[this.key])();
    this.info.parse(stream, length, header);
  } else {
    goog.global.console.warn('additional layer information: not implemented', this.key);
  }

  // error check
  if (stream.tell() - (this.offset + this.length) !== 0) {
    if (!COMPILED) {
      //   console.log(stream.fetch(stream.tell(), (this.offset + this.length)), this.offset + this.length);
      goog.global.console.log(this.key, stream.tell() - (this.offset + this.length));
    }
  }

  stream.seek(this.offset + this.length, 0);
};

// end of scope
});

